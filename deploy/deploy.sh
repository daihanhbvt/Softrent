#!/usr/bin/env bash
# Deploy softrent.vn lên VPS dùng chung với XePrime staging. Chạy từ máy dev (Git Bash được), ở bất
# kỳ thư mục nào:
#
#   bash deploy/deploy.sh
#
# Các bước:
#   1. Đóng gói mã nguồn: file git đang theo dõi + file mới chưa bị .gitignore (không node_modules,
#      .next, .env*). Deploy đúng cái đang có trên đĩa, kể cả phần chưa commit — REVISION ghi rõ
#      `-dirty` khi đó.
#   2. Đẩy lên VPS vào ~/softrent, build image và khởi động container `softrent` TRÊN VPS.
#   3. Cài `deploy/softrent.caddy` vào `deploy/sites/` của XePrime: `caddy validate` trước, hỏng thì
#      trả lại bản cũ và DỪNG — Caddy đang phục vụ cả XePrime, một khối site hỏng mà lọt vào là
#      lần khởi động lại kế tiếp của nó sập luôn mọi site.
#   4. Smoke test https://softrent.vn từ máy này.
#
# Biến môi trường (đều có mặc định):
#   DEPLOY_HOST     xeprime@stg.xeprime.vn
#   DEPLOY_SSH_KEY  ~/.ssh/xeprime_admin
#   XP_DIR          /opt/xeprime            repo XePrime trên VPS
#   XP_PROJECT      xeprime-staging         project compose của XePrime (để tìm container Caddy)
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${DEPLOY_HOST:-xeprime@stg.xeprime.vn}"
KEY="${DEPLOY_SSH_KEY:-$HOME/.ssh/xeprime_admin}"
XP_DIR="${XP_DIR:-/opt/xeprime}"
XP_PROJECT="${XP_PROJECT:-xeprime-staging}"
SITE_URL='https://softrent.vn'

SSH=(ssh -i "$KEY" -o BatchMode=yes "$HOST")

log() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }
# Lệnh nào gãy ngoài `fail` (ssh, tar, docker…) cũng phải để lại một dòng nói gãy ở đâu — không thì
# `set -e` thoát im lặng, và lọc log bằng grep là mất luôn manh mối.
trap 'printf "\n\033[1;31m✗ Dừng ở dòng %s của deploy.sh (mã %s) — xem log phía trên.\033[0m\n" "$LINENO" "$?" >&2' ERR

REV="$(git rev-parse --short HEAD)"
[ -z "$(git status --porcelain)" ] || REV="$REV-dirty"

log "Đóng gói $REV"
TARBALL="$(mktemp)"
trap 'rm -f "$TARBALL"' EXIT
# `--ignore-failed-read`: file đã xoá trên đĩa nhưng git còn theo dõi thì bỏ qua, đừng làm hỏng lượt đóng gói.
git ls-files -z --cached --others --exclude-standard \
  | tar --null --ignore-failed-read -T - -czf "$TARBALL"

log "Đẩy lên $HOST"
"${SSH[@]}" 'rm -rf ~/softrent.incoming && mkdir -p ~/softrent.incoming && tar -xzf - -C ~/softrent.incoming' < "$TARBALL"

log 'Build + khởi động trên VPS'
"${SSH[@]}" "XP_DIR='$XP_DIR' XP_PROJECT='$XP_PROJECT' REV='$REV' bash -s" <<'REMOTE'
set -euo pipefail
log() { printf '\n\033[1;36m--> %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }
trap 'printf "\n\033[1;31m✗ VPS: dừng ở dòng %s của bước từ xa (mã %s).\033[0m\n" "$LINENO" "$?" >&2' ERR

# Thay NGUYÊN thư mục: file đã xoá ở máy dev cũng phải biến mất ở đây. Container đang chạy không
# phụ thuộc thư mục này (nó chạy từ image), nên build hỏng thì site cũ vẫn sống.
rm -rf ~/softrent
mv ~/softrent.incoming ~/softrent
cd ~/softrent
printf '%s\n' "$REV" > REVISION

COMPOSE=(docker compose -f deploy/docker-compose.yml)

log "Build image ($REV)"
"${COMPOSE[@]}" build

docker network inspect xeprime-sites > /dev/null 2>&1 \
  || fail 'Chưa có mạng xeprime-sites: VPS chưa chạy bản XePrime có móc "site ngoài" (docs/deployment.md §10 bên repo XePrime). Image đã build xong, chạy lại script này sau khi XePrime deploy.'

log 'Khởi động container'
"${COMPOSE[@]}" up -d --remove-orphans

STATUS=''
for _ in $(seq 1 24); do
  STATUS="$(docker inspect -f '{{.State.Health.Status}}' "$("${COMPOSE[@]}" ps -q softrent)" 2>/dev/null || true)"
  [ "$STATUS" = healthy ] && break
  sleep 5
done
[ "$STATUS" = healthy ] \
  || fail "Container softrent chưa healthy sau 120s (đang: ${STATUS:-không rõ}). Xem: docker compose -f ~/softrent/deploy/docker-compose.yml logs --tail 100"

# --- Khối site trong Caddy của XePrime -------------------------------------------
CADDY="$(docker ps -q --filter "label=com.docker.compose.project=$XP_PROJECT" --filter 'label=com.docker.compose.service=caddy')"
[ -n "$CADDY" ] || fail "Không thấy container Caddy của project $XP_PROJECT."
SITES="$XP_DIR/deploy/sites"
[ -d "$SITES" ] || fail "$SITES chưa có: VPS chưa chạy bản XePrime có móc \"site ngoài\"."
TARGET="$SITES/softrent.caddy"
CADDY_CMD=(--config /etc/caddy/Caddyfile --adapter caddyfile)

if cmp -s deploy/softrent.caddy "$TARGET"; then
  log 'Khối Caddy không đổi — không reload'
else
  log 'Cài khối Caddy mới'
  # Bản lưu mang đuôi `.bak` nên không khớp glob `*.caddy` mà Caddyfile của XePrime import.
  [ -f "$TARGET" ] && cp "$TARGET" "$TARGET.bak"
  cp deploy/softrent.caddy "$TARGET"
  if ! docker exec "$CADDY" caddy validate "${CADDY_CMD[@]}"; then
    if [ -f "$TARGET.bak" ]; then mv "$TARGET.bak" "$TARGET"; else rm -f "$TARGET"; fi
    fail 'Khối Caddy không hợp lệ — đã trả lại bản cũ, Caddy đang chạy không bị đụng tới.'
  fi
  docker exec "$CADDY" caddy reload "${CADDY_CMD[@]}"
  rm -f "$TARGET.bak"
fi

# Image cũ mất tag sau mỗi lần build lại — dọn để đĩa không đầy dần.
docker image prune -f > /dev/null
REMOTE

log "Smoke test $SITE_URL"
# Lần đầu Caddy còn đang xin chứng chỉ — cho vài nhịp thử lại.
CODE="$(curl -sS -L -o /dev/null -w '%{http_code}' --retry 6 --retry-delay 10 --retry-all-errors --max-time 20 "$SITE_URL/" || true)"
[ "$CODE" = 200 ] \
  || fail "$SITE_URL trả ${CODE:-lỗi kết nối}. Container và Caddy đã cài xong; kiểm DNS (A record softrent.vn + www trỏ về VPS, mây xám) và log: docker logs $XP_PROJECT-caddy-1 --tail 50"
log "Xong — $SITE_URL ($REV)"

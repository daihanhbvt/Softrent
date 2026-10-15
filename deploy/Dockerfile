# Image chạy softrent.vn bằng `next start`.
#
# Không xuất tĩnh (`output: "export"`): trang dùng `src/proxy.ts` (chuyển `/` về ngôn ngữ đã chọn)
# và tối ưu ảnh của `next/image` — cả hai cần server. Chạy `next start` giữ nguyên hành vi như lúc
# dev, và chừa đường cho `/api/contact` sau này (xem TODO ở `src/lib/contact.ts`).
#
# Build từ GỐC repo: docker build -f deploy/Dockerfile .

FROM node:24-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# URL gốc nhúng vào canonical, Open Graph, sitemap và robots lúc build (`src/config/site.ts`).
ARG NEXT_PUBLIC_SITE_URL=https://softrent.vn
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build && rm -rf .next/cache

# Debian slim (glibc) chứ không Alpine: `sharp` — bộ tối ưu ảnh của Next — có bản dựng sẵn cho glibc.
FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    TZ=Asia/Ho_Chi_Minh

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts
# `next start` ghi cache ảnh đã tối ưu vào `.next/cache` — thư mục phải thuộc user chạy tiến trình.
COPY --from=build --chown=node:node /app/.next ./.next

USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "--hostname", "0.0.0.0", "--port", "3000"]

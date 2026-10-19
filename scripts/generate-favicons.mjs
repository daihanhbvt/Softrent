// Sinh favicon dạng ảnh từ public/icon.svg — chạy lại mỗi khi đổi logo:
//   node scripts/generate-favicons.mjs
//
// Vì sao không dùng thẳng icon.svg: Google Search KHÔNG nhận SVG (chỉ BMP, GIF, ICO, PNG, JPEG, PPM,
// TIFF), và favicon phải vuông 1:1, nên lớn hơn 48×48:
// https://developers.google.com/search/docs/appearance/favicon-in-search
// Trình duyệt vẫn dùng icon.svg (nét ở mọi cỡ); hai file dưới đây là cho Google và trình duyệt cũ.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Lề mỗi bên, tính theo cạnh logo: Google cắt favicon thành hình tròn ở kết quả trên điện thoại.
const PADDING = 0.12;

const svg = await readFile("public/icon.svg", "utf8");
const padded = withPadding(svg, PADDING);
const png = (size) => sharp(Buffer.from(padded)).resize(size, size).png().toBuffer();

await writeFile("public/icon.png", await png(192));
const icoSizes = [16, 32, 48];
await writeFile("public/favicon.ico", toIco(await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(size) })))));
console.log(`public/icon.png 192×192 · public/favicon.ico ${icoSizes.join("/")}px`);

/** Nới viewBox (đã vuông) ra mỗi bên `ratio` cạnh — logo nhỏ lại và nằm giữa, không cắt hình. */
function withPadding(source, ratio) {
  const match = source.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/);
  if (!match) throw new Error("public/icon.svg thiếu viewBox");
  const [x, y, w, h] = match.slice(1).map(Number);
  if (w !== h) throw new Error(`public/icon.svg phải vuông, đang là ${w}×${h}`);
  const pad = w * ratio;
  const side = w + pad * 2;
  return source
    .replace(match[0], `viewBox="${x - pad} ${y - pad} ${side} ${side}"`)
    .replace(/ width="[\d.]+" height="[\d.]+"/, ` width="${side}" height="${side}"`);
}

/** Gói các ảnh PNG vào một file .ico (định dạng ICO chứa thẳng PNG — mọi trình duyệt hiện đại đọc được). */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // dự trữ
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  const entries = Buffer.alloc(16 * images.length);
  let offset = header.length + entries.length;
  images.forEach(({ size, data }, i) => {
    const at = i * 16;
    entries.writeUInt8(size >= 256 ? 0 : size, at); // rộng (0 nghĩa là 256)
    entries.writeUInt8(size >= 256 ? 0 : size, at + 1); // cao
    entries.writeUInt8(0, at + 2); // số màu bảng (0 = không dùng bảng màu)
    entries.writeUInt8(0, at + 3); // dự trữ
    entries.writeUInt16LE(1, at + 4); // color planes
    entries.writeUInt16LE(32, at + 6); // bit mỗi điểm ảnh
    entries.writeUInt32LE(data.length, at + 8);
    entries.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });

  return Buffer.concat([header, entries, ...images.map(({ data }) => data)]);
}

// Cắt asset tạm thời từ ảnh thiết kế tham chiếu (chưa có file gốc từ Softrent/Figma).
// Chạy: node scripts/extract-assets.mjs <thư-mục-chứa-1.png..4.png>
import sharp from "sharp";
import path from "node:path";

const dir = process.argv[2];
const out = "public/images";
const src = (n) => path.join(dir, `${n}.png`);

const crops = [
  // [file nguồn, tên, left, top, width, height]
  [3, "hero-illustration", 740, 88, 700, 548],
  [3, "services-collage", 735, 1080, 590, 580],
  [3, "service-web", 115, 1340, 105, 95],
  [3, "service-mobile", 115, 1470, 105, 95],
  [3, "service-saas", 115, 1605, 105, 100],
  [3, "xeprime-preview", 715, 1900, 615, 395],
  [3, "why-tech", 268, 2600, 82, 82],
  [3, "why-cost", 679, 2600, 82, 82],
  [3, "why-security", 1090, 2600, 82, 82],
  [2, "about-collage", 115, 930, 410, 415],
  [2, "ceo-signature", 538, 1258, 156, 36],
  [2, "value-creative", 137, 1737, 48, 48],
  [2, "value-efficient", 545, 1737, 48, 48],
  [2, "value-dedicated", 953, 1737, 48, 48],
];

for (const [n, name, left, top, width, height] of crops) {
  await sharp(src(n)).extract({ left, top, width, height }).webp({ quality: 92 }).toFile(`${out}/${name}.webp`);
}

// Logo (public/images/logo*.png) và favicon (public/icon.svg) là file gốc do Softrent cung cấp — không tạo ở đây.
console.log("done");

import { notFound } from "next/navigation";

// URL không khớp trang nào dưới /vi hoặc /en: gọi notFound() để hiện `[locale]/not-found.tsx` BÊN TRONG
// layout của đúng ngôn ngữ (header, footer, <html lang>). Thiếu route này, Next trả trang 404 mặc định
// không layout, chữ tiếng Anh.
export default function CatchAllPage() {
  notFound();
}

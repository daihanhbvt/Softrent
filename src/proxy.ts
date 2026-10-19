import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";
import { LOCALE_COOKIE } from "@/i18n/cookie";

/** Chọn ngôn ngữ: ngôn ngữ người dùng đã chọn (cookie) → mặc định tiếng Việt. */
function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  return cookie && hasLocale(cookie) ? cookie : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // Trang chủ tiếng Việt được PHỤC VỤ NGAY tại gốc tên miền (rewrite, URL giữ nguyên) thay vì chuyển
  // hướng sang /vi: Google chỉ lấy favicon và tên site từ trang chủ ở gốc tên miền, và "/" là địa chỉ
  // chính (canonical) của trang chủ tiếng Việt — xem `canonicalPath` ở src/lib/metadata.ts.
  if (pathname === "/" && locale === defaultLocale) return NextResponse.rewrite(url);
  return NextResponse.redirect(url);
}

export const config = {
  // Bỏ qua tài nguyên tĩnh, API và các file metadata (sitemap, robots, icon...).
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};

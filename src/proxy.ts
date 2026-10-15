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

  const url = request.nextUrl.clone();
  url.pathname = `/${resolveLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Bỏ qua tài nguyên tĩnh, API và các file metadata (sitemap, robots, icon...).
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};

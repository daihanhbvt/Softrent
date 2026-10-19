import type { Metadata } from "next";
import { siteName, siteUrl } from "@/config/site";
import type { SitePath } from "@/config/navigation";
import { defaultLocale, localeLabels, locales, localizePath, type Locale } from "@/i18n/config";

/**
 * Địa chỉ chính (canonical) của một trang. Riêng trang chủ tiếng Việt là gốc tên miền "/" — proxy phục vụ
 * nó ngay tại đó — để Google coi đúng `softrent.vn` là trang chủ (favicon, tên site). Link nội bộ vẫn
 * dùng `localizePath` (/vi): người đã chọn tiếng Anh vào "/" sẽ bị chuyển sang /en.
 */
export function canonicalPath(locale: Locale, page: SitePath): string {
  return page === "/" && locale === defaultLocale ? "/" : localizePath(locale, page);
}

/** Bản đồ hreflang cho một trang: { vi: "/vi/about", en: "/en/about", "x-default": "/vi/about" }. */
export function languageAlternates(page: SitePath): Record<string, string> {
  const entries = locales.map((l) => [l, canonicalPath(l, page)] as const);
  return { ...Object.fromEntries(entries), "x-default": canonicalPath(defaultLocale, page) };
}

interface PageMetaInput {
  locale: Locale;
  page: SitePath;
  title: string;
  description: string;
  /** Trang chủ dùng title đầy đủ, không ghép template. */
  absoluteTitle?: boolean;
}

export function buildPageMetadata({ locale, page, title, description, absoluteTitle }: PageMetaInput): Metadata {
  const path = canonicalPath(locale, page);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: languageAlternates(page) },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: `${siteUrl}${path}`,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].ogLocale),
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: siteName }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og-image.png"] },
  };
}

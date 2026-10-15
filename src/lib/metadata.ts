import type { Metadata } from "next";
import { siteName, siteUrl } from "@/config/site";
import type { SitePage } from "@/config/navigation";
import { defaultLocale, localeLabels, locales, localizePath, type Locale } from "@/i18n/config";

/** Bản đồ hreflang cho một trang: { vi: "/vi/about", en: "/en/about", "x-default": "/vi/about" }. */
export function languageAlternates(page: SitePage): Record<string, string> {
  const entries = locales.map((l) => [l, localizePath(l, page)] as const);
  return { ...Object.fromEntries(entries), "x-default": localizePath(defaultLocale, page) };
}

interface PageMetaInput {
  locale: Locale;
  page: SitePage;
  title: string;
  description: string;
  /** Trang chủ dùng title đầy đủ, không ghép template. */
  absoluteTitle?: boolean;
}

export function buildPageMetadata({ locale, page, title, description, absoluteTitle }: PageMetaInput): Metadata {
  const path = localizePath(locale, page);
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

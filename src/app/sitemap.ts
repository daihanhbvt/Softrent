import type { MetadataRoute } from "next";
import { sitePages } from "@/config/navigation";
import { siteUrl } from "@/config/site";
import { locales, localizePath } from "@/i18n/config";
import { languageAlternates } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizePath(locale, page)}`,
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(page)).map(([lang, path]) => [lang, `${siteUrl}${path}`]),
        ),
      },
    })),
  );
}

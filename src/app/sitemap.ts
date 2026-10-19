import type { MetadataRoute } from "next";
import { jobPath, sitePages, type SitePath } from "@/config/navigation";
import { siteUrl } from "@/config/site";
import { jobs } from "@/content/careers";
import { locales } from "@/i18n/config";
import { canonicalPath, languageAlternates } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: SitePath[] = [...sitePages, ...jobs.map((job) => jobPath(job.slug))];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteUrl}${canonicalPath(locale, page)}`,
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

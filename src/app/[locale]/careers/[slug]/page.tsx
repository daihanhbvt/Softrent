import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobApply } from "@/components/sections/careers/JobApply";
import { JobDetail } from "@/components/sections/careers/JobDetail";
import { PageHero } from "@/components/ui/PageHero";
import { jobPath } from "@/config/navigation";
import { findJob, jobs } from "@/content/careers";
import { hasLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/metadata";
import { buildJobPostingJsonLd, serializeJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  // Cache Components bắt buộc trả ít nhất một phần tử — đóng hết vị trí mà trả mảng rỗng là build gãy.
  // Slug giữ chỗ không khớp vị trí nào nên dựng thành trang 404.
  return jobs.length > 0 ? jobs.map(({ slug }) => ({ slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/careers/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const job = findJob(slug);
  if (!hasLocale(locale) || !job) return {};
  const { careers } = await getDictionary(locale);
  const { title, summary } = job.content[locale];
  return buildPageMetadata({ locale, page: jobPath(slug), title: `${careers.detail.heroTitle} ${title}`, description: summary });
}

export default async function JobPage({ params }: PageProps<"/[locale]/careers/[slug]">) {
  const { locale, slug } = await params;
  const job = findJob(slug);
  // Vị trí đã đóng (xoá khỏi `jobs`) hay gõ sai đường dẫn: trang 404 của site, đúng ngôn ngữ.
  if (!hasLocale(locale) || !job) notFound();
  const { careers, nav, common } = await getDictionary(locale);
  const { title, intro } = job.content[locale];
  const careersHref = localizePath(locale, "/careers");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJobPostingJsonLd(job, locale, careers)) }} />
      <PageHero
        breadcrumbLabel={common.breadcrumb}
        homeLabel={nav.home}
        homeHref={localizePath(locale)}
        parent={{ label: careers.hero.breadcrumb, href: careersHref }}
        currentLabel={title}
        title={careers.detail.heroTitle}
        highlight={title}
        description={intro}
      />
      <JobDetail locale={locale} job={job} labels={careers} />
      <JobApply locale={locale} job={job} labels={careers} careersHref={careersHref} />
    </>
  );
}

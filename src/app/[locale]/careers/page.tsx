import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobList } from "@/components/sections/careers/JobList";
import { PageHero } from "@/components/ui/PageHero";
import { jobs } from "@/content/careers";
import { hasLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { meta } = await getDictionary(locale);
  return buildPageMetadata({ locale, page: "/careers", ...meta.careers });
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { careers, nav, common } = await getDictionary(locale);

  return (
    <>
      <PageHero
        breadcrumbLabel={common.breadcrumb}
        homeLabel={nav.home}
        homeHref={localizePath(locale)}
        currentLabel={careers.hero.breadcrumb}
        title={careers.hero.title}
        highlight={careers.hero.highlight}
        description={careers.hero.description}
      />
      <JobList locale={locale} jobs={jobs} labels={careers} />
    </>
  );
}

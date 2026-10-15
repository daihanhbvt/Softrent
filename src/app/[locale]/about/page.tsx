import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { CoreValuesSection } from "@/components/sections/about/CoreValuesSection";
import { MissionCard } from "@/components/sections/about/MissionCard";
import { VisionSection } from "@/components/sections/about/VisionSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { PageHero } from "@/components/ui/PageHero";
import { hasLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { meta } = await getDictionary(locale);
  return buildPageMetadata({ locale, page: "/about", ...meta.about });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { about, nav, common } = dict;

  return (
    <>
      <PageHero
        breadcrumbLabel={common.breadcrumb}
        homeLabel={nav.home}
        homeHref={localizePath(locale)}
        currentLabel={about.hero.breadcrumb}
        title={about.hero.title}
        highlight={about.hero.highlight}
        description={about.hero.description}
      />
      <AboutIntro labels={about.intro} />
      <section aria-label={about.vision.label} className="bg-bg-muted pb-16 pt-16 md:pb-[120px] md:pt-[90px]">
        <VisionSection labels={about.vision} />
        <div className="mt-16 md:mt-[52px]">
          <MissionCard labels={about.mission} />
        </div>
        <div className="mt-16 md:mt-[76px]">
          <CoreValuesSection labels={about.values} />
        </div>
      </section>
      <ContactSection locale={locale} dict={dict} className="pb-16 pt-16 md:pb-[60px] md:pt-[96px]" />
    </>
  );
}

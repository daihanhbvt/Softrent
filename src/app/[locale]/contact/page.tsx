import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { LegalInfo } from "@/components/sections/contact/LegalInfo";
import { MapEmbed } from "@/components/sections/contact/MapEmbed";
import { PageHero } from "@/components/ui/PageHero";
import { hasLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { meta } = await getDictionary(locale);
  return buildPageMetadata({ locale, page: "/contact", ...meta.contact });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { contactPage, nav, common } = dict;

  return (
    <>
      <PageHero
        breadcrumbLabel={common.breadcrumb}
        homeLabel={nav.home}
        homeHref={localizePath(locale)}
        currentLabel={contactPage.hero.breadcrumb}
        title={contactPage.hero.title}
        highlight={contactPage.hero.highlight}
        description={contactPage.hero.description}
      />
      <ContactSection locale={locale} dict={dict} />
      <MapEmbed title={contactPage.mapTitle} locale={locale} />
      <LegalInfo locale={locale} labels={contactPage.legal} />
    </>
  );
}

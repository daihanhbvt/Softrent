import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIntro } from "@/components/sections/home/HomeIntro";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { WhyChooseSection } from "@/components/sections/home/WhyChooseSection";
import { XePrimeSection } from "@/components/sections/home/XePrimeSection";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { meta } = await getDictionary(locale);
  return buildPageMetadata({ locale, page: "/", ...meta.home, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { home } = dict;

  return (
    <>
      <HomeHero locale={locale} labels={home.hero} />
      <HomeIntro labels={home.intro} />
      <ServicesSection labels={home.services} />
      <XePrimeSection labels={home.xeprime} />
      <WhyChooseSection labels={home.why} />
      <ContactSection locale={locale} dict={dict} />
    </>
  );
}

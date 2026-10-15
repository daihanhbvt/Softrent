import Image from "next/image";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bodyLargeClass, buttonClass } from "@/components/ui/styles";
import { xeprimeUrl } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import preview from "../../../../public/images/xeprime-preview.webp";

export function XePrimeSection({ labels }: { labels: Dictionary["home"]["xeprime"] }) {
  return (
    <section
      id="xeprime"
      aria-labelledby="xeprime-title"
      className="scroll-mt-4 bg-gradient-to-br from-[var(--bg-feature-from)] to-[var(--bg-feature-to)] py-16 md:py-[90px]"
    >
      <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,545px)_615px] lg:justify-between">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 id="xeprime-title" className="mt-5 text-[28px] font-semibold leading-[1.25] tracking-[-0.01em] text-fg md:text-[36px]">
            {labels.title}
          </h2>
          <p className={`mt-6 ${bodyLargeClass}`}>
            <RichText text={labels.description} />
          </p>
          <a href={xeprimeUrl} className={buttonClass("primary", "mt-10 md:mt-[62px]")}>
            {labels.cta}
          </a>
        </div>
        <Image src={preview} alt={labels.imageAlt} sizes="(min-width: 1024px) 615px, 100vw" className="h-auto w-full dark:rounded-2xl" />
      </div>
    </section>
  );
}

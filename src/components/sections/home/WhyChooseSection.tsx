import Image, { type StaticImageData } from "next/image";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionTitleClass } from "@/components/ui/styles";
import type { Dictionary } from "@/i18n/get-dictionary";
import iconTech from "../../../../public/images/why-tech.webp";
import iconCost from "../../../../public/images/why-cost.webp";
import iconSecurity from "../../../../public/images/why-security.webp";

const icons: StaticImageData[] = [iconTech, iconCost, iconSecurity];

export function WhyChooseSection({ labels }: { labels: Dictionary["home"]["why"] }) {
  return (
    <section aria-labelledby="why-title" className="bg-bg-subtle pb-16 pt-16 md:pb-[96px] md:pt-[100px]">
      <div className="container-site">
        <SectionLabel className="justify-center">{labels.label}</SectionLabel>
        <h2 id="why-title" className={`mt-4 text-center ${sectionTitleClass}`}>
          {labels.title}
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {labels.items.map((item, index) => (
            <li key={item.title} className="rounded-2xl bg-surface px-6 pb-10 pt-4 text-center shadow-[0_1px_2px_rgb(16_24_40/0.03)]">
              <Image src={icons[index]} alt="" aria-hidden sizes="82px" className="mx-auto size-20 rounded-full dark:opacity-90" />
              <h3 className="mt-6 text-xl font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-base leading-[1.75] text-fg-body md:text-lg">
                <RichText text={item.description} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

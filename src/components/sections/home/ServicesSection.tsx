import Image, { type StaticImageData } from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bodyLargeClass, sectionTitleClass } from "@/components/ui/styles";
import type { Dictionary } from "@/i18n/get-dictionary";
import collage from "../../../../public/images/services-collage.webp";
import iconWeb from "../../../../public/images/service-web.webp";
import iconMobile from "../../../../public/images/service-mobile.webp";
import iconSaas from "../../../../public/images/service-saas.webp";

const serviceIcons: StaticImageData[] = [iconWeb, iconMobile, iconSaas];

export function ServicesSection({ labels }: { labels: Dictionary["home"]["services"] }) {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-4 bg-bg pb-16 md:pb-[136px]">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[minmax(0,560px)_590px] lg:justify-between">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 id="services-title" className={`mt-4 ${sectionTitleClass}`}>
            {labels.title}
          </h2>
          <p className={`mt-6 ${bodyLargeClass}`}>{labels.description}</p>

          <ul className="mt-8 flex flex-col gap-9 md:mt-10">
            {labels.items.map((item, index) => (
              <li key={item.title} className="flex items-start gap-3">
                <Image src={serviceIcons[index]} alt="" aria-hidden className="h-auto w-[84px] shrink-0 md:w-[100px] dark:rounded-xl dark:bg-white/90" sizes="100px" />
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-fg md:text-xl">{item.title}</h3>
                  <p className="mt-1.5 text-base leading-[1.75] text-fg-body md:text-lg">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={collage}
          alt={labels.imageAlt}
          sizes="(min-width: 1024px) 590px, 100vw"
          className="mx-auto h-auto w-full max-w-[590px] lg:-mt-4 dark:rounded-2xl"
        />
      </div>
    </section>
  );
}

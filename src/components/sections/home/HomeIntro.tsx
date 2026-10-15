import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionTitleClass } from "@/components/ui/styles";
import type { Dictionary } from "@/i18n/get-dictionary";

export function HomeIntro({ labels }: { labels: Dictionary["home"]["intro"] }) {
  return (
    <section aria-labelledby="home-intro-title" className="bg-bg pb-16 pt-16 md:pb-[190px] md:pt-[100px]">
      <div className="container-site grid gap-6 lg:grid-cols-[480px_1fr] lg:gap-0">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 id="home-intro-title" className={`mt-3 ${sectionTitleClass}`}>
            {labels.title}
          </h2>
        </div>
        <div className="max-w-[720px] lg:pt-1">
          <p className="text-base font-semibold leading-7 text-fg md:text-lg">{labels.lead}</p>
          <p className="mt-4 text-base leading-7 text-fg-muted md:text-lg">{labels.body}</p>
        </div>
      </div>
    </section>
  );
}

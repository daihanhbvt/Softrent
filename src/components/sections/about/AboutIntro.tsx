import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionTitleClass } from "@/components/ui/styles";
import type { Dictionary } from "@/i18n/get-dictionary";

export function AboutIntro({ labels }: { labels: Dictionary["about"]["intro"] }) {
  return (
    <section aria-labelledby="about-intro-title" className="bg-bg py-16 md:pb-[80px] md:pt-[106px]">
      <div className="container-site grid gap-6 lg:grid-cols-[480px_1fr] lg:gap-0">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 id="about-intro-title" className={`mt-3 max-w-[400px] ${sectionTitleClass}`}>
            {labels.title}
          </h2>
        </div>
        <div className="lg:pt-0.5">
          <p className="text-base font-semibold leading-7 text-fg md:text-lg">{labels.lead}</p>
          {labels.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7 text-fg-muted md:text-lg">
              {paragraph}
            </p>
          ))}
          <ul className="mt-6 flex flex-wrap gap-3">
            {labels.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary-text">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

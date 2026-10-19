import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { bodyLargeClass, cardClass, sectionTitleClass } from "@/components/ui/styles";
import { jobPath } from "@/config/navigation";
import { contactInfo } from "@/config/site";
import type { Job } from "@/content/careers";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatAllowance, formatOpenings } from "@/lib/careers";

interface JobListProps {
  locale: Locale;
  jobs: Job[];
  labels: Dictionary["careers"];
}

export function JobList({ locale, jobs, labels }: JobListProps) {
  const { list, facts } = labels;

  return (
    <section aria-labelledby="job-list-title" className="bg-bg py-16 md:py-[80px]">
      <div className="container-site">
        <SectionLabel>{list.label}</SectionLabel>
        <h2 id="job-list-title" className={`mt-3 ${sectionTitleClass}`}>
          {list.title}
        </h2>

        {jobs.length === 0 ? (
          <div className="mt-6 max-w-[640px]">
            <p className={bodyLargeClass}>{list.empty}</p>
            <a href={`mailto:${contactInfo.email}`} className="mt-3 inline-block rounded text-lg font-medium text-primary-text hover:underline">
              {contactInfo.email}
            </a>
          </div>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {jobs.map((job) => {
              const content = job.content[locale];
              const tags = [
                content.location,
                formatAllowance(locale, job.monthlyAllowance, facts.allowanceValue),
                `${facts.openings}: ${formatOpenings(job.openings)}`,
              ];
              return (
                <li
                  key={job.slug}
                  className={`group relative flex flex-col p-6 transition-colors hover:border-border-accent has-[a:focus-visible]:border-border-accent md:p-8 ${cardClass}`}
                >
                  <h3 className="text-xl font-semibold leading-snug text-fg md:text-2xl">
                    {/* Lớp `after:` phủ cả thẻ: bấm vào đâu trên thẻ cũng mở tin, mà vẫn chỉ có MỘT link. */}
                    <Link href={localizePath(locale, jobPath(job.slug))} className="rounded after:absolute after:inset-0 after:rounded-2xl">
                      {content.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-base leading-[1.6] text-fg-body">{content.summary}</p>
                  <ul aria-label={facts.title} className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary-text">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-base font-medium text-primary-text">
                    {list.viewDetail}
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { RichText } from "@/components/ui/RichText";
import { bodyLargeClass, buttonClass, cardClass, sectionTitleClass } from "@/components/ui/styles";
import { contactInfo } from "@/config/site";
import type { Job } from "@/content/careers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { applyMailto, applySubject } from "@/lib/careers";

interface JobApplyProps {
  locale: Locale;
  job: Job;
  labels: Dictionary["careers"];
  careersHref: string;
}

/** Khối "Cách thức ứng tuyển" cuối trang một vị trí. */
export function JobApply({ locale, job, labels, careersHref }: JobApplyProps) {
  const { apply, detail } = labels;
  const rows = [
    {
      label: apply.email,
      value: (
        <a href={`mailto:${contactInfo.email}`} className="rounded font-medium text-primary-text hover:underline">
          {contactInfo.email}
        </a>
      ),
    },
    {
      label: apply.subject,
      value: <span className="rounded-md bg-bg-soft px-2 py-0.5 font-medium text-fg">{applySubject(apply.subjectPattern, job.applyTag)}</span>,
    },
  ];

  return (
    <section aria-labelledby="job-apply-title" className="bg-bg-tint py-16 md:py-[74px]">
      <div className="container-site">
        <div className={`mx-auto max-w-[760px] p-7 text-center md:p-10 ${cardClass}`}>
          <h2 id="job-apply-title" className={sectionTitleClass}>
            {apply.title}
          </h2>
          <p className={`mt-4 ${bodyLargeClass}`}>{apply.lead}</p>
          <dl className="mt-4 flex flex-col gap-2 text-base">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <dt className="text-fg-muted">{label}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-[1.6] text-fg-body">{job.content[locale].applyHint}</p>
          <a href={applyMailto(job.applyTag)} className={buttonClass("primary", "mt-7")}>
            {apply.button}
          </a>
          <p className="mt-8 text-base font-medium text-fg">
            <RichText text={apply.closing} strongClassName="font-bold text-primary-text" />
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href={careersHref} className="inline-flex items-center gap-1.5 rounded text-base font-medium text-primary-text hover:underline">
            <ArrowRightIcon className="size-4 rotate-180" />
            {detail.backToList}
          </Link>
        </div>
      </div>
    </section>
  );
}

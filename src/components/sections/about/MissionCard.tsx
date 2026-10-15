import type { Dictionary } from "@/i18n/get-dictionary";

export function MissionCard({ labels }: { labels: Dictionary["about"]["mission"] }) {
  return (
    <div className="container-site">
      <div className="rounded-2xl border border-border-accent bg-gradient-to-b from-surface-soft to-surface px-6 py-7 text-center md:px-6 md:pb-8 md:pt-6">
        <h2 className="text-[28px] font-bold leading-tight tracking-[-0.01em] text-fg md:text-[36px]">
          {labels.title} <span className="text-glow text-primary">{labels.highlight}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[1160px] text-base leading-[1.55] text-fg-body">{labels.description}</p>
      </div>
    </div>
  );
}

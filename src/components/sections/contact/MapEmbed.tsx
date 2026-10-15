import { contactInfo } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** Bản đồ Google Maps nhúng theo địa chỉ trong config (tải lười để không ảnh hưởng LCP). */
export function MapEmbed({ title, locale }: { title: string; locale: Locale }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(contactInfo.mapQuery)}&hl=${locale}&z=16&output=embed`;
  return (
    <section aria-label={title} className="bg-bg-tint">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[320px] w-full rounded-t-xl border-0 md:h-[500px] dark:opacity-90"
      />
    </section>
  );
}

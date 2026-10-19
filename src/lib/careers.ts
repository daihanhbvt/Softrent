import { contactInfo } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** "1.500.000 VNĐ/tháng" · "VND 1,500,000/month" — mẫu câu từ từ điển, số định dạng theo ngôn ngữ. */
export function formatAllowance(locale: Locale, amount: number, pattern: string): string {
  return pattern.replace("{amount}", new Intl.NumberFormat(locale).format(amount));
}

/** Số lượng tuyển viết hai chữ số như tin gốc: 1 → "01". */
export function formatOpenings(count: number): string {
  return String(count).padStart(2, "0");
}

/** Tiêu đề email ứng tuyển theo mẫu của từ điển: "[Intern QC] - Họ và tên". */
export function applySubject(pattern: string, tag: string): string {
  return pattern.replace("{tag}", tag);
}

/** Link gửi CV: điền sẵn `[<tag>] - ` ở tiêu đề để ứng viên chỉ gõ thêm họ tên. */
export function applyMailto(tag: string): string {
  return `mailto:${contactInfo.email}?subject=${encodeURIComponent(`[${tag}] - `)}`;
}

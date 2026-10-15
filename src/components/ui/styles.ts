// Lớp tiện ích dùng chung để tránh lặp class giữa các component.

type ButtonVariant = "primary" | "outline";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary-hover",
  outline: "border border-border bg-surface text-primary-text hover:border-primary hover:bg-primary-soft",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} h-12 px-7 ${extra}`.trim();
}

/** Tiêu đề section cỡ 32px như thiết kế (Lĩnh vực hoạt động, Thông tin pháp lý...). */
export const sectionTitleClass = "text-[28px] font-semibold leading-tight tracking-[-0.01em] text-fg md:text-[32px]";

/** Đoạn văn mô tả cỡ 18px. */
export const bodyLargeClass = "text-base leading-[1.6] text-fg-body md:text-lg";

export const cardClass = "rounded-2xl border border-border bg-surface shadow-card";

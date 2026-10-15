interface SectionLabelProps {
  children: React.ReactNode;
  /** "accent": vạch mảnh + chữ xanh (mặc định); "strong": vạch đậm + chữ đậm (mục Tầm nhìn). */
  variant?: "accent" | "strong";
  className?: string;
}

export function SectionLabel({ children, variant = "accent", className = "" }: SectionLabelProps) {
  if (variant === "strong") {
    return (
      <p className={`flex items-center gap-3 text-lg font-semibold text-fg ${className}`}>
        <span aria-hidden className="h-7 w-[3px] rounded-full bg-primary" />
        {children}
      </p>
    );
  }
  return (
    <p className={`flex items-center gap-2.5 text-base text-primary-text ${className}`}>
      <span aria-hidden className="h-3 w-px bg-label-bar" />
      {children}
    </p>
  );
}

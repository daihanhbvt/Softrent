export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "softrent-theme";

/** Theme người dùng đã chọn, nếu chưa chọn thì theo hệ điều hành. Chỉ gọi ở client. */
export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Trình duyệt chặn localStorage: dùng thiết lập hệ điều hành.
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Script chạy đồng bộ trong <head> để đặt theme trước lần vẽ đầu (tránh nháy). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

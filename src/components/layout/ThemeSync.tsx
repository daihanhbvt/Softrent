"use client";

import { useLayoutEffect } from "react";
import { getPreferredTheme } from "@/lib/theme";

/**
 * Áp lại theme khi <html> được dựng lại phía client (ví dụ đổi /vi ↔ /en: layout gốc
 * render lại thẻ <html> mới, còn script trong <head> không chạy lại).
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const theme = getPreferredTheme();
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
  }, []);
  return null;
}

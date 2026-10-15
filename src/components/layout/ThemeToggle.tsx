"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

interface ThemeToggleProps {
  labels: { toLight: string; toDark: string };
  className?: string;
}

export function ThemeToggle({ labels, className = "" }: ThemeToggleProps) {
  // Server render luôn là "light"; giá trị thật được đọc từ <html data-theme> sau hydrate.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Bỏ qua khi trình duyệt chặn localStorage.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? labels.toDark : labels.toLight}
      title={next === "dark" ? labels.toDark : labels.toLight}
      className={`inline-flex size-10 items-center justify-center rounded-md text-fg-body transition-colors hover:bg-primary-soft hover:text-primary-text ${className}`}
    >
      {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}

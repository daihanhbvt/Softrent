import { NotFoundContent } from "@/components/sections/NotFoundContent";
import en from "@/i18n/dictionaries/en";
import vi from "@/i18n/dictionaries/vi";

export default function NotFound() {
  return <NotFoundContent messages={{ vi: vi.notFound, en: en.notFound }} />;
}

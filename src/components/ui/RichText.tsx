import { Fragment } from "react";

/** Hiển thị chuỗi từ điển: hỗ trợ **chữ đậm** và xuống dòng bằng "\n". */
export function RichText({ text, strongClassName = "font-semibold text-fg" }: { text: string; strongClassName?: string }) {
  return text.split("\n").map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={strongClassName}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

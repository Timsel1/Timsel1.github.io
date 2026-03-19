import { html, type TemplateResult } from "lit";

export function renderPages<T>(
  pages: T[][],
  itemTemplate: (item: T, pageIndex: number) => TemplateResult,
): TemplateResult[] {
  return pages.map(
    (page, pageIndex) => html`${page.map((item) => itemTemplate(item, pageIndex))}`,
  );
}

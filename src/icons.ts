import {
  createElement,
  ChevronLeft,
  ChevronRight,
  Settings,
  Search,
  X,
  Album,
} from "lucide";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

function lucideToSvg(icon: any) {
  const el = createElement(icon);
  const svgString = el.outerHTML;
  return html`${unsafeHTML(svgString)}`;
}

export const icons: Record<string, unknown> = {
  "chevron-left": lucideToSvg(ChevronLeft),
  "chevron-right": lucideToSvg(ChevronRight),
  settings: lucideToSvg(Settings),
  search: lucideToSvg(Search),
  close: lucideToSvg(X),
  album: lucideToSvg(Album),
};

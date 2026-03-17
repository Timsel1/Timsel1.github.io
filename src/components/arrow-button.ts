import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./style/arrow-button.css?raw";

@customElement("arrow-button")
export class ArrowButton extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: String }) direction: string = "";
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";

  render() {
    return html``;
  }
}

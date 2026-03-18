import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./style/round-button.css?raw";
import { icons } from "../icons";

@customElement("round-button")
export class RoundButton extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String }) background: "default" | "transparent" | "accent" =
    "default";
  @property({ type: String }) icon: string = "";

  render() {
    return html` <button>${icons[this.icon] ?? this.icon}</button> `;
  }
}

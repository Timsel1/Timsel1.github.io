import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("flappy-burd-page")
export class FlappyBurd extends LitElement {
  render() {
    return html` <p>Flappy Burd</p> `;
  }
}

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("home-page")
export class Home extends LitElement {
  render() {
    return html` <p>home</p> `;
  }
}

import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("leaderboard-page")
export class Leaderboard extends LitElement {
  render() {
    return html` <p>Leaderboard</p> `;
  }
}

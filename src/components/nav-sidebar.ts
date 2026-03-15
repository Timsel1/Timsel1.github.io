import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./style/nav-sidebar.css?raw";

@customElement("nav-sidebar")
export class NavSidebar extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <nav>
        <a class="nav-button" href="/">Home</a>
        <a class="nav-button" href="/flappy-burd">Flappy Burd</a>
        <a class="nav-button" href="/leaderboard">Leaderboard</a>
      </nav>
    `;
  }
}

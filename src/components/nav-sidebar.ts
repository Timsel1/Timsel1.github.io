import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./style/nav-sidebar.css?raw";

@customElement("nav-sidebar")
export class NavSidebar extends LitElement {
  static styles = unsafeCSS(styles);

  private handleNav(e: Event) {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    history.pushState(null, "", target.href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    return html`
      <nav class="navbar">
        <a class="nav-button" href="/" @click=${this.handleNav}>Home</a>
        <a class="nav-button" href="/flappy-burd" @click=${this.handleNav}
          >Flappy Burd</a
        >
        <a class="nav-button" href="/leaderboard" @click=${this.handleNav}
          >Leaderboard</a
        >
      </nav>
    `;
  }
}

import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import UniversalRouter from "universal-router";
import styles from "./style/app.css?raw";
import "./nav-sidebar";
import "../pages/home";
import "../pages/flappy-burd";
import "../pages/flappy-burd-leaderboard";

@customElement("app-element")
export class App extends LitElement {
  static styles = unsafeCSS(styles);

  private router = new UniversalRouter([
    { path: "/", action: () => "<home-page></home-page>" },
    {
      path: "/flappy-burd",
      action: () => "<flappy-burd-page></flappy-burd-page>",
    },
    {
      path: "/leaderboard",
      action: () => "<leaderboard-page></leaderboard-page>",
    },
  ]);

  firstUpdated() {
    this.navigate(window.location.pathname);

    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  async navigate(path: string) {
    const result = await this.router.resolve(path);
    const main = this.shadowRoot!.querySelector("main")!;
    main.innerHTML = result as string;
  }

  render() {
    return html`
      <nav-sidebar></nav-sidebar>
      <main></main>
    `;
  }
}

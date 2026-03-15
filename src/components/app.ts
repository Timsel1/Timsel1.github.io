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

  render() {
    return html`
      <nav-sidebar></nav-sidebar>
      <main></main>
    `;
  }
}

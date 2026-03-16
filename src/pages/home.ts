import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/repo-card";
import "../components/grid-carousel";
import styles from "./style/home.css?raw";

@customElement("home-page")
export class Home extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <p>home</p>
      <div class="centered">
        <grid-carousel gridSize="4" scrollInterval="10000">
          <repo-card
            name="project 1"
            description="description 1"
            language="C#"
            url="https://github.com"
          ></repo-card>
          <repo-card
            name="project 2"
            description="description 2"
            language="Python"
            url="https://github.com"
          ></repo-card>
          <repo-card
            name="project 3"
            description="description 3"
            language="Java"
            url="https://github.com"
          ></repo-card>
          <repo-card
            name="project 4"
            description="description 4"
            language="TypeScript"
            url="https://github.com"
          ></repo-card>
          <repo-card
            name="project 5"
            description="description 5"
            language="C#"
            url="https://github.com"
          ></repo-card>
          <repo-card
            name="project 6"
            description="description 6"
            language="Python"
            url="https://github.com"
          ></repo-card>
        </grid-carousel>
      </div>
    `;
  }
}

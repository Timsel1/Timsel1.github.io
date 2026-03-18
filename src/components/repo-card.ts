import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { icons } from "../icons";
import styles from "./style/repo-card.css?raw";

@customElement("repo-card")
export class RepoCard extends LitElement {
  static styles = unsafeCSS(styles);

  @property() name: string = "";
  @property() description: string = "";
  @property() language: string = "";
  @property() url: string = "";

  render() {
    return html`
      <a href=${this.url} target="_blank">
        <div class="left-card-side">
          <span class="name"> ${icons["album"]} ${this.name} </span>
          <p>${this.description}</p>
        </div>
        <div class="right-card-side">
          <span class="language">${this.language}</span>
        </div>
      </a>
    `;
  }
}

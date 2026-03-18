import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GithubService } from "../services/github-service";
import type { Repo } from "../interfaces/models/repo";
import "../components/repo-card";
import "../components/grid-carousel";
import styles from "./style/home.css?raw";

@customElement("home-page")
export class Home extends LitElement {
  static styles = unsafeCSS(styles);
  private _githubService = new GithubService();
  @state() private _repos: Repo[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this._repos = await this._githubService.getRepos("Timsel1");
  }

  render() {
    return html`
      <p>home</p>
      <div class="centered">
        <grid-carousel columns="2" rows="2" scrollInterval="10000">
          ${this._repos.map(
            (repo) => html`
              <repo-card
                name=${repo.name}
                description=${repo.description}
                language=${repo.language}
                url=${repo.html_url}
              ></repo-card>
            `,
          )}
        </grid-carousel>
      </div>
    `;
  }
}

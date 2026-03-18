import { LitElement, html, unsafeCSS } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./style/grid-carousel.css?raw";
import "./round-button";

@customElement("grid-carousel")
export class GridCarousel extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) columns: number = 2;
  @property({ type: Number }) rows: number = 2;
  @property({ type: Number }) scrollInterval: number = 5000;
  @property({ type: Number }) pageCount: number = 0;

  @state() private _currentPage: number = 0;
  private _autoScrollTimer: number | null = null;

  private next() {
    this._currentPage += 1;
    if (this._currentPage >= this.pageCount) {
      this._currentPage = 0;
    }
  }

  private onNextClick() {
    this.next();
    this.resetAutoScrollTimer();
  }

  private onPrevClick() {
    this._currentPage -= 1;
    if (this._currentPage < 0) {
      this._currentPage = this.pageCount - 1;
    }
    this.resetAutoScrollTimer();
  }

  private resetAutoScrollTimer() {
    if (this._autoScrollTimer !== null) {
      clearInterval(this._autoScrollTimer);
    }
    this._autoScrollTimer = setInterval(() => {
      this.next();
    }, this.scrollInterval);
  }

  connectedCallback() {
    super.connectedCallback();
    this._autoScrollTimer = setInterval(() => {
      this.next();
    }, this.scrollInterval);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._autoScrollTimer !== null) {
      clearInterval(this._autoScrollTimer);
    }
  }

  render() {
    return html`
      <round-button
        icon="chevron-left"
        size="medium"
        background="transparent"
        @click=${this.onPrevClick}
      ></round-button>
      <div class="track-container">
        <div
          class="track"
          style=${styleMap({
            transform: `translateX(-${this._currentPage * 100}%)`,
            transition: "transform 0.4s ease",
          })}
        >
          ${Array.from(
            { length: this.pageCount },
            (_, i) => html`
              <div
                class="page"
                style=${styleMap({
                  gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${this.rows}, 1fr)`,
                })}
              >
                <slot name="page-${i}"></slot>
              </div>
            `,
          )}
        </div>
      </div>
      <round-button
        icon="chevron-right"
        size="medium"
        background="transparent"
        @click=${this.onNextClick}
      ></round-button>
    `;
  }
}

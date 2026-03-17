import { LitElement, html, unsafeCSS } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./style/grid-carousel.css?raw";

@customElement("grid-carousel")
export class GridCarousel extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) columns: number = 2;
  @property({ type: Number }) rows: number = 2;
  @property({ type: Number }) scrollInterval: number = 5000;

  @state() private _currentPage: number = 0;
  @state() private _totalPages: number = 0;
  private _slottedItems: Element[] = [];
  private _autoScrollTimer: number | null = null;

  private onSlotChange() {
    const slot = this.shadowRoot!.querySelector("slot") as HTMLSlotElement;
    this._slottedItems = Array.from(slot.assignedElements());
    this._totalPages = Math.ceil(
      this._slottedItems.length / (this.columns * this.rows),
    );
    this.showPage(0);
  }

  private showPage(page: number) {
    this._slottedItems.forEach((item, index) => {
      const itemPage = Math.floor(index / (this.columns * this.rows));
      if (itemPage === page) {
        (item as HTMLElement).style.display = "flex";
      } else {
        (item as HTMLElement).style.display = "none";
      }
    });
  }

  private next() {
    this._currentPage += 1;
    if (this._currentPage >= this._totalPages) {
      this._currentPage = 0;
    }
    this.showPage(this._currentPage);
  }

  private onNextClick() {
    this.next();
    this.resetAutoScrollTimer();
  }

  private onPrevClick() {
    this._currentPage -= 1;
    if (this._currentPage < 0) {
      this._currentPage = this._totalPages - 1;
    }
    this.showPage(this._currentPage);
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
    const gridStyles = {
      gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
      gridTemplateRows: `repeat(${this.rows}, 1fr)`,
    };

    return html`
      <button @click=${this.onPrevClick}>‹</button>
      <div class="grid" style=${styleMap(gridStyles)}>
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
      <button @click=${this.onNextClick}>›</button>
    `;
  }
}

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./style/grid-carousel.css?raw";

@customElement("grid-carousel")
export class GridCarousel extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) gridSize: number = 4;
  @property({ type: Number }) scrollInterval: number = 5000;

  @state() private _currentPage: number = 0;
  @state() private _totalPages: number = 0;
  private _slottedItems: Element[] = [];
  private _autoScrollTimer: number | null = null;

  private onSlotChange() {
    const slot = this.shadowRoot!.querySelector("slot") as HTMLSlotElement;
    this._slottedItems = Array.from(slot.assignedElements());
    this._totalPages = Math.ceil(this._slottedItems.length / this.gridSize);
    this.showPage(0);
  }

  private showPage(page: number) {
    this._slottedItems.forEach((item, index) => {
      const itemPage = Math.floor(index / this.gridSize);
      if (itemPage === page) {
        (item as HTMLElement).style.display = "flex"; // show
      } else {
        (item as HTMLElement).style.display = "none"; //hide
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

  private inPrevClick() {
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
    return html`
      <button @click=${this.inPrevClick}><</button>
      <div class="grid">
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
      <button @click=${this.onNextClick}>></button>
    `;
  }
}

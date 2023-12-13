import { IVerticalScrollbar } from '../interfaces';

export default class VerticalScrollbarModel implements IVerticalScrollbar {
  Top: number = 1;
  Height: number = 100;
  IsDrag: boolean = false;

  constructor(obj?: Partial<VerticalScrollbarModel>) {
    if (obj) Object.assign(this, obj);
  }

  onStartDrag(): void {
    if (!this.IsDrag) this.IsDrag = true;
  }
  onDrag(e: MouseEvent, $scroll: HTMLElement): void {
    if (!this.IsDrag || !$scroll) return;
    e.preventDefault();
    const hideScrollRect = $scroll.getBoundingClientRect();
    const scrollTop =
      ((e.clientY -
        hideScrollRect.y -
        hideScrollRect.height * (this.Height / 2 / 100)) /
        hideScrollRect.height) *
      $scroll.scrollHeight;
    $scroll.scrollTop = scrollTop;
  }

  onStopDrag(): void {
    if (this.IsDrag) this.IsDrag = false;
  }

  setStyles($scroll: HTMLElement): void {
    if (!$scroll) return;
    this.Top = ($scroll.scrollTop / $scroll.scrollHeight) * 100;
    this.Height = ($scroll.offsetHeight / $scroll.scrollHeight) * 100;
  }

  scrollTo(y: number, $scroll: HTMLElement) {
    $scroll.scrollTop = y;
  }

  get Styles() {
    return { top: `${this.Top}%`, height: `${this.Height}%` };
  }

  get Visible(): boolean {
    return this.Height < 100;
  }

  get IsStart() {
    return this.Top <= 0;
  }
  get IsEnd() {
    return this.Height + this.Top >= 100;
  }
}

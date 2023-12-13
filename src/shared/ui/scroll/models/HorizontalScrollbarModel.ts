import { IHorizontalScrollbar } from '../interfaces';

export default class HorizontalScrollbarModel implements IHorizontalScrollbar {
  Left: number = 1;
  Width: number = 100;
  IsDrag: boolean = false;

  constructor(obj?: Partial<HorizontalScrollbarModel>) {
    if (obj) Object.assign(this, obj);
  }

  onStartDrag(): void {
    if (!this.IsDrag) this.IsDrag = true;
  }
  onDrag(e: MouseEvent, $scroll: HTMLElement): void {
    if (!this.IsDrag || !$scroll) return;
    e.preventDefault();
    const hideScrollRect = $scroll.getBoundingClientRect();
    const scrollLeft =
      ((e.clientX -
        hideScrollRect.x -
        hideScrollRect.width * (this.Width / 2 / 100)) /
        hideScrollRect.width) *
      $scroll.scrollWidth;
    $scroll.scrollLeft = scrollLeft;
  }
  onStopDrag(): void {
    if (this.IsDrag) this.IsDrag = false;
  }

  scrollTo(x: number, $scroll: HTMLElement) {
    $scroll.scrollLeft = x;
  }

  setStyles($scroll: HTMLElement): void {
    if (!$scroll) return;
    this.Left = ($scroll.scrollLeft / $scroll.scrollWidth) * 100;
    this.Width = ($scroll.offsetWidth / $scroll.scrollWidth) * 100;
  }

  get Styles() {
    return { left: `${this.Left}%`, width: `${this.Width}%` };
  }

  get Visible(): boolean {
    return this.Width < 100;
  }

  get IsStart() {
    return this.Left <= 0;
  }
  get IsEnd() {
    return this.Width + this.Left >= 100;
  }
}

import { AppEventManager } from "./app-event-manager";

export class WebEventManager extends AppEventManager {

  async addDOMEvents(): Promise<void> {
    this.keyManager.keysDomElements.forEach(el => {
      this.addMouseEvent(el);
    });
    this.addKeyEvents();
  }

  private async addMouseEvent(el: HTMLDivElement): Promise<void> {
    el.addEventListener("mousedown", (evt: MouseEvent) => this.play(evt.target));
    el.addEventListener("mouseup", (evt: MouseEvent) => this.unplay(evt.target));
  }

  private async addKeyEvents(): Promise<void> {
    window.addEventListener("keydown", (evt: KeyboardEvent) => {
      const keyObj = this.keyManager.getKeyByKeyPressed(evt.key);
      if (keyObj) {
        const keyEl = document.querySelector<HTMLDivElement>(`#${keyObj.id}`)!;
        this.play(keyEl);
      }
    }, true);

    window.addEventListener("keyup", (evt: KeyboardEvent) => {
      const keyObj = this.keyManager.getKeyByKeyPressed(evt.key);
      if (keyObj) {
        const keyEl = document.querySelector<HTMLDivElement>(`#${keyObj.id}`)!;
        this.unplay(keyEl);
      }
    }, true);
  }
}
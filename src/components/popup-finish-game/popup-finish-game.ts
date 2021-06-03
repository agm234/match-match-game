import { BaseComponent } from '../base-component';
import './popup-finish-game.scss';

export class PopupFinish extends BaseComponent {
  constructor() {
    super('div', ['finish']);
    this.element.innerHTML = `
        <div class="finish_window">
        <p class="info">Congratulations! You successfully found all matches on  minutes and  seconds.</p>
        <a href="#test2">
        <button class="finish_btn">Ok</button>
        </a>
        </div>
    `;
  }
}

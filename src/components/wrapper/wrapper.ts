import { BaseComponent } from '../base-component';
import './wrapper.scss';

export class Wrapper extends BaseComponent {
  constructor() {
    super('div', ['wrapper']);
    this.element.innerHTML = `
            <div class="left">
                <div class="left__first">
                    <div class="left__img left__img_1"></div>
                    <p class="left__info">Register new player in game</p>
                </div>
                <div class="left__second">
                    <div class="left__img left__img_2"></div>
                    <p class="left__info">Configure your game settings</p>
                </div>
                <div class="left__third">
                    <div class="left__img left__img_3"></div>
                    <p class="left__info">Start you new game! Remember card positions and match it before times up.
                    </p>
                </div>

            </div>
            <div class="right">
                <div class="right__first"></div>
                <div class="right__second"></div>
                <div class="right__third"></div>
                </div>
            </div>
        `;
  }
}

import { BaseComponent } from '../base-component';
import './card-container.scss';

export class CardContainer extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card_container']);
    this.element.innerHTML = `
        <div class='card'>
        <div class='card_front' style="background-image:url('./images/${image}')"></div>
        <div class='card_back'></div>
        </div>
        `;
  }

  FliptoBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  FliptoFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle('fliped', isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}

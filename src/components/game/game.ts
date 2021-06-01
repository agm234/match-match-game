import { BaseComponent } from '../base-component';
import './game.scss';
import { CardContainer } from '../card-container/card-container';
import { TimerContent } from '../timer-content/timer-content';

export class Game extends BaseComponent {
  private timer!: number;

  private cards: CardContainer[] = [];

  constructor() {
    super('div', ['game']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: CardContainer[]) {
    this.cards = cards;
    const timer = new TimerContent();
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.FliptoBack());
      new TimerContent().startTimer();
    }, 5000);
  }
}

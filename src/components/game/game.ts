import { BaseComponent } from '../base-component';
import './game.scss';
import { CardContainer } from '../card-container/card-container';

export class Game extends BaseComponent {
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
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.FliptoBack());
    }, 5000);
  }
}

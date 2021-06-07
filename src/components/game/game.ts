import { BaseComponent } from '../base-component';
import './game.scss';
import { CardContainer } from '../card-container/card-container';

export class Game extends BaseComponent {
  private cards: CardContainer[] = [];

  constructor() {
    super('div', ['game']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: CardContainer[]): void {
    this.cards = cards;
    const CardWidth = 100 / Math.sqrt(this.cards.length) - 1;
    const CardHeight = 100 / Math.sqrt(this.cards.length) - 1;
    this.cards.forEach((card) => {
      card.element.style.width = `calc(${CardWidth}%)`;
      card.element.style.height = `calc(${CardHeight}%)`;
      this.element.appendChild(card.element);
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.FliptoBack());
    }, 5000);
  }
}

import { BaseComponent } from '../base-component';
import { Timer } from '../timer/timer';
import { Game } from '../game/game';
import { CardContainer } from '../card-container/card-container';
import { delay } from '../shared/delay';
import './game-wrapper.scss';

const flipDelay = 2000;

export class GameWrapper extends BaseComponent {
  private readonly game: Game;

  private activeCard?: CardContainer;

  private isAnimation = false;

  private readonly Timer: Timer;

  constructor() {
    super('div', ['game_wrapper']);
    this.Timer = new Timer();
    this.element.appendChild(this.Timer.element);
    this.game = new Game();
    this.element.appendChild(this.game.element);
  }

  StartGame(images: string[]) {
    // this.game.clear;
    const cards = images.concat(images).map((url) => new CardContainer(url)).sort(() => Math.random() - 0.2);
    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));
    this.game.addCards(cards);
  }

  private async cardHandler(card: CardContainer) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.FliptoFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await delay(flipDelay);
      await Promise.all([card.FliptoBack(),
        this.activeCard.FliptoBack()]);
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}

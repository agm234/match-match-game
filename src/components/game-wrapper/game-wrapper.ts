import { BaseComponent } from '../base-component';
import { Timer } from '../timer/timer';
import { Game } from '../game/game';
import { CardContainer } from '../card-container/card-container';
import { delay } from '../shared/delay';
import { DataBase } from '../../indexedDB';
import { FormWrapper } from '../form-wrapper/form-wrapper';
import './game-wrapper.scss';
import { GameSettingCards } from '../game-setting-cards/game-setting-cards';
import { TimerContent } from '../timer-content/timer-content';
import { PopupFinish } from '../popup-finish-game/popup-finish-game';

const flipDelay = 1000;
let numberofcards = 0;
export class GameWrapper extends BaseComponent {
  private readonly game: Game;

  private cards!: CardContainer[];

  private activeCard?: CardContainer;

  private isAnimation = false;

  private readonly PopupFinish: PopupFinish;

  private readonly Timer: Timer;

  public TimerContent!: TimerContent;

  // private DataBase!: DataBase;

  // private FormWrapper!: FormWrapper;

  constructor() {
    super('div', ['game_wrapper']);
    this.PopupFinish = new PopupFinish();
    this.element.appendChild(this.PopupFinish.element);
    this.Timer = new Timer();
    this.element.appendChild(this.Timer.element);
    this.game = new Game();
    this.element.appendChild(this.game.element);
  }

  StartGame(images: string[]) {
    this.game.clear();
    this.TimerContent = new TimerContent();
    this.cards = images.concat(images).map((url) => new CardContainer(url)).sort(() => Math.random() - 0.2);
    this.cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));
    this.game.addCards(this.cards);
    setTimeout(() => {
      this.TimerContent.startTimer();
    }, 5000);
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
    if (this.activeCard.image === card.image) {
      numberofcards += 2;
    }
    if (numberofcards === this.cards.length) {
      this.TimerContent.stopTimer();
      const info = document.querySelectorAll('.info');
      info[0].innerHTML = `
      Congratulations! You successfully found all matches on ${this.TimerContent.dataTimer.getUTCMinutes()} minutes and ${this.TimerContent.dataTimer.getUTCSeconds()} seconds.
      `;
      this.PopupFinish.element.classList.add('visible');
      document.body.classList.add('noscrool');
      // this.DataBase.store.put({})
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}

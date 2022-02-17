import { BaseComponent } from '../base-component';
import { Timer } from '../timer/timer';
import { CardContainer } from '../card-container/card-container';
import { delay } from '../shared/delay';
import { DataBase } from '../../indexedDB';
import { FormWrapper } from '../form-wrapper/form-wrapper';
import './game-wrapper.scss';
import { TimerContent } from '../timer-content/timer-content';
import { PopupFinish } from '../popup-finish-game/popup-finish-game';
import { GameWrapperGame } from '../game_warapper_game/game_warapper_game';

interface MyRecord {
  name: string;
  lastname: string;
  email: string;
  score: number;
  id: IDBValidKey;
}

const flipDelay = 1000;
let numberofcards = 0;
let numberOfComparisons = 0;
let numberOfFalseComparisons = 0;
export class GameWrapper extends BaseComponent {
  private readonly gameWrapperGame: GameWrapperGame;

  private cards!: CardContainer[];

  private activeCard?: CardContainer;

  private isAnimation = false;

  private readonly PopupFinish: PopupFinish;

  private readonly Timer: Timer;

  public TimerContent!: TimerContent;

  private FormWrapper!: FormWrapper;

  constructor() {
    super('div', ['game_wrapper']);
    this.PopupFinish = new PopupFinish();
    this.element.appendChild(this.PopupFinish.element);
    this.Timer = new Timer();
    this.element.appendChild(this.Timer.element);
    this.gameWrapperGame = new GameWrapperGame();
    this.element.appendChild(this.gameWrapperGame.element);
    this.FormWrapper = new FormWrapper();
  }

  StartGame(images: string[]): void {
    this.gameWrapperGame.game.clear();
    this.TimerContent = new TimerContent();
    this.cards = images
      .concat(images)
      .map((url) => new CardContainer(url))
      .sort(() => Math.random() - 0.2);
    numberofcards = 0;
    numberOfComparisons = 0;
    numberOfFalseComparisons = 0;
    this.cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));
    this.gameWrapperGame.game.addCards(this.cards);
    document.querySelectorAll('.stop')?.forEach(el=>{
      el.classList.add('not-active');
    })
    setTimeout(() => {
      this.TimerContent.startTimer();
      document.querySelectorAll('.stop')?.forEach(elem=>{
      elem.classList.remove('not-active');
      })
    }, 5000);
  }

  stop(): void {
    this.TimerContent.stopTimer();
    this.gameWrapperGame.game.clear();
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
      this.activeCard.element.classList.add('red');
      card.element.classList.add('red');
      numberOfComparisons += 1;
      numberOfFalseComparisons += 1;
      await delay(flipDelay);
      await Promise.all([
        card.FliptoBack(),
        this.activeCard.FliptoBack(),
        this.activeCard.element.classList.remove('red'),
        card.element.classList.remove('red'),
      ]);
    }
    if (this.activeCard.image === card.image) {
      this.activeCard.element.classList.add('green');
      card.element.classList.add('green');
      numberOfComparisons += 1;
      numberofcards += 2;
    }
    if (numberofcards === this.cards.length) {
      this.finishgame();
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  async finishgame(): Promise<void> {
    this.TimerContent.stopTimer();
    const info = document.querySelector('.info');
    (info as HTMLElement).innerHTML = `
      Congratulations! You successfully found all matches on ${this.TimerContent.dataTimer.getUTCMinutes()} 
      minutes and ${this.TimerContent.dataTimer.getUTCSeconds()} seconds.
      `;
    this.PopupFinish.element.classList.add('visible');
    document.body.classList.add('noscrool');
    let Newscore = (numberOfComparisons - numberOfFalseComparisons) * 100
      - (this.TimerContent.dataTimer.getUTCMinutes() * 60 + this.TimerContent.dataTimer.getUTCSeconds()) * 10;
    if (Newscore < 0) {
      Newscore = 0;
    }
    const userEmail = this.FormWrapper.UserData().email;
    const Idb = new DataBase();
    await Idb.init('agm234', 1);
    const user = await Idb.read<MyRecord>(userEmail);
    user[0].score = Newscore;
    await Idb.putNewScore(user[0]);
  }
}

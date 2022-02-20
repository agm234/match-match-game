import { BaseComponent } from '../base-component';
import './timer-content.scss';

export class TimerContent extends BaseComponent {
  private timer!: number;

  private test!: HTMLCollectionOf<HTMLHeadingElement>;

  public dataTimer!: Date;

  constructor() {
    super('h2', ['timer_content']);
    this.element.innerHTML = `
        00:00
        `;
        this.clearTimer();
  }

  startTimer(): void {
    this.clearTimer();
    let miliseconds = 0;
    this.test = document.getElementsByTagName('h2');
    this.timer = window.setInterval(() => {
      miliseconds += 10;
      this.dataTimer = new Date(miliseconds);
      this.test[0].innerHTML = `${`0${this.dataTimer.getUTCMinutes()}`.slice(-2)}:
      ${`0${this.dataTimer.getUTCSeconds()}`.slice(-2)}`;
    }, 10);
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  clearTimer(): void {
    this.element.innerHTML = `
        00:00
        `;
  }
}

import { BaseComponent } from '../base-component';
import './timer-content.scss';

export class TimerContent extends BaseComponent {
  private timer!: number;

  constructor() {
    super('h2', ['timer_content']);
    this.element.innerHTML = `
        00:00
        `;
  }

  startTimer() {
    console.log('starttimer');
    let miliseconds = 0;
    const test = document.getElementsByTagName('h2');
    this.timer = window.setInterval(() => {
      miliseconds += 10;
      const dataTimer = new Date(miliseconds);
      test[0].innerHTML = `${(`0${dataTimer.getUTCMinutes()}`).slice(-2)}:${
        (`0${dataTimer.getUTCSeconds()}`).slice(-2)}`;
    }, 10);
  }

  stopTimer() {
    console.log('cleartimer');
    clearInterval(this.timer);
  }
}

import { BaseComponent } from '../base-component';
import './timer.scss';
import { TimerContent } from '../timer-content/timer-content';

export class Timer extends BaseComponent {
  private readonly TimerContent: TimerContent;

  constructor() {
    super('div', ['timer']);
    this.TimerContent = new TimerContent();
    this.element.appendChild(this.TimerContent.element);
  }
}

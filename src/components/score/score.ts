import { BaseComponent } from '../base-component';
import { ScoreWrapper } from '../score-wrapper/score-wrapper';
import './score.scss';

export class Score extends BaseComponent {
  private readonly ScoreWrapper: ScoreWrapper;

  constructor() {
    super('main', ['main_score']);
    this.ScoreWrapper = new ScoreWrapper();
    this.element.appendChild(this.ScoreWrapper.element);
  }
}

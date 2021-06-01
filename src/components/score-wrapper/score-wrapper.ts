import { BaseComponent } from '../base-component';
import { ScoreHeader } from '../score-header/score-header';
import './score-wrapper.scss';

export class ScoreWrapper extends BaseComponent {
  private readonly ScoreHeader: ScoreHeader;

  constructor() {
    super('div', ['score_wrapper']);
    this.ScoreHeader = new ScoreHeader();
    this.element.appendChild(this.ScoreHeader.element);
  }
}

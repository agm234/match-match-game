import { BaseComponent } from '../base-component';
import { ScoreHeader } from '../score-header/score-header';
import { ScoreList } from '../score-list/score-list';
import './score-wrapper.scss';

export class ScoreWrapper extends BaseComponent {
  private readonly ScoreHeader: ScoreHeader;

  private readonly ScoreList: ScoreList;

  constructor() {
    super('div', ['score_wrapper']);
    this.ScoreHeader = new ScoreHeader();
    this.element.appendChild(this.ScoreHeader.element);
    this.ScoreList = new ScoreList();
    this.element.appendChild(this.ScoreList.element);
  }
}

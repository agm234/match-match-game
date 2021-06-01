import { BaseComponent } from '../base-component';

import './score-header.scss';

export class ScoreHeader extends BaseComponent {
  constructor() {
    super('h1', ['header']);
    this.element.innerHTML = `
        Best players
        `;
  }
}

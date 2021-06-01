import { BaseComponent } from '../base-component';
import './header-logo.scss';

export class HeaderLogo extends BaseComponent {
  constructor() {
    super('div', ['logo']);
    this.element.innerHTML = `
                <p class="logo__top">Match</p>
                <p class="logo__bottom">Match</p>
            `;
  }
}

import { BaseComponent } from '../base-component';
import './header-nav.scss';

export class HeaderNav extends BaseComponent {
  constructor() {
    super('div', ['nav']);
    this.element.innerHTML = `
        <a class="nav__item active_nav" href="#test1">
            <div class="nav__img nav__img_about"></div>
            <p class="nav__about">About game</p>
        </a>
        <a class="nav__item" href="#test2">
            <div class="nav__img nav__img_score"></div>
            <p class="nav__score">Best score</p>
        </a>
        <a class="nav__item" href="#test3">
            <div class="nav__img nav__img_settings"></div>
            <p class="nav__settings">Game settings</p>
        </a>
            `;
  }
}

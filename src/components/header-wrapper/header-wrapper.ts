import { BaseComponent } from '../base-component';
import { HeaderLogo } from '../header-logo/header-logo';
import { HeaderNav } from '../header-nav/header-nav';
import { HeaderBtnWrapper } from '../header-btn-wrapper/header-btn-wrapper';
import './header-wrapper.scss';

export class HeaderWrapper extends BaseComponent {
  private readonly HeaderLogo: HeaderLogo;

  private readonly HeaderNav: HeaderNav;

  private readonly HeaderBtnWrapper: HeaderBtnWrapper;

  constructor() {
    super('div', ['header_wrapper']);
    this.HeaderLogo = new HeaderLogo();
    this.element.appendChild(this.HeaderLogo.element);
    this.HeaderNav = new HeaderNav();
    this.element.appendChild(this.HeaderNav.element);
    this.HeaderBtnWrapper = new HeaderBtnWrapper();
    this.element.appendChild(this.HeaderBtnWrapper.element);
  }
}

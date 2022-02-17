import { BaseComponent } from '../base-component';
import { HeaderWrapper } from '../header-wrapper/header-wrapper';
import './header.scss';

export class Header extends BaseComponent {
  private readonly headerWrapper: HeaderWrapper;

  constructor() {
    super('header', ['header']);
    this.headerWrapper = new HeaderWrapper();
    this.element.appendChild(this.headerWrapper.element);
  }
}

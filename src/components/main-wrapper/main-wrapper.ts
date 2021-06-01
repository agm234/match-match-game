import { BaseComponent } from '../base-component';
import { Wrapper } from '../wrapper/wrapper';
import './main-wrapper.scss';

export class MainWrapper extends BaseComponent {
  private readonly wrapper: Wrapper;

  constructor() {
    super('div', ['main_wrapper']);
    this.wrapper = new Wrapper();
    this.element.appendChild(this.wrapper.element);
  }
}

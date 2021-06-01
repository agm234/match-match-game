import { BaseComponent } from '../base-component';
import { FormWrapper } from '../form-wrapper/form-wrapper';
import './header-btn-wrapper.scss';

export class HeaderBtnWrapper extends BaseComponent {
  private readonly FormWrapper: FormWrapper;

  constructor() {
    super('div', ['btn-reg']);
    this.element.innerHTML = `
        <div class="btn-reg" >
            <button class="btn-reg__register">Register new player</button>
            <a  href="#start">
            <button class="btn-reg__startgame hide">Start Game</button>
            </a>
            <div class="avatar hide"> </div>
            <a  href="#stop">
            <button class="btn-reg__stopgame hide">Stop Game</button>
            </a>
        </div>
        `;
    this.FormWrapper = new FormWrapper();
    this.element.appendChild(this.FormWrapper.element);
  }

  show() {
    console.log(this.element);
    const btn = document.querySelector('.btn-reg__register');
    btn?.addEventListener('click', () => {
      document.querySelector('.cover')?.classList.toggle('hidden');
    });
    const btnClose = document.querySelector('.cansel');
    btnClose?.addEventListener('click', () => {
      document.querySelector('.cover')?.classList.toggle('hidden');
    });
  }
}

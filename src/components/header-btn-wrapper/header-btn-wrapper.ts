import { BaseComponent } from '../base-component';
import { GameWrapper } from '../game-wrapper/game-wrapper';
import './header-btn-wrapper.scss';

export class HeaderBtnWrapper extends BaseComponent {
  private readonly GameWrapper: GameWrapper;

  constructor() {
    super('div', ['btn-reg']);
    this.element.innerHTML = `
            <button class="btn-reg__register">Register new player</button>
            <a  href="#start">
            <button class="btn-reg__startgame hide">Start Game</button>
            </a>
            <a class="stop"  href="#stop">
            <button class="btn-reg__stopgame hide">Stop Game</button>
            </a>
            <div class="avatar hide"> </div>
        `;

    this.GameWrapper = new GameWrapper();
  }

  show(): void {
    const btns = document.querySelectorAll('.btn-reg__register');
    btns.forEach((el) => {
      el?.addEventListener('click', () => {
        document.querySelector('.cover')?.classList.toggle('hidden');
        document.querySelector('.burger')?.classList.remove('active_burger');
        (document.querySelector('.nav_menu') as HTMLElement).style.transform = '';
        if (!document.body.classList.contains('noscrool')) {
          document.body.classList.add('noscrool');
        }
      });
    });
    const btnClose = document.querySelector('.cansel');
    btnClose?.addEventListener('click', () => {
      const form: HTMLFormElement | null = document.querySelector('.popup');
      document.body.classList.remove('noscrool');
      form?.reset();
      document.querySelectorAll('.invalid').forEach((el) => {
        el.classList.remove('invalid');
      });
      document.querySelector('.cover')?.classList.toggle('hidden');
    });
    const btnStop = document.querySelector('.btn-reg__stopgame');
    btnStop?.addEventListener('click', () => {
    });
  }
}

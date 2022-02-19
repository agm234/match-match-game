import { BaseComponent } from '../base-component';
import { HeaderBtnWrapper } from '../header-btn-wrapper/header-btn-wrapper';
import './nav-menu.scss';

export class NavMeny extends BaseComponent {
  private readonly HeaderBtnWrapper: HeaderBtnWrapper;

  constructor() {
    super('div', ['nav_menu']);
    this.element.innerHTML = `
    <ul class="nav-menu-list">
        <li class="nav-menu-item" data-link="test1">About game</li>
        <li class="nav-menu-item" data-link="test2"">Best score</li>
        <li class="nav-menu-item" data-link="test3"">Game settings</li>
    </ul>
    `;
    this.HeaderBtnWrapper = new HeaderBtnWrapper();
    this.element.appendChild(this.HeaderBtnWrapper.element);
    this.HeaderBtnWrapper.element.classList.add('activeBtns');
    this.navigate();
  }

  navigate():void {
    this.element.children[0].addEventListener('click', (el) => {
      if ((el.target as HTMLElement).classList.contains('nav-menu-item')) {
        this.closeSideBar();
        window.location.hash = (el.target as HTMLElement).getAttribute('data-link') as string;
      }
    });
  }

  closeSideBar():void {
    document.querySelector('.burger')?.classList.remove('active_burger');
    document.body.classList.remove('noscrool');
    this.element.style.transform = '';
  }
}

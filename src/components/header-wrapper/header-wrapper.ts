import { BaseComponent } from '../base-component';
import { HeaderLogo } from '../header-logo/header-logo';
import { HeaderNav } from '../header-nav/header-nav';
import { HeaderBtnWrapper } from '../header-btn-wrapper/header-btn-wrapper';
import './header-wrapper.scss';
import { Burger } from '../header-burger/header-burger';

export class HeaderWrapper extends BaseComponent {
  private readonly HeaderLogo: HeaderLogo;

  private readonly HeaderNav: HeaderNav;

  private readonly HeaderBtnWrapper: HeaderBtnWrapper;
  private readonly Burger : Burger;
  constructor() {
    super('div', ['header_wrapper']);
    this.HeaderLogo = new HeaderLogo();
    this.element.appendChild(this.HeaderLogo.element);
    this.HeaderNav = new HeaderNav();
    this.element.appendChild(this.HeaderNav.element);
    this.HeaderBtnWrapper = new HeaderBtnWrapper();
    this.element.appendChild(this.HeaderBtnWrapper.element);
    this.Burger = new Burger();
    this.element.appendChild(this.Burger.element);
    this.showNav();
  }
  showNav(): void {
    this.Burger.element.addEventListener('click', () => {
      this.Burger.element.classList.toggle('active_burger');
      document.body.classList.toggle('noscrool');
      let navelem =document.querySelector(".nav_menu") as HTMLElement;
      navelem.classList.toggle('nav_active');
      if (navelem.style.length == 0){
        navelem.style.transform= `translateX(${document.body.clientWidth-navelem.clientWidth}px)`;
      } else {
        navelem.style.transform ='';
      }
      document.body.classList.toggle('scroll-hidden');
    });
    // this.MainWrapper.element.onclick = () => {
    //   if (this.NavMeny.element.classList.contains('nav_active')) {
    //     this.WrapperHeader.Burger.element.classList.toggle('active_burger');
    //     this.NavMeny.element.classList.toggle('nav_active');
    //     document.body.classList.toggle('scroll-hidden');
    //     this.MainWrapper.element.classList.toggle('none_wrap');
    //   }
    // };
  }
}

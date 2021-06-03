import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { GameWrapper } from './components/game-wrapper/game-wrapper';
import { Score } from './components/score/score';
import { ImageCategory } from './components/models/images-categorie';
import { GameSetting } from './components/game-setting/game-setting';

export class App {
  private readonly header: Header;

  private readonly main: Main;

  private readonly GameWrapper: GameWrapper;

  private readonly Score: Score;

  private readonly GameSetting: GameSetting;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new Main();
    this.rootElement.appendChild(this.main.element);
    this.GameWrapper = new GameWrapper();
    this.Score = new Score();
    this.GameSetting = new GameSetting();
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();

    const images = categories[0].images.map((name) => `${categories[0].category}/${name}`);
    this.GameWrapper.StartGame(images);
  }

  async routing() {
    const routing = [{
      name: 'test1',
      component: () => {
        document.querySelector('.active_nav')?.classList.remove('active_nav');
        document.querySelector('.about')?.classList.add('active_nav');
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        this.rootElement.appendChild(this.main.element);
      },
    },
    {
      name: 'start',
      component: () => {
        document.querySelector('.btn-reg__startgame')?.classList.add('hide');
        document.querySelector('.btn-reg__stopgame')?.classList.remove('hide');
        document.querySelector('.active_nav')?.classList.remove('active_nav');
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        this.rootElement.appendChild(this.GameWrapper.element);
        this.start();
      },
    },
    {
      name: 'test2',
      component: () => {
        document.querySelector('.active_nav')?.classList.remove('active_nav');
        document.querySelector('.score')?.classList.add('active_nav');
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        this.rootElement.appendChild(this.Score.element);
        if (document.body.classList.contains('noscrool')) {
          document.body.classList.remove('noscrool');
        }
      },
    },
    {
      name: 'test3',
      component: () => {
        document.querySelector('.active_nav')?.classList.remove('active_nav');
        document.querySelector('.settings')?.classList.add('active_nav');
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        this.rootElement.appendChild(this.GameSetting.element);
      },
    },

    ];
    const defaultRoute = {
      name: 'default',
      component: () => {

      },
    };
    window.onpopstate = () => {
      console.log(window.location.hash);
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      (currentRoute || defaultRoute).component();
    };
  }
}

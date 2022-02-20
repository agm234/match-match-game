import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { GameWrapper } from './components/game-wrapper/game-wrapper';
import { Score } from './components/score/score';
import { ImageCategory } from './components/models/images-categorie';
import { GameSetting } from './components/game-setting/game-setting';
import { GameSettingCardsSelect } from './components/game-setting-cards-select/game-setting-cards-select';
import { GameSettingGameSelect } from './components/game-setting-game-select/game-setting-game-select';
import { ScoreList } from './components/score-list/score-list';
import { NavMeny } from './components/nav-menu/nav-menu';
import { FormWrapper } from './components/form-wrapper/form-wrapper';

export class App {
  private readonly header: Header;

  private readonly NavMeny: NavMeny;

  private readonly FormWrapper: FormWrapper;

  private readonly main: Main;

  private readonly GameWrapper: GameWrapper;

  private readonly Score: Score;

  private readonly GameSetting: GameSetting;

  private readonly GameSettingCardsSelect: GameSettingCardsSelect;

  private readonly GameSettingGameSelect: GameSettingGameSelect;

  private readonly ScoreList: ScoreList;
  private  isStarted: boolean;

  constructor(private readonly rootElement: HTMLElement) {
    window.location.hash = 'test1';
    this.header = new Header();
    this.main = new Main();
    this.NavMeny = new NavMeny();
    this.FormWrapper = new FormWrapper();
    this.rootElement.prepend(this.header.element, this.main.element, this.NavMeny.element, this.FormWrapper.element);
    this.GameWrapper = new GameWrapper();
    this.Score = new Score();
    this.GameSetting = new GameSetting();
    this.GameSettingCardsSelect = new GameSettingCardsSelect();
    this.GameSettingGameSelect = new GameSettingGameSelect();
    this.ScoreList = new ScoreList();
    this.isStarted=false;
  }

  async start(): Promise<void> {
    this.isStarted=true;
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();
    const index: number = this.GameSettingCardsSelect.SelectedValueCards();
    const images = categories[index].images.map((name) => `${categories[index].category}/${name}`);
    images.length = this.GameSettingGameSelect.SelectedValueGame();
    this.GameWrapper.StartGame(images);
  }

  async stopGame(): Promise<void> {
    if (this.isStarted){
      this.GameWrapper.stop();
      this.isStarted=false;
    }
    
  }

  async routing(): Promise<void> {
    const routing = [
      {
        name: 'test1',
        component: () => {
          document.querySelector('.active_nav')?.classList.remove('active_nav');
          document.querySelector('.about')?.classList.add('active_nav');
          this.rootElement.innerHTML = '';
          this.rootElement.appendChild(this.header.element);
          this.rootElement.appendChild(this.main.element);
          this.rootElement.appendChild(this.NavMeny.element);
          this.rootElement.appendChild(this.FormWrapper.element);
          this.stopGame();
        },
      },
      {
        name: 'start',
        component: () => {
          this.rootElement.innerHTML = '';
          this.rootElement.appendChild(this.header.element);
          this.NavMeny.closeSideBar();
          document.querySelector('.active_nav')?.classList.remove('active_nav');
          document.querySelector('.active_nav')?.classList.remove('active_nav');
          this.rootElement.appendChild(this.GameWrapper.element);
          this.rootElement.appendChild(this.NavMeny.element);
          this.rootElement.appendChild(this.FormWrapper.element);
          document.querySelectorAll('.btn-reg__startgame').forEach((el) => {
            el.classList.add('hide');
          });
          document.querySelectorAll('.btn-reg__stopgame').forEach((el) => {
            el.classList.remove('hide');
          });
          this.start();
        },
      },
      {
        name: 'stop',
        component: () => {
          this.stopGame();
          this.NavMeny.closeSideBar();
          document.querySelector('.about')?.classList.add('active_nav');
          document.querySelectorAll('.btn-reg__startgame').forEach((el) => {
            el.classList.remove('hide');
          });
          document.querySelectorAll('.btn-reg__stopgame').forEach((el) => {
            el.classList.add('hide');
          });
          this.rootElement.innerHTML = '';
          this.rootElement.appendChild(this.header.element);
          this.rootElement.appendChild(this.main.element);
          this.rootElement.appendChild(this.NavMeny.element);
          this.rootElement.appendChild(this.FormWrapper.element);
        },
      },
      {
        name: 'endgame',
        component: () => {
          document.querySelector('.active_nav')?.classList.remove('active_nav');
          document.querySelector('.score')?.classList.add('active_nav');
          document.querySelectorAll('.btn-reg__startgame').forEach((el) => {
            el.classList.remove('hide');
          });
          document.querySelectorAll('.btn-reg__stopgame').forEach((el) => {
            el.classList.add('hide');
          });
          document.querySelector('.finish')?.classList.remove('visible');
          this.rootElement.innerHTML = '';
          this.rootElement.appendChild(this.header.element);
          this.rootElement.appendChild(this.Score.element);
          this.rootElement.appendChild(this.NavMeny.element);
          this.rootElement.appendChild(this.FormWrapper.element);
          if (document.body.classList.contains('noscrool')) {
            document.body.classList.remove('noscrool');
          }
          this.ScoreList.results();
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
          this.rootElement.appendChild(this.NavMeny.element);
          this.rootElement.appendChild(this.FormWrapper.element);
          if (document.body.classList.contains('noscrool')) {
            document.body.classList.remove('noscrool');
          }
          this.ScoreList.results();
          this.stopGame();
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
          this.rootElement.appendChild(this.NavMeny.element);
          this.rootElement.appendChild(this.FormWrapper.element);
          this.GameSettingCardsSelect.SelectedValueCards();
          this.GameSettingGameSelect.SelectedValueGame();
          this.stopGame();
        },
      },
    ];
    const defaultRoute = {
      name: 'default',
      component: () => {},
    };
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      (currentRoute || defaultRoute).component();
    };
  }
}

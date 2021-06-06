import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { GameWrapper } from './components/game-wrapper/game-wrapper';
import { Score } from './components/score/score';
import { ImageCategory } from './components/models/images-categorie';
import { GameSetting } from './components/game-setting/game-setting';
import { GameSettingCardsSelect } from './components/game-setting-cards-select/game-setting-cards-select';
import { GameSettingGameSelect } from './components/game-setting-game-select/game-setting-game-select';
import { ScoreList } from './components/score-list/score-list';

export class App {
  private readonly header: Header;

  private readonly main: Main;

  private readonly GameWrapper: GameWrapper;

  private readonly Score: Score;

  private readonly GameSetting: GameSetting;

  private readonly GameSettingCardsSelect: GameSettingCardsSelect;

  private readonly GameSettingGameSelect: GameSettingGameSelect;

  private readonly ScoreList: ScoreList;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new Main();
    this.rootElement.appendChild(this.main.element);
    this.GameWrapper = new GameWrapper();
    this.Score = new Score();
    this.GameSetting = new GameSetting();
    this.GameSettingCardsSelect = new GameSettingCardsSelect();
    this.GameSettingGameSelect = new GameSettingGameSelect();
    this.ScoreList = new ScoreList();
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();
    const index: number = this.GameSettingCardsSelect.SelectedValueCards();
    const images = categories[index].images.map((name) => `${categories[index].category}/${name}`);
    images.length = this.GameSettingGameSelect.SelectedValueGame();
    this.GameWrapper.StartGame(images);
  }

  async stopGame() {
    this.GameWrapper.stop();
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
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        document.querySelector('.btn-reg__startgame')?.classList.add('hide');
        document.querySelector('.btn-reg__stopgame')?.classList.remove('hide');
        document.querySelector('.active_nav')?.classList.remove('active_nav');
        this.rootElement.appendChild(this.GameWrapper.element);
        this.start();
      },
    },
    {
      name: 'stop',
      component: () => {
        this.stopGame();
        document.querySelector('.about')?.classList.add('active_nav');
        document.querySelector('.btn-reg__stopgame')?.classList.add('hide');
        document.querySelector('.btn-reg__startgame')?.classList.remove('hide');
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        this.rootElement.appendChild(this.main.element);
      },
    },
    {
      name: 'endgame',
      component: () => {
        document.querySelector('.active_nav')?.classList.remove('active_nav');
        document.querySelector('.score')?.classList.add('active_nav');
        document.querySelector('.btn-reg__stopgame')?.classList.add('hide');
        document.querySelector('.btn-reg__startgame')?.classList.remove('hide');
        document.querySelector('.finish')?.classList.remove('visible');
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.element);
        this.rootElement.appendChild(this.Score.element);
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
        if (document.body.classList.contains('noscrool')) {
          document.body.classList.remove('noscrool');
        }
        this.ScoreList.results();
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
        this.GameSettingCardsSelect.SelectedValueCards();
        this.GameSettingGameSelect.SelectedValueGame();
      },
    },

    ];
    const defaultRoute = {
      name: 'default',
      component: () => {

      },
    };
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      (currentRoute || defaultRoute).component();
    };
  }
}

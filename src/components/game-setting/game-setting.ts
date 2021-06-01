import { BaseComponent } from '../base-component';
import { GameSettingCards } from '../game-setting-cards/game-setting-cards';
import { GameSettingGame } from '../game-setting-game/game-setting-game';
import './game-setting.scss';

export class GameSetting extends BaseComponent {
  private readonly GameSettingCards: GameSettingCards;

  private readonly GameSettingGame: GameSettingGame;

  constructor() {
    super('div', ['game_setting']);
    this.GameSettingCards = new GameSettingCards();
    this.element.appendChild(this.GameSettingCards.element);
    this.GameSettingGame = new GameSettingGame();
    this.element.appendChild(this.GameSettingGame.element);
  }
}

import { BaseComponent } from '../base-component';
import { GameSettingGameSelect } from '../game-setting-game-select/game-setting-game-select';
import './game-setting-game.scss';

export class GameSettingGame extends BaseComponent {
  public readonly GameSettingGameSelect: GameSettingGameSelect;

  constructor() {
    super('div', ['game_setting_game']);
    this.element.innerHTML = `
        <h3 class="game_setting_game_header">Difficulty</h3>
        `;
    this.GameSettingGameSelect = new GameSettingGameSelect();
    this.element.appendChild(this.GameSettingGameSelect.element);
  }
}

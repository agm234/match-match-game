import { BaseComponent } from '../base-component';
import './game-setting-game.scss';

export class GameSettingGame extends BaseComponent {
  constructor() {
    super('div', ['game_setting_game']);
    this.element.innerHTML = `
        <h3 class="game_setting_game_header">Difficulty</h3>
        <select class="game_setting_game_select">
            <option class="game_setting_game_1" disabled="true" selected="true">select game type</option>
            <option class="game_setting_game_2">4 x 4</option>
            <option class="game_setting_game_3">6 x 6</option>
            <option class="game_setting_game_4">8 x 8</option>
        </select>
        `;
  }
}

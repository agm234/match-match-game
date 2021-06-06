import { BaseComponent } from '../base-component';
import { GameSettingCardsSelect } from '../game-setting-cards-select/game-setting-cards-select';
import './game-setting-cards.scss';

export class GameSettingCards extends BaseComponent {
  private readonly GameSettingCardsSelect: GameSettingCardsSelect;

  constructor() {
    super('div', ['game_setting_cards']);
    this.element.innerHTML = `
        <h3 class="game_setting_cards_header">Game cards</h3>
        `;
    this.GameSettingCardsSelect = new GameSettingCardsSelect();
    this.element.appendChild(this.GameSettingCardsSelect.element);
  }
}

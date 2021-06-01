import { BaseComponent } from '../base-component';
import './game-setting-cards.scss';

export class GameSettingCards extends BaseComponent {
  constructor() {
    super('div', ['game_setting_cards']);
    this.element.innerHTML = `
        <h3 class="game_setting_cards_header">Game cards</h3>
        <select class="game_setting_cards_select">
            <option class="game_setting_cards_1" disabled="true" selected="true">select game cards type</option>
            <option class="game_setting_cards_2">Animals</option>
            <option class="game_setting_cards_3">Cars</option>
        </select>
        `;
  }
}

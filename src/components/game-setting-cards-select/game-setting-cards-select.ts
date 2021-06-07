import { BaseComponent } from '../base-component';
import './game-setting-cards-select.scss';

export class GameSettingCardsSelect extends BaseComponent {
  constructor() {
    super('select', ['game_setting_cards_select']);
    this.element.innerHTML = `
            <option value="0" disabled="true" selected="true">select game cards type</option>
            <option value="0">Animals</option>
            <option value="1">Cars</option>
        `;
  }

  SelectedValueCards(): number {
    const asf = document.querySelector('.game_setting_cards_select');
    asf?.addEventListener('change', () => {
      const indexCat = (asf as HTMLSelectElement).value;
      (this.element as HTMLSelectElement).value = indexCat;
    });
    return parseInt((this.element as HTMLSelectElement).value, 10);
  }
}

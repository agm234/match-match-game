import { BaseComponent } from '../base-component';
import './game-setting-game-select.scss';

export class GameSettingGameSelect extends BaseComponent {
  constructor() {
    super('select', ['game_setting_game_select']);
    this.element.innerHTML = `
        <option value="8"  disabled="true" selected="true">select game type</option>
        <option value="8" >4 x 4</option>
        <option value="18" >6 x 6</option>
        <option value="32" >8 x 8</option>
        `;
  }

  SelectedValueGame(): number {
    const asf = document.querySelector('.game_setting_game_select');
    asf?.addEventListener('change', () => {
      const indexCat = (asf as HTMLSelectElement).value;
      (this.element as HTMLSelectElement).value = indexCat;
    });
    return parseInt((this.element as HTMLSelectElement).value, 10);
  }
}

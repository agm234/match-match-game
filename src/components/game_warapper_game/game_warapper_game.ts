import { BaseComponent } from '../base-component';
import { Game } from '../game/game';
import './game_warapper_game.scss';

export class GameWrapperGame extends BaseComponent {
  public readonly game: Game;

  constructor() {
    super('div', ['game_wrapper_game']);
    this.game = new Game();
    this.element.appendChild(this.game.element);
  }
}

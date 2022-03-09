import GameController from './controller/game-controller';

export default class Game {
  public newGame: () => void;

  public element: HTMLElement;

  public stopGame: () => void;

  constructor(private root: HTMLElement) {
    const game = new GameController(root);
    this.element = game.element;
    this.newGame = game.newGame;
    this.stopGame = game.stopGame;
  }
}

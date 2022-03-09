import GameFieldController from './controller/game-field-controller';
import CardResponseInterface from '../card/controller/card-response-interface';

export default class GameField {
  public clear: () => void;

  public addCards: (cards: string[]) => CardResponseInterface[];

  public element: HTMLElement;

  public init: () => void;

  public block: () => void;

  public unblock: () => void;

  constructor(readonly root: HTMLElement) {
    const gameField = new GameFieldController(root);
    this.element = gameField.element;
    this.init = gameField.init;
    this.clear = gameField.clear;
    this.addCards = gameField.addCards;
    this.block = gameField.blockField;
    this.unblock = gameField.unblockField;
  }
}

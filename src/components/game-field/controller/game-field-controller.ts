import CardResponseInterface from '../../card/controller/card-response-interface';
import GameFieldModel from '../model/game-field-model';
import GameFieldView from '../view/game-field-view';
import Card from '../../card';

export default class GameFieldController {
  private model: GameFieldModel;

  private view: GameFieldView;

  public element: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.model = new GameFieldModel();
    this.view = new GameFieldView(root);
    this.element = this.view.element;
    this.init();
  }

  public init = (): void => {
    this.model.getSettings();
    this.view.render(this.model.state);
  };

  public clear = (): void => {
    this.model.clear();
    this.view.render(this.model.state);
  };

  public addCards = (cards: string[]): CardResponseInterface[] => {
    this.model.addCards(cards);
    return this.model.state.sources.map((url: string, idx: number) => {
      const card = new Card(this.view.field, url, idx);
      return card.response;
    });
  };

  public blockField = (): void => {
    this.model.blockField();
    this.view.render(this.model.state);
  };

  public unblockField = (): void => {
    this.model.unblockField();
    this.view.render(this.model.state);
  };
}

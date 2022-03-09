import CardModel from '../model/card-model';
import CardView from '../view/card-view';
import { HERMES } from '../../game/HERMES';
import CardResponseInterface from './card-response-interface';

export default class CardController {
  private readonly model: CardModel;

  private readonly view: CardView;

  constructor(private readonly root: HTMLElement, private readonly url: string, private id: number) {
    this.model = new CardModel();
    this.view = new CardView(root, url);
    this.view.render(this.model.state);
    this.init();
  }

  public flipToFront = (): void => {
    this.model.flipToFront();
    this.view.render(this.model.state);
  };

  public flipToBack = (): void => {
    this.model.flipToBack();
    this.view.render(this.model.state);
  };

  public setToWrong = (): void => {
    this.model.setToWrong();
    this.view.render(this.model.state);
  };

  public setToCorrect = (): void => {
    this.model.setToCorrect();
    this.view.render(this.model.state);
  };

  readonly response: CardResponseInterface = {
    url: this.url,
    id: this.id,
    flipToFront: this.flipToFront,
    flipToBack: this.flipToBack,
    setToCorrect: this.setToCorrect,
    setToWrong: this.setToWrong,
  };

  public onClick = (): void => {
    if (this.model.state.isFront) return;
    this.model.flipToFront();
    this.view.render(this.model.state);
    if (HERMES.onClick) HERMES.onClick(this.response);
  };

  private init(): void {
    this.view.onClick(this.onClick);
  }
}

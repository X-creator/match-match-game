import CardController from './controller/card-controller';
import CardResponseInterface from './controller/card-response-interface';

export default class Card {
  public response: CardResponseInterface;

  constructor(readonly parentEl: HTMLElement, readonly url: string, private id: number) {
    const card = new CardController(parentEl, url, id);
    this.response = card.response;
  }
}

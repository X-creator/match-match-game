import viewInterface from './card-view-interface';
import createElement from '../../../utils/createElement';
import CardModelInterface from '../model/card-model- interface';
import '../card.scss';

export default class CardView implements viewInterface {
  readonly element: HTMLElement;

  private readonly card: HTMLElement;

  private readonly img: HTMLElement;

  constructor(private root: HTMLElement, private url: string) {
    this.element = createElement('div', ['card-wrapper']);
    this.card = createElement('div', ['card']);
    this.img = createElement('img', ['card__front']);
    this.img.setAttribute('src', url);
    this.card.append(this.img);
    this.element.append(this.card);
    this.root.append(this.element);
  }

  onClick(handler: () => void): void {
    this.element.addEventListener('click', handler);
  }

  render({ isFront, cardState }: CardModelInterface): void {
    if (isFront && cardState === 'default') this.card.className = 'card';
    if (!isFront && cardState === 'default') this.card.className = 'card flipped';
    if (isFront && cardState === 'correct') this.card.className = 'card correct';
    if (isFront && cardState === 'wrong') this.card.className = 'card wrong';
  }
}

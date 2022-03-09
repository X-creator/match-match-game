import CardModelInterface from '../model/card-model- interface';

export default interface CardViewInterface {
  render(state: CardModelInterface): void;
}

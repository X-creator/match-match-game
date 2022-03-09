import CardModelInterface from './card-model- interface';

export default class CardModel {
  public state: CardModelInterface;

  constructor() {
    this.state = {
      isFront: false,
      cardState: 'default',
    };
  }

  flipToFront = (): void => {
    this.state.isFront = true;
    this.state.cardState = 'default';
  };

  flipToBack = (): void => {
    this.state.isFront = false;
    this.state.cardState = 'default';
  };

  setToWrong = (): void => {
    this.state.isFront = true;
    this.state.cardState = 'wrong';
  };

  setToCorrect = (): void => {
    this.state.isFront = true;
    this.state.cardState = 'correct';
  };
}

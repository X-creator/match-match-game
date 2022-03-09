import ScoreController from './controller/score-controller';

export default class ScorePage {
  public element: HTMLElement;

  constructor(root: HTMLElement) {
    const score = new ScoreController(root);
    this.element = score.element;
  }
}

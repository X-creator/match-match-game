import { HERMES } from '../HERMES';
import GameModelInterface from './game-model interface';
import CardResponseInterface from '../../card/controller/card-response-interface';
import {
  PAIR,
  FIELD_CONFIG,
  ANIMATE_STATE,
  ANIMATE_FLIPBACK,
  ANIMATE_AFTER_WRONG,
  ANIMATE_AFTER_CORRECT, SCORE_COEF,
} from '../game-config';

export default class GameModel {
  public state: GameModelInterface;

  constructor(readonly block: () => void, readonly unblock: () => void, readonly onGameOver: () => void) {
    this.state = {
      attempts: [],
      guessed: [],
      pairs: [],
      score: 0,
      mode: 'junior',
    };
  }

  getSettings = (): void => {
    if (HERMES.getSettings) {
      const { mode } = HERMES.getSettings();
      this.state = { ...this.state, mode };
    }
  };

  restoreState = (): void => {
    this.state = {
      attempts: [],
      guessed: [],
      pairs: [],
      score: 0,
      mode: 'junior',
    };
  };

  onClick = (cardResponse: CardResponseInterface): void => {
    this.state.attempts.push(cardResponse);
    this.state.pairs.push(cardResponse);
    this.onChangeState();
  };

  onChangeState = (): void => {
    if (this.state.pairs.length === PAIR) this.checkPairs();
  };

  checkPairs = (): void => {
    this.block();
    const [elem1, elem2] = this.state.pairs;
    if (elem1.id !== elem2.id && elem1.url === elem2.url) this.guessed();
    if (elem1.id !== elem2.id && elem1.url !== elem2.url) this.missed();
    if (this.state.guessed.length === (FIELD_CONFIG[this.state.mode] * PAIR)) this.gameOver(this.onGameOver);
    this.state.pairs = [];
  };

  guessed = (): void => {
    const [elem1, elem2] = this.state.pairs;
    this.state.guessed.push(elem1, elem2);
    setTimeout(() => {
      elem1.setToCorrect();
      elem2.setToCorrect();
    }, ANIMATE_STATE);
    setTimeout(() => {
      this.unblock();
    }, ANIMATE_AFTER_CORRECT);
  };

  missed = (): void => {
    const [elem1, elem2] = this.state.pairs;
    setTimeout(() => {
      elem1.setToWrong();
      elem2.setToWrong();
    }, ANIMATE_STATE);
    setTimeout(() => {
      elem1.flipToBack();
      elem2.flipToBack();
    }, ANIMATE_FLIPBACK);
    setTimeout(() => {
      this.unblock();
    }, ANIMATE_AFTER_WRONG);
  };

  calcScore = ({ guessed, attempts }: GameModelInterface): void => {
    this.state.score = Math.floor((FIELD_CONFIG[this.state.mode] * SCORE_COEF * (guessed.length / attempts.length)));
  };

  gameOver = (onGameOver: () => void): void => {
    this.calcScore(this.state);
    onGameOver();
  };
}

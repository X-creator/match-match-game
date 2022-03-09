import GameFieldModelInterface from './game-field-model-interface';
import { HERMES } from '../../game/HERMES';

export default class GameFieldModel {
  public state: GameFieldModelInterface;

  constructor() {
    this.state = {
      sources: [],
      isEmpty: true,
      isBlocked: false,
      mode: 'junior',
    };
  }

  getSettings = (): void => {
    if (HERMES.getSettings) {
      const { mode } = HERMES.getSettings();
      this.state = { ...this.state, mode };
    }
  };

  clear = (): void => {
    this.state.sources = [];
    this.state.isEmpty = true;
  };

  addCards = (cards: string[]): void => {
    this.state.sources = cards;
    this.state.isEmpty = false;
  };

  blockField = (): void => {
    this.state.isBlocked = true;
  };

  unblockField = (): void => {
    this.state.isBlocked = false;
  };
}

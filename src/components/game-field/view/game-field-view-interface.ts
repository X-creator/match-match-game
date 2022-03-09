import GameFieldModelInterface from '../model/game-field-model-interface';

export default interface GameFieldViewInterface {
  render(state: GameFieldModelInterface): void
}

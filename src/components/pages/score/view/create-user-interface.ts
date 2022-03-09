import ScoreModelInterface from '../model/score-model-interface';

export default interface CreateUserInterface {
  (user: ScoreModelInterface): void
}

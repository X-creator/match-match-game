import CardResponseInterface from '../../card/controller/card-response-interface';

export default interface GameModelInterface {
  attempts: CardResponseInterface[],
  guessed: CardResponseInterface[],
  pairs: CardResponseInterface[],
  mode: ('junior' | 'middle' | 'senior'),
  score: number
}

export default interface GameFieldModelInterface {
  sources: string[],
  isEmpty: boolean,
  isBlocked: boolean,
  mode: ('junior' | 'middle' | 'senior'),
}

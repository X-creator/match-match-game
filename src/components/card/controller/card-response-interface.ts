export default interface CardResponseInterface {
  url: string,
  id: number,
  flipToFront: () => void,
  flipToBack: () => void,
  setToCorrect: () => void,
  setToWrong: () => void
}

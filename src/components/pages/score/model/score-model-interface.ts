export default interface ScoreModelInterface {
  avatar: string | ArrayBuffer | null,
  name: string,
  surname: string,
  email: string,
  score?: number,
  isCurrentUser?: boolean
}

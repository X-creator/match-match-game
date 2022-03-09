export default interface RegistrationModelInterface {
  errorMessage: string,
  name: ('empty' | 'incorrect' | 'correct'),
  surname: ('empty' | 'incorrect' | 'correct'),
  email: ('empty' | 'incorrect' | 'correct'),
  credentials: {
    name: string,
    surname: string,
    email: string,
    avatar: string | ArrayBuffer | null
  }
}

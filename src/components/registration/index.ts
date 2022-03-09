import RegistrationController from './controller/registration-controller';

export default class Registration {
  public onRegister: () => void;

  constructor(readonly onAuth: (src: string | ArrayBuffer | null) => void) {
    const reg = new RegistrationController(onAuth);
    this.onRegister = reg.onRegister;
  }
}

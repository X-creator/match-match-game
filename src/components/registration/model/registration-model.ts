import RegistrationModelInterface from './registration-model-interface';
import { HERMES } from '../../game/HERMES';
import {
  CHECK_AFTER, ERROR_MESSAGE, EMAIL_REGEXP,
} from '../registration-config';

export default class RegistrationModel {
  public state: RegistrationModelInterface;

  constructor() {
    this.state = {
      errorMessage: ERROR_MESSAGE,
      name: 'empty',
      surname: 'empty',
      email: 'empty',
      credentials: {
        name: '',
        surname: '',
        email: '',
        avatar: '',
      },
    };
    HERMES.getCredentials = this.getCredentials;
    HERMES.deleteCredentials = this.deleteUser;
  }

  getInputsState = (): boolean => {
    if (this.state.name === 'empty'
      && this.state.surname === 'empty'
      && this.state.email === 'empty') return true;
    return false;
  };

  validateInput = (value: string): boolean => {
    const input = value.replace(/\s/g, '');
    if (input.length === 0) return false;
    if (Number.isInteger(Number(input))) return false;
    if (input.length > 30) return false;
    if (/[~!@#$%*()_—+=|:;"'`<>,.?/^]/.test(input)) return false;
    return true;
  };

  validateEmail = (email: string): boolean => EMAIL_REGEXP.test(email);

  withDelay = (fn: (value: string) => boolean, value: string): Promise<boolean> => new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(fn(value));
    }, CHECK_AFTER);
  });

  discard(): void {
    this.state.name = 'empty';
    this.state.surname = 'empty';
    this.state.email = 'empty';
  }

  checkAll(): boolean {
    const { name, surname, email } = this.state;
    return (name === 'correct' && surname === 'correct' && email === 'correct');
  }

  fileToBase64 = async (file: File): Promise<void> => new Promise<void>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => {
      this.state.credentials.avatar = reader.result;
      resolve();
    };
  });

  createUser(name: string, surname: string, email: string, avatar: string | ArrayBuffer | null): void {
    this.state.credentials.name = name;
    this.state.credentials.surname = surname;
    this.state.credentials.email = email;
    this.state.credentials.avatar = avatar;
  }

  deleteUser = (): void => {
    this.state.credentials.name = '';
    this.state.credentials.surname = '';
    this.state.credentials.email = '';
    this.state.credentials.avatar = '';
  };

  getCredentials = (): RegistrationModelInterface['credentials'] => this.state.credentials;
}

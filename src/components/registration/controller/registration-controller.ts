import RegistrationModel from '../model/registration-model';
import RegistrationView from '../view/registration-view';
import { HERMES } from '../../game/HERMES';
import ScoreModelInterface from '../../pages/score/model/score-model-interface';

export default class RegistrationController {
  private model: RegistrationModel;

  private view: RegistrationView;

  constructor(readonly onAuth: (src: string | ArrayBuffer | null) => void) {
    this.model = new RegistrationModel();
    this.view = new RegistrationView();
    this.init();
  }

  onRegister = (): void => {
    this.view.onRegister();
  };

  onInput = async (target: HTMLInputElement): Promise<void> => {
    const isValid = await this.model.withDelay(this.model.validateInput, target.value);
    this.onChangeState(isValid, target);
  };

  onEmail = async (target: HTMLInputElement): Promise<void> => {
    const isValid = await this.model.withDelay(this.model.validateEmail, target.value);
    this.onChangeState(isValid, target);
  };

  onFileInput = async (file: File): Promise<void> => {
    await this.model.fileToBase64(file);
  };

  onAddUser = (): boolean => {
    if (this.model.checkAll()) {
      this.onAuth(this.model.state.credentials.avatar);
      this.model.createUser(this.view.name.value, this.view.surname.value, this.view.email.value, this.model.state.credentials.avatar);
      if (HERMES.onPushUser) HERMES.onPushUser(<ScoreModelInterface>{ ...this.model.getCredentials() });
      this.restoreDefault();
      return true;
    }
    return false;
  };

  restoreDefault = (): void => {
    this.model.discard();
    this.view.restoreDefault();
  };

  afterCheckAll = (): void => {
    if (this.model.checkAll()) {
      this.view.showFileInput(true);
      this.view.readyToSubmit();
    }
  };

  onChangeState(isValid: boolean, target: HTMLInputElement): void {
    type Key = 'name' | 'surname' | 'email';
    const prop = target.id as Key;
    if (target.value.length === 0) this.model.state[prop] = 'empty';
    else if (isValid) {
      this.model.state[prop] = 'correct';
      this.view.hideError();
      this.afterCheckAll();
    } else {
      this.model.state[prop] = 'incorrect';
      this.view.showError(this.model.state.errorMessage);
      this.view.showFileInput(false);
    }
    this.view.renderInput(this.view[prop], this.model.state[prop]);
  }

  init(): void {
    this.view.onInput(this.onInput);
    this.view.onEmail(this.onEmail);
    this.view.onFileInput(this.onFileInput);
    this.view.onAddUser(this.onAddUser);
    this.view.onCancel(this.model.getInputsState, this.restoreDefault);
    this.view.onBlur(this.restoreDefault);
  }
}

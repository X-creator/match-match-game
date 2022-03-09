import createElement from '../../../utils/createElement';
import '../registration.scss';

export default class RegistrationView {
  public element: HTMLElement;

  private form: HTMLElement;

  public name: HTMLInputElement;

  public surname: HTMLInputElement;

  public email: HTMLInputElement;

  private file: HTMLInputElement;

  private addBtn: HTMLButtonElement;

  private cancelBtn: HTMLButtonElement;

  private messageContainer: HTMLElement;

  constructor() {
    this.element = createElement('div', ['overlay']);
    this.form = createElement('form', ['register__form']);
    this.name = createElement('input', ['register__form-input']) as HTMLInputElement;
    this.surname = createElement('input', ['register__form-input']) as HTMLInputElement;
    this.email = createElement('input', ['register__form-input']) as HTMLInputElement;
    this.file = createElement('input', ['register__avatar']) as HTMLInputElement;
    this.addBtn = createElement('button', ['register__btn-add']) as HTMLButtonElement;
    this.cancelBtn = createElement('button', ['register__btn-cancel']) as HTMLButtonElement;
    this.messageContainer = createElement('div', ['error-message']);
    this.createRegistration();
  }

  createRegistration(): void {
    const wrapper = createElement('div', ['register']);
    const title = createElement('h3', ['register__title']);
    title.textContent = 'Register a new Player';
    wrapper.append(title);
    const formWrapper = createElement('div', ['register__form-wrapper']);
    const formFormField1 = createElement('p', ['register__form-field']);
    this.name.setAttribute('id', 'name');
    this.name.setAttribute('type', 'text');
    this.name.setAttribute('maxlength', '30');
    this.name.setAttribute('autocomplete', 'off');
    const nameLabel = createElement('p', ['register__form-label']);
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'First Name';
    const nameSpan = createElement('span', ['register__form-check']);
    formFormField1.append(this.name);
    formFormField1.append(nameLabel);
    formFormField1.append(nameSpan);
    formWrapper.append(formFormField1);

    const formFormField2 = createElement('p', ['register__form-field']);
    this.surname.setAttribute('id', 'surname');
    this.surname.setAttribute('type', 'text');
    this.surname.setAttribute('maxlength', '30');
    this.surname.setAttribute('autocomplete', 'off');
    const surnameLabel = createElement('p', ['register__form-label']);
    surnameLabel.setAttribute('for', 'surname');
    surnameLabel.textContent = 'Last Name';
    const surnameSpan = createElement('span', ['register__form-check']);
    formFormField2.append(this.surname);
    formFormField2.append(surnameLabel);
    formFormField2.append(surnameSpan);
    formWrapper.append(formFormField2);

    const formFormField3 = createElement('p', ['register__form-field']);
    this.email.setAttribute('id', 'email');
    this.email.setAttribute('type', 'email');
    this.email.setAttribute('maxlength', '30');
    this.email.setAttribute('autocomplete', 'off');
    const emailLabel = createElement('p', ['register__form-label']);
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'E-mail';
    const emailSpan = createElement('span', ['register__form-check']);
    formFormField3.append(this.email);
    formFormField3.append(emailLabel);
    formFormField3.append(emailSpan);
    formWrapper.append(formFormField3);
    this.form.append(formWrapper);

    const formFormField4 = createElement('p');
    const fileLabel = createElement('label', ['register__avatar-label']);
    fileLabel.setAttribute('for', 'avatar');
    const fileSpan = createElement('span', ['register__avatar-text']);
    fileSpan.textContent = 'choose your avatar';
    fileLabel.append(fileSpan);
    this.file.setAttribute('id', 'avatar');
    this.file.setAttribute('type', 'file');
    this.file.setAttribute('style', 'display: none');
    this.file.setAttribute('disabled', 'true');
    formFormField4.append(fileLabel);
    formFormField4.append(this.file);
    this.form.append(formFormField4);

    const formFormField5 = createElement('p', ['register__btn-wrapper']);
    this.addBtn.textContent = 'add user';
    this.cancelBtn.textContent = 'cancel';
    formFormField5.append(this.addBtn);
    formFormField5.append(this.cancelBtn);
    this.form.append(formFormField5);
    wrapper.append(this.form);
    this.element.append(wrapper);
  }

  onRegister = (): void => {
    document.body.append(this.element);
  };

  onInput = (handler: (target: HTMLInputElement) => void): void => {
    [this.name, this.surname].forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        handler(e.currentTarget as HTMLInputElement);
      });
    });
  };

  onFileInput = (handler: (file: File) => void): void => {
    this.file.addEventListener('change', () => {
      const file = this.file.files as FileList;
      handler(file[0]);
      // this.file.value = '';
    });
  };

  onEmail = (handler: (target: HTMLInputElement) => void): void => {
    this.email.addEventListener('input', (e: Event) => {
      e.preventDefault();
      handler(e.currentTarget as HTMLInputElement);
    });
  };

  onAddUser = (handler: () => boolean): void => {
    this.addBtn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      if (handler()) this.element.remove();
    });
  };

  onCancel = (initialInput: () => boolean, handler: () => void): void => {
    this.cancelBtn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      if (initialInput()) this.element.remove();
      handler();
    });
  };

  onBlur = (handler: () => void): void => {
    this.element.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('overlay')) {
        handler();
        this.element.remove();
      }
    });
  };

  showFileInput(isShow: boolean): void {
    if (isShow) {
      this.form.classList.add('valid');
      this.file.disabled = false;
    } else {
      this.form.classList.remove('valid');
      this.file.disabled = true;
    }
  }

  showError(message: string): void {
    this.messageContainer.textContent = message;
    this.form.append(this.messageContainer);
  }

  hideError(): void {
    this.messageContainer.remove();
  }

  restoreDefault(): void {
    [this.name, this.surname, this.email].forEach((input) => {
      input.className = 'register__form-input';
      input.value = '';
    });
    this.form.classList.remove('valid');
    this.file.disabled = true;
    this.addBtn.disabled = true;
    this.hideError();
  }

  readyToSubmit(): void {
    this.addBtn.disabled = false;
  }

  renderInput = (input: HTMLInputElement, state: string): void => {
    if (state === 'empty') input.className = 'register__form-input';
    if (state === 'incorrect') input.className = 'register__form-input invalid';
    if (state === 'correct') input.className = 'register__form-input valid';
  };
}

import createElement from '../../../utils/createElement';
import '../notification.scss';

export default class NotificationView {
  readonly element: HTMLElement;

  private readonly message: HTMLElement;

  private btn: HTMLElement;

  constructor(readonly root: HTMLElement) {
    this.element = createElement('div', ['notification']);
    this.message = createElement('p', ['game-message']);
    this.btn = createElement('a', ['game-btn']);
    this.btn.setAttribute('href', '#score');
    this.btn.textContent = 'OK';
    this.element.append(this.message);
    this.btn.addEventListener('click', () => this.btn.remove());
  }

  hideSpinner(): void {
    this.element.remove();
  }

  showSpinner(): void {
    this.root.append(this.element);
    this.message.textContent = 'Loading ...';
  }

  hideMessage(): void {
    this.element.remove();
  }

  showMessage(score: number): void {
    this.root.append(this.element);
    this.element.append(this.btn);
    this.message.textContent = `Your score: ${score}`;
  }
}

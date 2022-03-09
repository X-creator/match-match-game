import createElement from '../../../utils/createElement';
import GameFieldModelInterface from '../model/game-field-model-interface';
import viewInterface from './game-field-view-interface';
import '../game-field.scss';

export default class GameFieldView implements viewInterface {
  public readonly element: HTMLElement;

  public readonly field: HTMLElement;

  constructor(private root: HTMLElement) {
    this.element = createElement('div', ['game-field__container', 'container']);
    this.field = createElement('div', ['game-field']);
    this.element.append(this.field);
    this.root.append(this.element);
  }

  render({ isEmpty, mode, isBlocked }: GameFieldModelInterface): void {
    if (mode === 'junior') this.field.className = 'game-field';
    if (mode === 'middle') this.field.className = 'game-field extended';
    if (mode === 'senior') this.field.className = 'game-field extended-plus';
    if (isBlocked) this.field.classList.add('blocked');
    if (!isBlocked) this.field.classList.remove('blocked');
    if (isEmpty) this.field.innerHTML = '';
  }
}

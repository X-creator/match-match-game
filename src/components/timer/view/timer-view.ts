import createElement from '../../../utils/createElement';
import TimerModelInterface from '../model/timer-model-interface';
import '../timer.scss';

export default class TimerView {
  readonly element: HTMLElement;

  private readonly timer: HTMLElement;

  constructor(private root: HTMLElement) {
    this.element = createElement('div', ['timer']);
    this.timer = createElement('span', ['timer__display']);
    this.element.append(this.timer);
  }

  connect(): void {
    this.root.before(this.element);
  }

  hideTimer(): void {
    this.element.remove();
  }

  render = ({
    isWarning, isPreparing, timeString, time,
  }: TimerModelInterface): void => {
    if (isWarning) this.timer.classList.add('warning');
    if (!isWarning) this.timer.classList.remove('warning');
    if (isPreparing) this.timer.classList.add('preparing');
    if (!isPreparing) this.timer.classList.remove('preparing');
    if (time! > 0) this.element.classList.add('animate');
    if (time === 0) this.element.classList.remove('animate');
    this.timer.textContent = timeString as string;
  };
}

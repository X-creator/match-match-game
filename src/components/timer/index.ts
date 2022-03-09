import TimerController from './controller/timer-controller';
import TimerApiInterface from './timer-api-interface';

export default class Timer {
  public timer: TimerApiInterface;

  constructor(private readonly root: HTMLElement, private readonly timeInSec?: number, private readonly isForward?: boolean) {
    const timer = new TimerController(root);
    const {
      element, setSettings, start, stop, pause, getTime, disconnect, hide,
    } = timer;
    this.timer = {
      element, setSettings, start, stop, pause, getTime, disconnect, hide,
    };
  }
}

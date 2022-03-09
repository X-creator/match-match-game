import TimerModelInterface from './timer-model-interface';
import {
  TIME_FRACT,
  MS_IN_SEC,
  HOUR_IN_SEC,
  VISIBLE_MS,
  PRECISE_NUM,
  LEADING_ZERO,
  DEFAULT_TIMER,
} from '../timer-config';

export default class TimerModel {
  private timerInterval = 0;

  private elapsedTime = 0;

  private startTime = 0;

  public state: TimerModelInterface;

  constructor() {
    this.state = {
      time: 0,
      warningTime: 0,
      timeString: '',
      timeInSec: DEFAULT_TIMER,
      isForward: false,
      isWarning: false,
      isPreparing: false,
    };
  }

  setSettings = (settings: TimerModelInterface): void => {
    this.state.warningTime = settings.warningTime;
    this.state.timeInSec = settings.timeInSec;
    this.state.isForward = settings.isForward;
    this.state.isPreparing = settings.isPreparing;
  };

  init(): void {
    this.timeToString(this.state.timeInSec * MS_IN_SEC);
  }

  start = async (render: (state: TimerModelInterface) => void): Promise<void> => new Promise((resolve) => {
    this.startTime = Date.now();
    this.timerInterval = window.setInterval(() => {
      this.calcTick(render, resolve);
    }, VISIBLE_MS);
  });

  pause(): void {
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
  }

  stop(): void {
    this.pause();
    this.state.time = 0;
    this.state.isWarning = false;
    this.state.isPreparing = false;
    this.state.timeString = '00:00:00';
  }

  getTime(): number {
    return Math.floor((Date.now() - this.startTime) / MS_IN_SEC);
  }

  private calcTick = (render: (state: TimerModelInterface) => void, resolve: () => void): void => {
    this.elapsedTime = Date.now() - this.startTime;
    this.state.time = this.state.isForward
      ? this.elapsedTime
      : (this.state.timeInSec * MS_IN_SEC) - this.elapsedTime;
    this.timeToString(this.state.time);
    if (this.state.time < (this.state.warningTime! * MS_IN_SEC)) this.state.isWarning = true;
    if (this.state.time <= TIME_FRACT) {
      this.stop();
      resolve();
    }
    render(this.state);
  };

  private timeToString(time: number): void {
    const diffInHrs = time / HOUR_IN_SEC;
    const hh = Math.floor(diffInHrs);

    const diffInMin = (diffInHrs - hh) * TIME_FRACT;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * TIME_FRACT;
    const ss = Math.floor(diffInSec);

    const diffInMs = (diffInSec - ss) * VISIBLE_MS;
    const ms = Math.floor(diffInMs);

    const formattedMM = mm.toString().padStart(PRECISE_NUM, LEADING_ZERO);
    const formattedSS = ss.toString().padStart(PRECISE_NUM, LEADING_ZERO);
    const formattedMS = ms.toString().padStart(PRECISE_NUM, LEADING_ZERO);

    this.state.timeString = `${formattedMM}:${formattedSS}:${formattedMS}`;
  }
}

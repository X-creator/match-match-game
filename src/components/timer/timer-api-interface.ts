import TimerModelInterface from './model/timer-model-interface';

export default interface TimerApiInterface {
  element: HTMLElement,
  setSettings: (settings: TimerModelInterface) => void,
  start: () => void,
  stop: () => void,
  pause: () => void,
  getTime: () => number,
  disconnect: () => void
  hide: () => void
}

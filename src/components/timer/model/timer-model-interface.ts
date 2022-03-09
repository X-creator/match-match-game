export default interface TimerModelInterface {
  time?: number,
  warningTime?: number,
  timeInSec: number,
  timeString?: string,
  isForward?: boolean,
  isWarning?: boolean,
  isPreparing?: boolean
}

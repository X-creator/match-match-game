import TimerModel from '../model/timer-model';
import TimerView from '../view/timer-view';
import TimerModelInterface from '../model/timer-model-interface';

export default class TimerController {
  private model: TimerModel;

  private view: TimerView;

  public element: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.model = new TimerModel();
    this.view = new TimerView(root);
    this.element = this.view.element;
  }

  setSettings = (settings: TimerModelInterface): void => {
    this.model.setSettings(settings);
    this.init();
  };

  init = (): void => {
    this.model.init();
    this.view.render(this.model.state);
    this.view.connect();
  };

  public start = async (): Promise<void> => {
    await this.model.start(this.view.render);
  };

  public pause = (): void => {
    this.model.pause();
    this.view.render(this.model.state);
  };

  public stop = (): void => {
    this.model.stop();
    this.view.render(this.model.state);
  };

  public disconnect = (): void => {
    this.stop();
    this.hide();
  };

  public hide = (): void => {
    this.view.hideTimer();
  };

  public getTime = (): number => this.model.getTime();
}

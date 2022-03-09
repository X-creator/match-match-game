import SettingsView from '../view/settings-view';
import SettingsModel from '../model/settings-model';
import SettingsModelInterface from '../model/settings-model-interface';
import { HERMES } from '../../../game/HERMES';

export default class SettingsController {
  private readonly view: SettingsView;

  private model: SettingsModel;

  public element: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.model = new SettingsModel();
    this.view = new SettingsView(root);
    this.element = this.view.element;
    this.init();
    HERMES.getSettings = this.model.getSettings;
  }

  onSelect = (e: Event): void => {
    const state = this.model.getSettings();
    const elem = e.currentTarget as HTMLElement;
    const newState = { ...state, ...elem.dataset } as SettingsModelInterface;
    this.view.render(elem);
    this.model.setSettings(newState);
  };

  private init(): void {
    this.view.onSelect(this.onSelect);
  }
}

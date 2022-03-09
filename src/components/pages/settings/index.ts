import SettingsController from './controller/settings-controller';

export default class SettingsPage {
  public element: HTMLElement;

  constructor(root: HTMLElement) {
    const settings = new SettingsController(root);
    this.element = settings.element;
  }
}

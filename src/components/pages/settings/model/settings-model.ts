import SettingsModelInterface from './settings-model-interface';

export default class SettingsModel {
  state: SettingsModelInterface;

  constructor() {
    this.state = {
      category: 'animals',
      mode: 'junior',
    };
  }

  getSettings = (): SettingsModelInterface => this.state;

  setSettings = (newState: SettingsModelInterface): void => {
    this.state = newState;
  };
}

import CardResponseInterface from '../card/controller/card-response-interface';
import SettingsModelInterface from '../pages/settings/model/settings-model-interface';
import HermesInterface from './hermes-interface';
import RegistrationModelInterface from '../registration/model/registration-model-interface';
import ScoreModelInterface from '../pages/score/model/score-model-interface';

class Hermes implements HermesInterface {
  public onClick: { (response: CardResponseInterface): void } | null;

  public getSettings: { (): SettingsModelInterface } | null;

  public getCredentials: { (): RegistrationModelInterface['credentials'] } | null;

  public deleteCredentials: { (): void } | null;

  public onPushUser: { (user: ScoreModelInterface): void } | null;

  public onLogOut: { (): void } | null;

  constructor() {
    this.onClick = null;
    this.getSettings = null;
    this.getCredentials = null;
    this.deleteCredentials = null;
    this.onPushUser = null;
    this.onLogOut = null;
  }
}

export const HERMES = new Hermes();

import CardResponseInterface from '../card/controller/card-response-interface';
import SettingsModelInterface from '../pages/settings/model/settings-model-interface';
import RegistrationModelInterface from '../registration/model/registration-model-interface';
import ScoreModelInterface from '../pages/score/model/score-model-interface';

export default interface HermesInterface {
  onClick: { (response: CardResponseInterface): void } | null,
  getSettings: { (): SettingsModelInterface } | null,
  getCredentials: { (): RegistrationModelInterface['credentials'] } | null;
  deleteCredentials: { (): void } | null;
  onPushUser: { (user: ScoreModelInterface): void } | null;
  onLogOut: { (): void } | null;
}

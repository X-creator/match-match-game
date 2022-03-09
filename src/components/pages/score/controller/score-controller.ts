import ScoreModel from '../model/score-model';
import ScoreView from '../view/score-view';
import ScoreModelInterface from '../model/score-model-interface';
import { HERMES } from '../../../game/HERMES';

export default class ScoreController {
  private readonly view: ScoreView;

  private model: ScoreModel;

  public element: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.model = new ScoreModel();
    this.view = new ScoreView(root);
    this.element = this.view.element;
    this.onInit();
    HERMES.onPushUser = this.onPushUser;
    HERMES.onLogOut = this.onLogOut;
  }

  onInit = async (): Promise<void> => {
    await this.model.getAll();
    this.createUserField();
  };

  onPushUser = async (user: ScoreModelInterface): Promise<void> => {
    this.model.state.currentUser = { ...user };
    if (user.score) this.model.pushUserScore();
    this.createUserField();
    await this.model.saveUser();
  };

  createUserField = (): void => {
    this.view.dropUsers();
    const users = this.model.getUsers();
    users.forEach((user) => {
      this.view.createUserField(user);
    });
  };

  onLogOut = (): void => {
    this.model.state.currentUser = null;
    this.view.onLogOut();
  };
}

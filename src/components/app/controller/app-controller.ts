import AppView from '../view/app-view';
import AppModel from '../model/app-model';
import AppRouter from './app-route';
import Registration from '../../registration';
import { HERMES } from '../../game/HERMES';

export default class AppController {
  private model: AppModel;

  private view: AppView;

  private router: AppRouter;

  private auth: Registration;

  constructor() {
    this.model = new AppModel();
    this.view = new AppView();
    this.router = new AppRouter(this.view.main, this.redirectHome);
    this.auth = new Registration(this.authenticate);
    this.init();
    this.checkRoute();
    this.view.renderBtn(this.model.state);
  }

  checkRoute = (): void => {
    this.model.checkRoute();
    this.router.checkRoute(this.model.state);
    this.view.setActiveNav(this.model.state.activeRoute);
    this.view.renderBtn(this.model.state);
  };

  redirectHome = (): void => {
    this.model.redirect('#about');
  };

  authenticate = (src: string | ArrayBuffer | null): void => {
    this.model.authenticate();
    this.checkRoute();
    this.view.renderAvatar(src);
    this.view.registered();
  };

  logOut = (): void => {
    this.model.deAuthenticate();
    this.checkRoute();
    this.view.renderLogOut();
    if (HERMES.onLogOut) HERMES.onLogOut();
    if (HERMES.deleteCredentials) HERMES.deleteCredentials();
    this.view.deleteAvatar();
  };

  changePlayerBtn(): void {
    this.model.deAuthenticate();
    this.checkRoute();
    this.view.renderLogOut();
  }

  onClickPlayer = (btn: HTMLElement): void => {
    if (btn.textContent === 'register new player') {
      this.auth.onRegister();
    }
    if (btn.textContent === 'start game') {
      this.model.state.isPlaying = true;
      this.model.redirect('#match');
    }
    if (btn.textContent === 'stop game') {
      this.model.state.isPlaying = false;
      this.redirectHome();
    }
    this.view.renderBtn(this.model.state);
  };

  init(): void {
    this.view.onHashChange(this.checkRoute);
    this.view.onClickPlayer(this.onClickPlayer);
    this.view.onClickLogout(this.logOut);
  }
}

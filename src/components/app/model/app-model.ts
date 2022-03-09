import AppModelInterface from './app-model-interface';

export default class AppModel {
  public state: AppModelInterface;

  constructor() {
    this.state = {
      isPlaying: false,
      isAuth: false,
      activeRoute: 'about',
    };
  }

  checkRoute(): void {
    const route = window.location.hash.slice(1);
    if (this.state.activeRoute === route) return;
    this.state.activeRoute = route;
    if (this.state.activeRoute !== 'match') this.state.isPlaying = false;
  }

  redirect = (route: string): void => {
    window.location.replace(route);
  };

  authenticate(): void {
    this.state.isAuth = true;
  }

  deAuthenticate = (): void => {
    this.state.isAuth = false;
  };
}

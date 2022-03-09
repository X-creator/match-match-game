import AppModelInterface from '../model/app-model-interface';
import AboutPage from '../../pages/about';
import SettingsPage from '../../pages/settings';
import Game from '../../game';
import ScorePage from '../../pages/score';

const ROUTES = ['about', 'score', 'settings', 'match'];

export default class AppRouter {
  private aboutPage: AboutPage;

  private settingsPage: SettingsPage;

  private gamePage: Game;

  private scorePage: ScorePage;

  constructor(readonly container: HTMLElement, readonly redirectHome: () => void) {
    this.aboutPage = new AboutPage(container);
    this.settingsPage = new SettingsPage(container);
    this.gamePage = new Game(this.container);
    this.scorePage = new ScorePage(this.container);
  }

  checkRoute({ isAuth, activeRoute, isPlaying }: AppModelInterface): void {
    if (!isAuth && activeRoute === 'match') this.redirectHome();
    if (activeRoute === 'about' || activeRoute === '') this.renderPage(this.aboutPage.element);
    if (activeRoute === 'score') this.renderPage(this.scorePage.element);
    if (activeRoute === 'settings') this.renderPage(this.settingsPage.element);
    if (isAuth && isPlaying && activeRoute === 'match') {
      this.gamePage.newGame();
      this.renderPage(this.gamePage.element);
    } else this.gamePage.stopGame();
    if (!ROUTES.includes(activeRoute)) this.container.innerHTML = '<p style="font-size: 78px; text-align: center">404</p>';
  }

  renderPage(page: HTMLElement): void {
    this.container.innerHTML = '';
    this.container.append(page);
  }
}

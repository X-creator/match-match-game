import createElement from '../../../utils/createElement';
import AppModelInterface from '../model/app-model-interface';
import '../../../assets/icons/star.svg';
import '../../../assets/icons/settings.svg';

export default class AppView {
  public app: HTMLElement;

  public main: HTMLElement;

  public player: HTMLElement;

  private playerBtn: HTMLElement;

  private user: HTMLElement | undefined;

  private avatar: HTMLElement | undefined;

  private logOutBtn: HTMLElement | undefined;

  private navs: HTMLElement[];

  constructor() {
    this.app = document.body;
    this.main = createElement('main');
    this.navs = [];
    this.player = createElement('div', ['player']);
    this.playerBtn = createElement('button', ['player__btn']);
    this.logOutBtn = createElement('button', ['logout__btn']);
    this.createHeader();
    this.createUser();
  }

  createUser(): void {
    this.user = createElement('div', ['user']);
    this.avatar = createElement('img', ['user__avatar']);
    this.user.addEventListener('click', () => {
      if (this.logOutBtn?.isConnected) {
        this.logOutBtn.remove();
      } else this.renderLogOut();
    });
  }

  createHeader(): void {
    const h1 = createElement('h1');
    h1.textContent = 'Match-Match Game';
    this.app.append(h1);
    const header = createElement('header', ['header']);
    const headerWrap = createElement('div', ['container', 'header-wrapper']);
    const logo = createElement('a', ['logo']);
    logo.setAttribute('href', '#about');
    const logoWrap = createElement('div', ['logo__wrapper']);
    const logoUp = createElement('div', ['logo__up']);
    const logoUpText = createElement('span', ['logo__up-text']);
    logoUpText.textContent = 'match';
    logoUp.append(logoUpText);
    logoWrap.append(logoUp);
    const logoDown = createElement('div', ['logo__down']);
    const logoDownText = createElement('span', ['logo__down-text']);
    logoDownText.textContent = 'match';
    logoDown.append(logoDownText);
    logoWrap.append(logoDown);
    logo.append(logoWrap);
    headerWrap.append(logo);
    const headerNav = createElement('nav', ['header-nav']);
    const aboutNav = createElement('a', ['header-nav__link']);
    aboutNav.setAttribute('href', '#about');
    const aboutIcon = createElement('span', ['header-nav__link-icon']);
    aboutIcon.textContent = '?';
    const aboutText = createElement('span', ['header-nav__link-text']);
    aboutText.textContent = 'About Game';
    aboutNav.append(aboutIcon);
    aboutNav.append(aboutText);
    headerNav.append(aboutNav);
    this.navs.push(aboutNav);
    const scoreNav = createElement('a', ['header-nav__link']);
    scoreNav.setAttribute('href', '#score');
    const scoreIcon = createElement('span', ['header-nav__link-icon']);
    const scoreImg = createElement('img');
    scoreImg.setAttribute('src', './assets/icons/star.svg');
    scoreIcon.append(scoreImg);
    const scoreText = createElement('span', ['header-nav__link-text']);
    scoreText.textContent = 'Best Score';
    scoreNav.append(scoreIcon);
    scoreNav.append(scoreText);
    headerNav.append(scoreNav);
    this.navs.push(scoreNav);
    const settingsNav = createElement('a', ['header-nav__link']);
    settingsNav.setAttribute('href', '#settings');
    const settingsIcon = createElement('span', ['header-nav__link-icon']);
    const settingsImg = createElement('img');
    settingsImg.setAttribute('src', './assets/icons/settings.svg');
    settingsIcon.append(settingsImg);
    const settingsText = createElement('span', ['header-nav__link-text']);
    settingsText.textContent = 'Game Settings';
    settingsNav.append(settingsIcon);
    settingsNav.append(settingsText);
    headerNav.append(settingsNav);
    this.navs.push(settingsNav);
    headerWrap.append(headerNav);
    headerWrap.append(this.player);
    header.append(headerWrap);
    this.app.append(header);
    this.app.append(this.main);
    this.logOutBtn = createElement('button', ['logout__btn']);
  }

  onHashChange = (handler: () => void): void => {
    window.addEventListener('hashchange', handler);
  };

  onClickPlayer = (handler: (btn: HTMLElement) => void): void => {
    this.playerBtn.addEventListener('click', (e) => {
      const btn = e.target as HTMLElement;
      handler(btn);
    });
  };

  onClickLogout = (handler: () => void): void => {
    this.logOutBtn?.addEventListener('click', handler);
  };

  setActiveNav(activeRoute: string): void {
    this.navs.forEach((tab) => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${activeRoute}`) tab.classList.add('active');
    });
  }

  renderBtn = ({ isPlaying, isAuth }: AppModelInterface): void => {
    if (!isAuth) this.unRegistered();
    if (isAuth && isPlaying) this.playing();
    if (isAuth && !isPlaying) this.registered();
  };

  registered(): void {
    this.playerBtn.textContent = 'start game';
  }

  playing(): void {
    this.playerBtn.textContent = 'stop game';
  }

  renderAvatar(src: string | ArrayBuffer | null): void {
    this.avatar?.setAttribute('src', src as string);
    if (src) this.user?.append(this.avatar!);
    this.playerBtn.after(this.user!);
  }

  deleteAvatar(): void {
    this.avatar?.remove();
  }

  renderLogOut(): void {
    this.logOutBtn!.textContent = 'logout';
    this.user?.before(this.logOutBtn!);
  }

  unRegistered(): void {
    this.player.innerHTML = '';
    this.player.append(this.playerBtn);
    this.playerBtn.textContent = 'register new player';
  }
}

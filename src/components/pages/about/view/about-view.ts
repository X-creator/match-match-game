import createElement from '../../../../utils/createElement';
import '../../../../assets/images/about-1.png';
import '../../../../assets/images/about-2.png';
import '../../../../assets/images/about-3.png';
import '../about.scss';

export default class AboutView {
  readonly element: HTMLElement;

  constructor(readonly root: HTMLElement) {
    this.element = createElement('div', ['container', 'how-to']);
    this.root.append(this.element);
    this.createAbout();
  }

  createAbout(): void {
    const h2 = createElement('h2', ['how-to__main-title']);
    h2.textContent = 'How to play?';
    this.element.append(h2);
    const sectionRegister = createElement('section', ['how-to__register']);
    const registerDiv1 = createElement('div', ['how-to__register-wrapper']);
    const registerTitle = createElement('h3', ['how-to__title']);
    registerTitle.dataset.num = '1';
    registerTitle.textContent = 'Register a new player in game';
    registerDiv1.append(registerTitle);
    const registerDiv2 = createElement('div');
    const registerImg = createElement('img', ['how-to__register-img']);
    registerImg.setAttribute('src', './assets/images/about-1.png');
    registerImg.setAttribute('width', '302');
    registerImg.setAttribute('alt', 'registration form view');
    registerDiv2.append(registerImg);
    sectionRegister.append(registerDiv1);
    sectionRegister.append(registerDiv2);
    this.element.append(sectionRegister);
    const sectionConfigure = createElement('section', ['how-to__configure']);
    const ConfigureDiv1 = createElement('div', ['how-to__configure-wrapper']);
    const ConfigureTitle = createElement('h3', ['how-to__title']);
    ConfigureTitle.dataset.num = '2';
    ConfigureTitle.textContent = 'Configure your game settings';
    ConfigureDiv1.append(ConfigureTitle);
    const ConfigureDiv2 = createElement('div');
    const ConfigureImg = createElement('img');
    ConfigureImg.setAttribute('src', './assets/images/about-2.png');
    ConfigureImg.setAttribute('width', '116');
    ConfigureImg.setAttribute('height', '73');
    ConfigureImg.setAttribute('alt', 'settings button view');
    ConfigureDiv2.append(ConfigureImg);
    sectionConfigure.append(ConfigureDiv1);
    sectionConfigure.append(ConfigureDiv2);
    this.element.append(sectionConfigure);
    const sectionPlay = createElement('section', ['how-to__play']);
    const PlayDiv1 = createElement('div', ['how-to__play-wrapper']);
    const PlayTitle = createElement('h3', ['how-to__title']);
    PlayTitle.dataset.num = '3';
    PlayTitle.textContent = 'Start your new game! Remember card positions and match it before times up.';
    PlayDiv1.append(PlayTitle);
    const PlayDiv2 = createElement('div');
    const PlayImg = createElement('img', ['how-to__play-img']);
    PlayImg.setAttribute('src', './assets/images/about-3.png');
    PlayImg.setAttribute('width', '330');
    PlayImg.setAttribute('alt', 'game field view');
    PlayDiv2.append(PlayImg);
    sectionPlay.append(PlayDiv1);
    sectionPlay.append(PlayDiv2);
    this.element.append(sectionPlay);
  }
}

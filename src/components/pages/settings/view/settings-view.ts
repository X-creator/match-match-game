import createElement from '../../../../utils/createElement';
import '../settings.scss';

export default class SettingsView {
  readonly element: HTMLElement;

  readonly cardsType: HTMLElement[];

  readonly gameType: HTMLElement[];

  constructor(public root: HTMLElement) {
    this.element = createElement('div', ['container', 'settings']);
    this.cardsType = [];
    this.gameType = [];
    this.renderSettings();
  }

  renderSettings():void {
    const sectionCards = createElement('section', ['cards-type']);
    const cardsDiv1 = createElement('div');
    const cardsTitle = createElement('h2', ['cards-type__title']);
    cardsTitle.textContent = 'Game cards';
    const cardsText = createElement('p', ['cards-type__text']);
    cardsText.textContent = 'select game cards type';
    cardsDiv1.append(cardsTitle);
    cardsDiv1.append(cardsText);
    const cardsTypeContainer = createElement('div', ['cards-type__select']);
    const cardsType1 = createElement('div', ['cards-type__item-1', 'card-item']);
    cardsType1.dataset.category = 'foods';
    cardsTypeContainer.append(cardsType1);
    this.cardsType.push(cardsType1);
    const cardsType2 = createElement('div', ['cards-type__item-2', 'card-item', 'active']);
    cardsType2.dataset.category = 'animals';
    cardsTypeContainer.append(cardsType2);
    this.cardsType.push(cardsType2);
    const cardsType3 = createElement('div', ['cards-type__item-3', 'card-item']);
    cardsType3.dataset.category = 'vehicles';
    cardsTypeContainer.append(cardsType3);
    this.cardsType.push(cardsType3);
    sectionCards.append(cardsDiv1);
    sectionCards.append(cardsTypeContainer);
    this.element.append(sectionCards);
    const sectionGame = createElement('section', ['game-type']);
    const gameDiv1 = createElement('div');
    const gameTitle = createElement('h2', ['game-type__title']);
    gameTitle.textContent = 'Difficulty';
    const gameText = createElement('p', ['game-type__text']);
    gameText.textContent = 'select game type';
    gameDiv1.append(gameTitle);
    gameDiv1.append(gameText);
    const gameTypeContainer = createElement('div', ['game-type__select']);
    const gameType1 = createElement('div', ['game-type__item-1', 'game-item', 'active']);
    gameType1.dataset.mode = 'junior';
    const gameText1 = createElement('span', ['game-item__text']);
    gameText1.textContent = 'Junior';
    gameType1.append(gameText1);
    gameTypeContainer.append(gameType1);
    this.gameType.push(gameType1);
    const gameType2 = createElement('div', ['game-type__item-2', 'game-item']);
    gameType2.dataset.mode = 'middle';
    const gameText2 = createElement('span', ['game-item__text']);
    gameText2.textContent = 'Middle';
    gameType2.append(gameText2);
    gameTypeContainer.append(gameType2);
    this.gameType.push(gameType2);
    const gameType3 = createElement('div', ['game-type__item-3', 'game-item']);
    gameType3.dataset.mode = 'senior';
    const gameText3 = createElement('span', ['game-item__text']);
    gameText3.textContent = 'Senior';
    gameType3.append(gameText3);
    gameTypeContainer.append(gameType3);
    this.gameType.push(gameType3);
    sectionGame.append(gameDiv1);
    sectionGame.append(gameTypeContainer);
    this.element.append(sectionGame);

    this.root.append(this.element);
  }

  onSelect = (handler: (e: Event) => void): void => {
    [...this.cardsType, ...this.gameType].forEach((item) => {
      item.addEventListener('click', handler);
    });
  };

  render(elem: HTMLElement): void {
    let collection: HTMLElement[] = [];
    if (elem.classList.contains('card-item')) collection = this.cardsType;
    if (elem.classList.contains('game-item')) collection = this.gameType;
    collection.forEach((item) => item.classList.remove('active'));
    elem.classList.add('active');
  }
}

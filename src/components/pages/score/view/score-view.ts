import createElement from '../../../../utils/createElement';
import '../../../../assets/images/card-back.png';
import CreateUserInterface from './create-user-interface';
import '../score.scss';

export default class ScoreView {
  readonly element: HTMLElement;

  private sectionScore: HTMLElement;

  constructor(private root: HTMLElement) {
    this.element = createElement('div', ['container', 'score-container']);
    const h2 = createElement('h2', ['score-title']);
    h2.textContent = 'Best players';
    this.element.append(h2);
    this.sectionScore = createElement('section', ['score']);
    this.element.append(this.sectionScore);
    this.root.append(this.element);
  }

  dropUsers(): void {
    this.sectionScore.innerHTML = '';
  }

  onLogOut = (): void => {
    this.sectionScore.querySelectorAll('.user__credentials').forEach((user) => user.classList.remove('active'));
  };

  createUserField: CreateUserInterface = ({
    avatar, name, surname, email, score, isCurrentUser,
  }): void => {
    const userScore = createElement('div', ['score-user']);
    const userWrap = createElement('div', ['score-user__wrapper']);
    const userAvatarWrap = createElement('div', ['user__wrapper']);
    const userAvatar = createElement('img', ['user__avatar']);
    const userCredentials = createElement('div', ['user__credentials']);
    if (isCurrentUser) userCredentials.classList.add('active');
    const userFullName = createElement('div', ['user__fullname']);
    const userName = createElement('span', ['user__name']);
    const userSurname = createElement('span', ['user__surname']);
    const userEmail = createElement('span', ['user__email']);
    const scoreWrap = createElement('div', ['score__wrapper']);
    const scoreText = createElement('span', ['score__text']);
    const scoreAmount = createElement('span', ['score__amount']);
    userAvatar.setAttribute('alt', 'avatar');
    scoreText.textContent = 'Score:';
    avatar = avatar || './assets/images/card-back.png';
    userAvatar.setAttribute('src', <string>avatar);
    userName.textContent = name;
    userSurname.textContent = surname;
    userEmail.textContent = email;
    score = score || 0;
    scoreAmount.textContent = `${score}`;
    userScore.append(userWrap);
    userWrap.append(userAvatarWrap);
    userAvatarWrap.append(userAvatar);
    userWrap.append(userCredentials);
    userCredentials.append(userFullName);
    userFullName.append(userName);
    userFullName.append(userSurname);
    userCredentials.append(userEmail);
    userScore.append(scoreWrap);
    scoreWrap.append(scoreText);
    scoreWrap.append(scoreAmount);
    this.sectionScore.append(userScore);
  };
}

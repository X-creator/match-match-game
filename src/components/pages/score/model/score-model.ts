import ScoreModelInterface from './score-model-interface';
import { TOP_TEN } from '../user-score-config';
import { DB } from '../../../app/model/db';

export default class ScoreModel {
  public state: { userScore: ScoreModelInterface[], currentUser: ScoreModelInterface | null, userID: number | null };

  constructor() {
    this.state = {
      userScore: [],
      currentUser: null,
      userID: null,
    };
  }

  getAll = async (): Promise<void> => {
    await DB.init();
    this.state.userScore = await DB.getAll();
    this.normalizeUsers();
  };

  saveUser = async (): Promise<void> => {
    await DB.init();
    if (!this.state.currentUser?.score) this.state.userID = await DB.put(this.state.currentUser) as number;
    else await DB.put(this.state.currentUser);
  };

  getUsers = (): ScoreModelInterface[] => this.state.userScore.map((user) => {
    if (this.state.currentUser
      && user.name === this.state.currentUser.name
      && user.surname === this.state.currentUser.surname
      && user.email === this.state.currentUser.email) return { ...user, isCurrentUser: true };
    return { ...user, isCurrentUser: false };
  });

  pushUserScore = (): void => {
    if (this.state.currentUser) this.state.userScore.push(this.state.currentUser);
    this.normalizeUsers();
  };

  normalizeUsers = (): void => {
    this.state.userScore.sort(this.userSort);
    this.state.userScore = this.state.userScore.slice(0, TOP_TEN);
  };

  userSort = (user1: ScoreModelInterface, user2: ScoreModelInterface): number => user2.score! - user1.score!;
}

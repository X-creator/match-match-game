import GameModel from '../model/game-model';
import { HERMES } from '../HERMES';
import BoardModel from '../model/board-model';
import GameField from '../../game-field';
import Timer from '../../timer';
import NotificationView from '../view/notification-view';
import {
  BEFORE_GAME_TIME, GAME_TIME, PRELOAD_TIME, AFTER_GAME_TIME, WARNING_TIME,
} from '../game-config';

export default class GameController {
  private model: GameModel;

  private boardModel: BoardModel;

  private gameField: GameField;

  public element: HTMLElement;

  private timer: Timer;

  private view: NotificationView;

  constructor(private root: HTMLElement) {
    this.gameField = new GameField(root);
    this.element = this.gameField.element;
    this.model = new GameModel(this.gameField.block, this.gameField.unblock, this.onGameOver);
    this.boardModel = new BoardModel();
    this.view = new NotificationView(root);
    this.timer = new Timer(document.querySelector('.player') as HTMLElement);
    HERMES.onClick = this.model.onClick;
  }

  prepareBoard = async (): Promise<void> => {
    if (this.boardModel.state.allImages.length === 0) await this.boardModel.fetchImages();
    this.boardModel.getSettings();
    this.boardModel.getSelected();
    this.boardModel.prepareDeck();
    this.boardModel.state.cards = this.gameField.addCards(this.boardModel.state.selectedImages);
    this.model.getSettings();
    this.gameField.init();
    this.gameField.block();
  };

  newGame = async (): Promise<void> => {
    this.view.hideMessage();
    await this.prepareBoard();
    await this.preloadImages();
    await this.beforeGame();
    await this.gameTime();
    await this.preparingTime(AFTER_GAME_TIME);
    this.afterGame();
  };

  preloadImages = async (): Promise<void> => {
    this.view.showSpinner();
    await this.boardModel.awaitAllImg();
    this.view.hideSpinner();
    this.boardModel.state.uploaded.concat(this.boardModel.state.willUpload);
    await this.preparingTime(PRELOAD_TIME);
  };

  preparingTime = async (sec: number): Promise<void> => {
    this.timer.timer.setSettings({ timeInSec: sec });
    this.timer.timer.hide();
    await this.timer.timer.start();
  };

  beforeGame = async (): Promise<void> => {
    this.boardModel.state.cards.forEach((card) => card.flipToFront());
    this.timer.timer.setSettings({
      timeInSec: BEFORE_GAME_TIME,
      isForward: false,
      isPreparing: true,
    });
    await this.timer.timer.start();
  };

  gameTime = async (): Promise<void> => {
    this.boardModel.state.cards.forEach((card) => card.flipToBack());
    this.gameField.unblock();
    this.timer.timer.setSettings({
      timeInSec: GAME_TIME,
      warningTime: WARNING_TIME,
      isForward: false,
      isPreparing: false,
    });
    await this.timer.timer.start();
    this.gameField.block();
    this.onGameOver();
  };

  afterGame = (): void => {
    this.boardModel.state.cards.forEach((card) => card.flipToFront());
    this.model.state.guessed.forEach((card) => card.setToCorrect());
  };

  onGameOver = (): void => {
    const time: number = this.timer.timer.getTime();
    this.timer.timer.pause();
    this.model.state.score = Math.floor(this.model.state.score - time);
    if (this.model.state.score < 0) this.model.state.score = 0;
    const { score } = this.model.state;
    if (HERMES.onPushUser && HERMES.getCredentials) {
      HERMES.onPushUser({
        ...HERMES.getCredentials(),
        score: this.model.state.score,
      });
    }
    this.model.restoreState();
    this.view.showMessage(score);
  };

  stopGame = (): void => {
    this.gameField.clear();
    this.timer.timer.disconnect();
  };
}

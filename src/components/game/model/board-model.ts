import BoardModelInterface from './board-model-interface';
import { ImageCategoryInterface } from './image-category-interface';
import { URL, FIELD_CONFIG } from '../game-config';
import { HERMES } from '../HERMES';

export default class BoardModel {
  public state: BoardModelInterface;

  constructor() {
    this.state = {
      allImages: [],
      selectedImages: [],
      willUpload: [],
      uploaded: [],
      cards: [],
      category: 'animals',
      mode: 'junior',
    };
  }

  fetchImages = async (): Promise<void> => {
    const res = await fetch(URL);
    const data = await res.json();
    this.state.allImages = data.map(({ category, imgAmount }: ImageCategoryInterface) => {
      const arr = Array.from({ length: imgAmount }, (_, idx) => `./public/images/${category}/${category}${idx + 1}.jpg`);
      return { [category]: arr };
    });
  };

  getSettings = (): void => {
    if (HERMES.getSettings) {
      const { category, mode } = HERMES.getSettings();
      this.state = { ...this.state, category, mode };
    }
  };

  getSelected = (): void => {
    const { allImages, category } = this.state;
    allImages.forEach((obj) => {
      if (category in obj) this.state.selectedImages = Object.values(obj).flat();
    });
  };

  preloadImg = (src: string): Promise<void> => new Promise((resolve) => {
    const img = new Image();
    img.onload = (): void => resolve();
    img.onerror = (): void => resolve();
    img.src = src;
  });

  awaitAllImg = (): Promise<void[]> => {
    this.state.willUpload = this.state.willUpload.filter((url) => !this.state.uploaded.includes(url));
    return Promise.all(this.state.willUpload.map(this.preloadImg));
  };

  prepareDeck = (): void => {
    const { selectedImages } = this.state;
    this.state.willUpload = this.shuffle(selectedImages).slice(0, FIELD_CONFIG[this.state.mode]);
    const shuffled = this.shuffle([...this.state.willUpload, ...this.state.willUpload]);
    this.state.selectedImages = this.shuffle(shuffled);
  };

  private shuffle = (arr: string[]): string[] => {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };
}

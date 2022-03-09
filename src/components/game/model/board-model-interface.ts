import { ImageCategoryInterface } from './image-category-interface';
import CardResponseInterface from '../../card/controller/card-response-interface';

export default interface BoardModelInterface {
  allImages: Record<string, []>[],
  selectedImages: string[],
  willUpload: string[],
  uploaded: string[],
  cards: CardResponseInterface[],
  category: ImageCategoryInterface['category'],
  mode: ('junior' | 'middle' | 'senior'),
}

import AboutView from './view/about-view';

export default class AboutPage {
  public element: HTMLElement;

  constructor(private root: HTMLElement) {
    const view = new AboutView(root);
    this.element = view.element;
  }
}

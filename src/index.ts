import './style.scss';
import App from './components/app';

window.onload = (): void => {
  document.body.ondragstart = (): boolean => false;
};
const app = new App();

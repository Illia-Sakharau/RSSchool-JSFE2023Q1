import './main.scss';
import createElement from '../../../utils/createElement';

export default class Main {
  public draw(): HTMLElement {
    const mainEl: HTMLElement = createElement('main');
    const wrapperEl: HTMLElement = createElement('div', ['wrapper']);
    const asideEl: HTMLElement = createElement('aside');

    wrapperEl.appendChild(createElement('section', ['pot']));
    wrapperEl.appendChild(createElement('section', ['editor']));
    mainEl.appendChild(wrapperEl);
    mainEl.appendChild(asideEl);

    return mainEl;
  }
}

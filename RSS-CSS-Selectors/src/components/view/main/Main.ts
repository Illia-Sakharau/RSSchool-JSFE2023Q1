import './main.scss';
import createElement from '../../../utils/createElement';
import Aside from './aside/Aside';

export default class Main {
  private aside: Aside = new Aside();

  public draw(): HTMLElement {
    const mainEl: HTMLElement = createElement({ tag: 'main' });
    const wrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['wrapper'] });
    const asideEl: HTMLElement = this.aside.draw();

    wrapperEl.appendChild(createElement({ tag: 'section', classes: ['pot'] }));
    wrapperEl.appendChild(createElement({ tag: 'section', classes: ['editor'] }));
    mainEl.appendChild(wrapperEl);
    mainEl.appendChild(asideEl);

    return mainEl;
  }
}

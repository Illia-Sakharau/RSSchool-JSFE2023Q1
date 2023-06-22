import './main.scss';
import createElement from '../../../utils/createElement';
import Aside from './aside/Aside';
import Editors from './editors/Editors';

export default class Main {
  private aside: Aside = new Aside();
  private editors: Aside = new Editors();

  public draw(): HTMLElement {
    const mainEl: HTMLElement = createElement({ tag: 'main' });
    const wrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['wrapper'] });
    const asideEl: HTMLElement = this.aside.draw();
    const editorsEl: HTMLElement = this.editors.draw();

    wrapperEl.appendChild(createElement({ tag: 'section', classes: ['pot'] }));
    wrapperEl.appendChild(editorsEl);
    mainEl.appendChild(wrapperEl);
    mainEl.appendChild(asideEl);

    return mainEl;
  }
}

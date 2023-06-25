import './main.scss';
import createElement from '../../../utils/createElement';
import Aside from './aside/Aside';
import Editors from './editors/Editors';
import Demo from './demo/Demo';

export default class Main {
  private aside: Aside = new Aside();
  private editors: Editors = new Editors();
  private demo: Demo = new Demo();

  public draw(): HTMLElement {
    const mainEl: HTMLElement = createElement({ tag: 'main' });
    const wrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['wrapper'] });
    const asideEl: HTMLElement = this.aside.draw();
    const editorsEl: HTMLElement = this.editors.draw();
    const demoEl: HTMLElement = this.demo.draw();

    wrapperEl.append(demoEl, editorsEl);
    mainEl.append(wrapperEl, asideEl);

    return mainEl;
  }
}

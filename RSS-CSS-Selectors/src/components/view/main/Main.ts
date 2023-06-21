import './main.scss';
import createElement from '../../../utils/createElement';

export default class Main {
  public draw(): HTMLElement {
    const mainEl: HTMLElement = createElement({ tag: 'main' });
    const wrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['wrapper'] });
    const asideEl: HTMLElement = createElement({ tag: 'aside' });

    wrapperEl.appendChild(createElement({ tag: 'section', classes: ['pot'] }));
    wrapperEl.appendChild(createElement({ tag: 'section', classes: ['editor'] }));
    mainEl.appendChild(wrapperEl);
    mainEl.appendChild(asideEl);

    return mainEl;
  }
}

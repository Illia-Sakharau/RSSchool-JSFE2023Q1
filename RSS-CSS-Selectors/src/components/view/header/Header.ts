import './header.scss';
import htmlToElement from '../../../utils/htmlToElement';
import createElement from '../../../utils/createElement';
import logo from '../../../assets/logo.svg';

export default class Header {
  public draw(level: string, description: string, foo: () => void): HTMLElement {
    const template: string = `<header>
        <div class="logo">
          ${logo}
          <h1>Floral CSS</h1>
        </div>
        <div class="level">
          <h2>${level}</h2>
          <span>${description}</span>
        </div>
      </header>
    `;
    const headerEl: HTMLElement = htmlToElement(template);
    const menuEl: HTMLElement = createElement('div', ['menu']);
    menuEl.appendChild(createElement('div', ['line']));
    menuEl.addEventListener('click', foo);
    headerEl.appendChild(menuEl);

    return headerEl;
  }
}

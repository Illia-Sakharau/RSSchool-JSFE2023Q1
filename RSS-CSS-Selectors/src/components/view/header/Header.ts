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
    const menuEl: HTMLElement = createElement({ tag: 'div', classes: ['menu'] });
    menuEl.appendChild(createElement({ tag: 'div', classes: ['line'] }));

    // open/close aside meny
    menuEl.addEventListener('click', () => {
      const event = new Event('toggleMenu');
      document.dispatchEvent(event);
      menuEl.classList.toggle('menu_close');
    });

    headerEl.appendChild(menuEl);

    return headerEl;
  }
}

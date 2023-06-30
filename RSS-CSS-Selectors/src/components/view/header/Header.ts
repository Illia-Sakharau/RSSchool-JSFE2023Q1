import './header.scss';
import htmlToElement from '../../../utils/htmlToElement';
import createElement from '../../../utils/createElement';
import logo from '../../../assets/logo.svg';
import { CURRENT_LEVEL } from '../../../data/constants';

export default class Header {
  public draw(): HTMLElement {
    const template: string = `<header>
        <div class="logo">
          ${logo}
          <h1>Floral CSS</h1>
        </div>
        <div class="level">
          <h2>Level ${CURRENT_LEVEL.getLevel() + 1}:</h2>
          <span>${CURRENT_LEVEL.getTitle()}</span>
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
    });
    document.addEventListener('toggleMenu', () => {
      menuEl.classList.toggle('menu_close');
    });
    document.addEventListener('closeMenu', () => {
      menuEl.classList.remove('menu_close');
    });

    headerEl.appendChild(menuEl);

    return headerEl;
  }
}

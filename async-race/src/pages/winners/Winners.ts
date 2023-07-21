import './winners.scss';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';

export default class Winners {
  private winnersView: HTMLElement = createElement({ tag: 'div', classes: ['winners'] });

  constructor() {
    this.draw();
  }

  private draw() {
    const headerEl = Header('Winners');
    const wrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['winners__wrapper'] });
    const titleEl: HTMLElement = createElement({ tag: 'div', classes: ['winners__title'] });

    wrapperEl.append(titleEl);

    this.winnersView.append(headerEl, titleEl);
  }

  public getWinnersView(): HTMLElement {
    return this.winnersView;
  }
}

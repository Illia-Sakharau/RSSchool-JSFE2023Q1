import './winners.scss';
// import htmlToElement from '../../utils/htmlToElement';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';

export default class Winners {
  private winnersView: HTMLElement = createElement({ tag: 'div', classes: ['garage__wrapper'] });

  constructor() {
    this.draw();
  }

  private draw() {
    const headerEl = Header('Winners');

    this.winnersView.append(headerEl);
  }

  public getWinnersView(): HTMLElement {
    return this.winnersView;
  }
}

import './garage.scss';
// import htmlToElement from '../../utils/htmlToElement';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';

export default class Garage {
  private garageView: HTMLElement = createElement({ tag: 'div', classes: ['garage__wrapper'] });

  constructor() {
    this.draw();
  }

  private draw() {
    const headerEl = Header('Garage');

    this.garageView.append(headerEl);
  }

  public getGarageView(): HTMLElement {
    return this.garageView;
  }
}

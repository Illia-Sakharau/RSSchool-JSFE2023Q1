import './garage.scss';
// import htmlToElement from '../../utils/htmlToElement';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';

export default class Garage {
  public draw(): HTMLElement {
    const garageView: HTMLElement = createElement({ tag: 'div', classes: ['garage__wrapper'] });
    const headerEl = Header('Garage');

    garageView.append(headerEl);
    return garageView;
  }
}

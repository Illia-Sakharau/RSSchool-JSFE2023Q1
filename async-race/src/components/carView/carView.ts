import './carView.scss';
import createElement from '../../utils/createElement';
import htmlToElement from '../../utils/htmlToElement';
import filter34 from '../../assets/car34filter.svg';
import filterFront from '../../assets/carFrontFilter.svg';

export default function createCarView34(color: string, type: '34' | 'front'): HTMLElement {
  const elClass = type === '34' ? 'car-view-34' : 'car-view-front';
  const filter = type === '34' ? filter34 : filterFront;
  const carView34El: HTMLElement = createElement({ tag: 'div', classes: [elClass] });
  const carEl: HTMLElement = htmlToElement(`<div class="${elClass}__grey">${filter}</div>`);
  const filterEl = carEl.querySelector('svg');
  if (filterEl) {
    filterEl.style.fill = color;
  }
  carView34El.append(carEl);
  return carView34El;
}

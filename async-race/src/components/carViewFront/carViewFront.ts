import './carViewFront.scss';
import createElement from '../../utils/createElement';
import htmlToElement from '../../utils/htmlToElement';
import filter from '../../assets/carFrontFilter.svg';

export default function createCarViewFront(color: string): HTMLElement {
  const carView34El: HTMLElement = createElement({ tag: 'div', classes: ['car-view-front'] });
  const carEl: HTMLElement = htmlToElement(`<div class="car-view-front__grey">${filter}</div>`);
  const filterEl = carEl.querySelector('svg');
  if (filterEl) {
    filterEl.style.fill = color;
  }
  carView34El.append(carEl);
  return carView34El;
}

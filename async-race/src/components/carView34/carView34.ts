import './carView34.scss';
import createElement from '../../utils/createElement';
import htmlToElement from '../../utils/htmlToElement';
import filter from '../../assets/car34filter.svg';

export default function createCarView34(color: string): HTMLElement {
  const carView34El: HTMLElement = createElement({ tag: 'div', classes: ['car-view-34'] });
  const carEl: HTMLElement = htmlToElement(`<div class="car-view-34__grey">${filter}</div>`);
  const filterEl = carEl.querySelector('svg');
  if (filterEl) {
    filterEl.style.fill = color;
  }
  carView34El.append(carEl);
  return carView34El;
}

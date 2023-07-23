import './trackLine.scss';
import createElement from '../../utils/createElement';
import { ICar } from '../../types/types';
import filter from '../../assets/carTopFilter.svg';
import htmlToElement from '../../utils/htmlToElement';

export default function createTrackLine(carInfo: ICar): HTMLElement {
  const { color } = carInfo;
  const trackLineEl = createElement({ tag: 'div', classes: ['track-line'] });
  const carWrapper: HTMLElement = htmlToElement(`<div class="track-line__car">${filter}</div>`);
  const carEl = carWrapper.querySelector('svg');
  if (carEl) {
    carEl.style.fill = color;
  }
  trackLineEl.append(carWrapper);
  return trackLineEl;
}

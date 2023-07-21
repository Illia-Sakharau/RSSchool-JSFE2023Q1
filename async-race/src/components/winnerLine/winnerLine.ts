import './winnerLine.scss';
import createElement from '../../utils/createElement';
import { ICar, IWinners } from '../../types/types';
import createCarViewFront from '../carViewFront/carViewFront';

export default function createWinnerLine(carInfo: ICar, winnerInfo: IWinners, num: number): HTMLElement {
  const { time, wins } = winnerInfo;
  const { name, color } = carInfo;
  const winnerLineEl = createElement({ tag: 'div', classes: ['winners__line'] });
  const numberEl = createElement({ tag: 'div', classes: ['td', 'td_number'], content: `#${num}` });
  const carEl = createCarViewFront(color);
  const nameEl = createElement({ tag: 'div', classes: ['td', 'td_name'], content: name });
  const winsEl = createElement({ tag: 'div', classes: ['td', 'td_wins'], content: wins.toString() });
  const timeEl = createElement({ tag: 'div', classes: ['td', 'td_time'], content: time.toString() });

  carEl.classList.add('td', 'td_car');
  winnerLineEl.append(numberEl, carEl, nameEl, winsEl, timeEl);
  return winnerLineEl;
}

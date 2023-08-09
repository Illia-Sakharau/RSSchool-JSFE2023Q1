import './winnerPopup.scss';
import createElement from '../../utils/createElement';
import { ICar } from '../../types/types';
import createCarView from '../carView/carView';
import createButton from '../button/button';
import closeIconImg from '../../assets/closeIcon.svg';

export default function winnerPopup(carInfo: ICar, time: number): HTMLElement {
  const { name, color } = carInfo;
  const winnerPopupEl: HTMLElement = createElement({ tag: 'div', classes: ['pop-up'] });
  const innerPopupEl: HTMLElement = createElement({ tag: 'div', classes: ['pop-up__inner'] });
  const closeBtnEl: HTMLButtonElement = createButton({
    priority: 'secondary',
    type: 'icon',
    icon: closeIconImg,
    handler: () => {
      winnerPopupEl.remove();
    },
  });
  const textInnerEl: HTMLElement = createElement({ tag: 'div', classes: ['pop-up__text-inner'], content: 'WINNER:' });
  const nameTextEl: HTMLElement = createElement({ tag: 'span', classes: ['pop-up__name'], content: name });
  const timeTextEl: HTMLElement = createElement({ tag: 'span', classes: ['pop-up__time'], content: `Finish time: ${time}s` });
  const carWrapperEl: HTMLElement = createElement({ tag: 'div', classes: ['pop-up__car-wrapper'] });
  const carEl: HTMLElement = createCarView(color, '34');

  carWrapperEl.append(carEl);
  textInnerEl.append(nameTextEl, timeTextEl);

  innerPopupEl.append(closeBtnEl, textInnerEl, carWrapperEl);
  winnerPopupEl.append(innerPopupEl);

  return winnerPopupEl;
}

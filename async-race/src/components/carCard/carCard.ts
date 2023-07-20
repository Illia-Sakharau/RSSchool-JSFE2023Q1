import './carCard.scss';
import createElement from '../../utils/createElement';
import { ICar } from '../../types/types';
import createButton from '../button/button';
import createCarViewFront from '../carViewFront/carViewFront';

export default function createCarCard(params: ICar, isActice: boolean): HTMLElement {
  const { name, color } = params;
  const carCard: HTMLElement = createElement({ tag: 'div', classes: ['car-card'] });
  const nameEl: HTMLElement = createElement({ tag: 'h6', classes: ['car-card__name'], content: name });
  const innerEl: HTMLElement = createElement({ tag: 'div', classes: ['car-card__inner'] });
  const carBtnBarEl: HTMLElement = createElement({ tag: 'div', classes: ['car-card__car-btn-bar'] });
  const imgCarEl: HTMLElement = createCarViewFront(color);
  const engineBtnBarEl: HTMLElement = createElement({ tag: 'div', classes: ['car-card__engine-btn-bar'] });
  const startBtnEl: HTMLButtonElement = createButton({
    priority: 'positive',
    type: 'bordered',
    text: 'A',
    handler: () => {
      console.log('Start car');
    },
  });
  const stopBtnEl: HTMLButtonElement = createButton({
    priority: 'negative',
    type: 'bordered',
    text: 'B',
    handler: () => {
      console.log('Stop car');
    },
  });
  const removeBtnEl: HTMLButtonElement = createButton({
    priority: 'negative',
    type: 'bordered',
    text: 'Remove',
    handler: () => {
      console.log('Remove car');
    },
  });
  const selectBtnEl: HTMLButtonElement = createButton({
    priority: 'primary',
    type: 'filled',
    text: 'Select',
    handler: () => {
      console.log('Select car');
    },
  });

  stopBtnEl.disabled = true;
  engineBtnBarEl.append(startBtnEl, stopBtnEl);

  innerEl.append(imgCarEl, engineBtnBarEl);
  carBtnBarEl.append(removeBtnEl, selectBtnEl);

  if (isActice) {
    carCard.classList.add('car-card_active');
  }
  carCard.append(nameEl, innerEl, carBtnBarEl);
  return carCard;
}

import './carCard.scss';
import createElement from '../../utils/createElement';
import { ICar } from '../../types/types';
import createButton from '../button/button';
import createCarViewFront from '../carViewFront/carViewFront';
import { CarsControls } from '../../functions/carsControls';

export default function createCarCard(params: ICar, isActice: boolean): HTMLElement {
  const { name, color, id } = params;
  const carCard: HTMLElement = createElement({ tag: 'div', classes: ['car-card'] });
  const nameEl: HTMLElement = createElement({ tag: 'h6', classes: ['car-card__name'], content: name });
  const innerEl: HTMLElement = createElement({ tag: 'div', classes: ['car-card__inner'] });
  const carBtnBarEl: HTMLElement = createElement({ tag: 'div', classes: ['car-card__car-btn-bar'] });
  const imgCarEl: HTMLElement = createCarViewFront(color);
  const engineBtnBarEl: HTMLElement = createElement({ tag: 'div', classes: ['car-card__engine-btn-bar'] });

  let carController = new CarsControls([Number(id)]);

  const startBtnEl: HTMLButtonElement = createButton({
    priority: 'positive',
    type: 'bordered',
    text: 'A',
    handler: async () => {
      const raceBtn = document.querySelector('[data-btn-track="race"]') as HTMLButtonElement;
      const resetBtn = document.querySelector('[data-btn-track="reset"]') as HTMLButtonElement;
      carController = new CarsControls([Number(id)]);
      raceBtn.disabled = true;
      resetBtn.disabled = false;
      startBtnEl.disabled = true;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      stopBtnEl.disabled = false;
      await carController.startCars();
    },
  });
  const stopBtnEl: HTMLButtonElement = createButton({
    priority: 'negative',
    type: 'bordered',
    text: 'B',
    handler: async () => {
      console.log('Stop car');
      startBtnEl.disabled = false;
      stopBtnEl.disabled = true;
      await carController.stopCars();
    },
  });
  const removeBtnEl: HTMLButtonElement = createButton({
    priority: 'negative',
    type: 'bordered',
    text: 'Remove',
    handler: () => {},
  });
  const selectBtnEl: HTMLButtonElement = createButton({
    priority: 'primary',
    type: 'filled',
    text: 'Select',
    handler: () => {},
  });

  carCard.id = `${id}`;

  startBtnEl.dataset.btn = 'start';
  stopBtnEl.dataset.btn = 'stop';
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

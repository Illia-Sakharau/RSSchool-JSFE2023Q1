import './carPropsInput.scss';
import createElement from '../../utils/createElement';
import { ICarPropsInputParams } from '../../types/types';
import createButton from '../button/button';

export default function carPropsInput(params: ICarPropsInputParams): HTMLElement {
  const { inputText, color, btnText, btnHandler } = params;
  const carPropsInputEl: HTMLElement = createElement({ tag: 'div', classes: ['propsInput'] });
  const inputTextEl = createElement({ tag: 'input', classes: ['propsInput__text'] }) as HTMLInputElement;
  const inputColorEl = createElement({ tag: 'input', classes: ['propsInput__color'] }) as HTMLInputElement;
  const buttonEl: HTMLElement = createButton({
    priority: 'primary',
    type: 'filled',
    text: btnText,
    handler: () => {},
  });

  buttonEl.addEventListener('click', () => {
    btnHandler({ name: inputTextEl.value, color: inputColorEl.value });
  });
  if (inputTextEl instanceof HTMLInputElement) {
    inputTextEl.value = inputText;
  }
  if (inputColorEl instanceof HTMLInputElement) {
    inputColorEl.setAttribute('type', 'color');
    inputColorEl.value = color;
  }

  carPropsInputEl.append(inputTextEl, inputColorEl, buttonEl);

  return carPropsInputEl;
}

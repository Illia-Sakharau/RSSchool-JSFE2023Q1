import './carPropsInput.scss';
import createElement from '../../utils/createElement';
import { ICarPropsInputParams } from '../../types/types';
import createButton from '../button/button';

export default function carPropsInput(params: ICarPropsInputParams): HTMLElement {
  const { inputText, color, btnText, btnHandler } = params;
  const carPropsInputEl: HTMLElement = createElement({ tag: 'div', classes: ['propsInput'] });
  const inputTextEl: HTMLElement = createElement({ tag: 'input', classes: ['propsInput__text'] });
  const inputColorEl = createElement({ tag: 'input', classes: ['propsInput__color'] });
  const buttonEl: HTMLElement = createButton({
    priority: 'primary',
    type: 'filled',
    text: btnText,
    handler: btnHandler,
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

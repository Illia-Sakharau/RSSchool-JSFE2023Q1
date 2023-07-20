import './button.scss';
import createElement from '../../utils/createElement';
import { IButtonParams } from '../../types/types';
import htmlToElement from '../../utils/htmlToElement';

export default function createButton(buttonParams: IButtonParams): HTMLElement {
  const { priority, type, text, icon, handler } = buttonParams;
  const classes: string[] = ['button', `button__${type}-${priority}`];
  const buttonEl: HTMLElement = createElement({ tag: 'button', classes, content: text });
  if (icon) {
    const iconEl = htmlToElement(`<div class="button__icon">${icon}</div>`);
    buttonEl.append(iconEl);
  }

  buttonEl.addEventListener('click', handler);

  return buttonEl;
}

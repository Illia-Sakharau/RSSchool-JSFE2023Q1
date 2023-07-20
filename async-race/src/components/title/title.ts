import './title.scss';
import createElement from '../../utils/createElement';

export default function createTitle(titleText: string, aditionalElement?: HTMLElement): HTMLElement {
  const titleEl: HTMLElement = createElement({ tag: 'div', classes: ['title'] });
  const textEl: HTMLElement = createElement({ tag: 'h3', classes: ['title__text'], content: titleText });
  const aditionalEl: HTMLElement = !aditionalElement ? createElement({ tag: 'div' }) : aditionalElement;

  titleEl.append(textEl, aditionalEl);

  return titleEl;
}

import { ICreateElementParam } from '../types/types';

export default function (params: ICreateElementParam): HTMLElement {
  const elem: HTMLElement = document.createElement(params.tag);
  if (params.classes) {
    elem.classList.add(...params.classes);
  }
  if (params.content) {
    elem.innerHTML = params.content;
  }
  return elem;
}

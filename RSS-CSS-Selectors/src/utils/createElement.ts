export default function (tag: string, classes?: string[]): HTMLElement {
  const elem: HTMLElement = document.createElement(tag);
  if (classes) {
    elem.classList.add(...classes);
  }
  return elem;
}

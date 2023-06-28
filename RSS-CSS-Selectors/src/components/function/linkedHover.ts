export default (event: MouseEvent): void => {
  const foo =
    event.type === 'mouseout' ? (el: Element) => el.classList.remove('hovered') : (el: Element) => el.classList.add('hovered');

  const target = event.target;
  if (target instanceof HTMLElement) {
    const closest = target.closest('[data-object]');
    if (closest instanceof HTMLElement) {
      const object = closest.dataset.object;
      const num = closest.dataset.num;
      const num1 = closest.dataset.num1;
      const elements = document.querySelectorAll(`[data-object="${object}"][data-num="${num}"][data-num1="${num1}"]`);
      elements.forEach(foo);
    }
  }
};

import './demo.scss';
import createElement from '../../../../utils/createElement';
import htmlToElement from '../../../../utils/htmlToElement';
import { Elements, IParsedElem, ParsedElementsArray } from '../../../../types/types';
import rackImg from '../../../../assets/rack.svg';
import potImg from '../../../../assets/pot.svg';
import chamomileImg from '../../../../assets/chamomile.svg';
import tulipImg from '../../../../assets/tulip.svg';
import { CURRENT_LEVEL } from '../../../../data/constants';
import linkedHover from '../../../function/linkedHover';

export default class Editor {
  public draw(): HTMLElement {
    const demoEl: HTMLElement = createElement({ tag: 'section', classes: ['demo'] });
    const shelfEl: HTMLElement = this.drawShelf();

    demoEl.append(shelfEl);
    return demoEl;
  }

  private drawShelf(): HTMLElement {
    const shelfTemplate: string = `<div class="shelf">
        <div class="shelf__wall-left"></div>
        <div class="shelf__wrapper">
          <div class="shelf__base"></div>
        </div>
        <div class="shelf__wall-right"></div>
      </div>
    `;
    const shelfEl: HTMLElement = htmlToElement(shelfTemplate);
    shelfEl.querySelector('.shelf__wrapper')?.prepend(this.drowInner());
    return shelfEl;
  }

  private drowInner(): HTMLElement {
    const innerEl: HTMLElement = createElement({ tag: 'div', classes: ['shelf__inner'] });
    const elArr: ParsedElementsArray = CURRENT_LEVEL.getMap();
    innerEl.append(this.parseArrayToElements(elArr));

    // linked hover
    innerEl.addEventListener('mouseover', linkedHover);
    innerEl.addEventListener('mouseout', linkedHover);

    return innerEl;
  }

  private createDemoElem(isBlock: boolean, obj: IParsedElem, num: number): HTMLElement {
    const imgs = {
      [Elements.rack]: rackImg,
      [Elements.pot]: potImg,
      [Elements.chamomile]: chamomileImg,
      [Elements.tulip]: tulipImg,
    };
    const { tag, classes, isTarget, id } = obj as IParsedElem;
    const elem = createElement({ tag, classes });
    const classStr = classes?.length === 0 ? '' : ` class="${classes}"`;
    const idStr = !id ? '' : ` id="${id}"`;
    if (isTarget) {
      elem.classList.add('target');
    }
    if (id) {
      elem.classList.add(`${id}`);
    }
    elem.innerHTML = imgs[tag];
    elem.dataset.num = `${num}`;
    elem.dataset.tag = isBlock ? `<${tag}${idStr}${classStr}> ... </${tag}>` : `<${tag}${idStr}${classStr} />`;
    return elem;
  }

  private parseArrayToElements(obj: ParsedElementsArray, isColumn: boolean = false, num: number = 0): HTMLElement {
    const elClass: string = isColumn ? 'col-wrapper' : 'row-wrapper';
    const res: HTMLElement = createElement({ tag: 'div', classes: [elClass] });
    if (!Array.isArray(obj)) {
      const elem = this.createDemoElem(false, obj, num);
      elem.dataset.object = `${JSON.stringify(obj).split('"').join('')}`;
      res.append(elem);
      return res;
    }
    if (!Array.isArray(obj[0]) && Array.isArray(obj[1])) {
      const elem = this.createDemoElem(true, obj[0], num);
      const inner = this.parseArrayToElements(obj[1] as ParsedElementsArray, !isColumn, num);
      elem.dataset.object = `${JSON.stringify(obj).split('"').join('')}`;
      res.append(elem, inner);
      return res;
    }
    obj.forEach((el, i) => {
      const someBigNum = 1994;
      const numEl = num + someBigNum + i;
      const elem = this.parseArrayToElements(el as ParsedElementsArray, !isColumn, numEl);
      if (elem.firstChild instanceof HTMLElement) {
        elem.firstChild.dataset.num1 = `${i}`;
      }
      res.append(elem);
    });
    return res;
  }
}

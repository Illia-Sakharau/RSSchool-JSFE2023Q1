import './demo.scss';
import createElement from '../../../../utils/createElement';
import htmlToElement from '../../../../utils/htmlToElement';
import { Elements, IParsedElem, ParsedElementsArray } from '../../../../types/types';
import rackImg from '../../../../assets/rack.svg';
import potImg from '../../../../assets/pot.svg';
import chamomileImg from '../../../../assets/chamomile.svg';
import tulipImg from '../../../../assets/tulip.svg';
import { CURRENT_LEVEL_INFO } from '../../../../data/constants';

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
    const elArr: ParsedElementsArray = CURRENT_LEVEL_INFO.map;
    const imgs = {
      [Elements.rack]: rackImg,
      [Elements.pot]: potImg,
      [Elements.chamomile]: chamomileImg,
      [Elements.tulip]: tulipImg,
    };

    const elemArr: HTMLElement[] = [];
    console.error('удалить массив если он не понадабится');

    function parseArrayToElements(obj: ParsedElementsArray, isColunm: boolean = false, colNum: number = 0): HTMLElement {
      const elClass: string = isColunm ? 'col-wrapper' : 'row-wrapper';
      const res: HTMLElement = createElement({ tag: 'div', classes: [elClass] });
      if (!Array.isArray(obj)) {
        const { tag, classes, target } = obj as IParsedElem;
        const elem = createElement({ tag: tag, classes: classes });
        if (target) {
          elem.classList.add('target');
        }
        elem.innerHTML = imgs[tag];
        elem.dataset.tagName = `${tag}`;
        elem.dataset.colNum = `${colNum}`;
        res.append(elem);
        return res;
      }
      if (!Array.isArray(obj[0]) && Array.isArray(obj[1])) {
        const { tag, classes, target } = obj[0] as IParsedElem;
        const elem = createElement({ tag: tag, classes: classes });
        const inner = parseArrayToElements(obj[1] as ParsedElementsArray, !isColunm, colNum + 1);
        if (target) {
          elem.classList.add('target');
        }
        elem.innerHTML = imgs[tag];
        elem.dataset.tagName = `${tag}`;
        elem.dataset.colNum = `${colNum}`;
        res.append(elem, inner);
        return res;
      }
      obj.forEach((el, i) => {
        const elem = parseArrayToElements(el as ParsedElementsArray, !isColunm, colNum + 1);
        if (elem.firstChild instanceof HTMLElement) {
          elem.firstChild.dataset.rowNum = `${i}`;
          elemArr.push(elem.firstChild);
        }
        res.append(elem);
      });
      return res;
    }

    innerEl.append(parseArrayToElements(elArr));
    console.log(elemArr);

    return innerEl;
  }
}

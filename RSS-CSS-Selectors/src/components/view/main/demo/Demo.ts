import './demo.scss';
import createElement from '../../../../utils/createElement';
import htmlToElement from '../../../../utils/htmlToElement';
import { Elements, ParsedElementsArray } from '../../../../types/types';
import rackImg from '../../../../assets/rack.svg';
import potImg from '../../../../assets/pot.svg';
import chamomileImg from '../../../../assets/chamomile.svg';
import tulipImg from '../../../../assets/tulip.svg';
import parserMapToArray from '../../../parser/parser';
import levels from '../../../../data/levels';

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
          ${this.drowInner().innerHTML}
          <div class="shelf__base"></div>
        </div>
        <div class="shelf__wall-right"></div>
      </div>
    `;
    const shelfEl: HTMLElement = htmlToElement(shelfTemplate);
    return shelfEl;
  }

  private drowInner(): HTMLElement {
    const innerEl: HTMLElement = createElement({ tag: 'div', classes: ['shelf__inner'] });
    const elArr: ParsedElementsArray = parserMapToArray(levels[0].htmlMap);

    function parseArrayToElements(arr: ParsedElementsArray, isColunm: boolean = false): HTMLElement {
      const imgs = {
        [Elements.rack]: rackImg,
        [Elements.pot]: potImg,
        [Elements.chamomile]: chamomileImg,
        [Elements.tulip]: tulipImg,
      };
      const elClass: string = isColunm ? 'col-wrapper' : 'row-wrapper';
      const el = createElement({ tag: 'div', classes: [elClass] });
      arr.reduce((acc, obj) => {
        let subEl: HTMLElement;
        if (Array.isArray(obj)) {
          subEl = parseArrayToElements(obj, !isColunm);
        } else {
          subEl = createElement({ tag: obj.tag, classes: obj.classes });
          if (obj.target) {
            subEl.classList.add('target');
          }
          subEl.innerHTML = imgs[obj.tag];
        }
        el.append(subEl);
        return el;
      }, el);
      return el;
    }

    innerEl.append(parseArrayToElements(elArr));

    return innerEl;
  }
}

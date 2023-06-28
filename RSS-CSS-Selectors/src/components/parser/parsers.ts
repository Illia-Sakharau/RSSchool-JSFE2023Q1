import { Elements, IParsedElem, ParsedElementsArray } from '../../types/types';
import createElement from '../../utils/createElement';
import htmlToElement from '../../utils/htmlToElement';

export function parserMapToArray(map: string): ParsedElementsArray {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(map, 'text/xml');

  function travers(child: Element): ParsedElementsArray {
    if (child.children.length === 0) {
      const tag = child.tagName as Elements;
      const classes = [...child.classList];
      const target = child.attributes.getNamedItem('data-target') ? true : false;

      return [{ tag: tag, classes: classes, target: target }];
    }
    const arr: ParsedElementsArray = [];
    for (let i = 0; i < child.children.length; i++) {
      if (child.children[i].children.length !== 0) {
        const subArr: ParsedElementsArray = [];

        const tag = child.children[i].tagName as Elements;
        const classes = [...child.children[i].classList];
        const target = child.children[i].attributes.getNamedItem('data-target') ? true : false;

        subArr.push({ tag: tag, classes: classes, target: target });
        subArr.push(travers(child.children[i]));
        arr.push(subArr);
      } else {
        arr.push(...travers(child.children[i]));
      }
    }
    return arr;
  }

  return travers(xmlDoc.children[0]);
}

export function parserArrayToHTMLeditor(arrMap: ParsedElementsArray): { prepareCode: HTMLElement; elemArr: HTMLElement[] } {
  const elemArr: HTMLElement[] = [];
  console.error('удалить массив если он не понадабится');
  const prepareCode: HTMLElement = travers(arrMap);

  function createLine(isCloses: boolean, isBlock: boolean, obj: IParsedElem, padding: number): string {
    const { tag, classes } = obj;
    const tagStr = `${isCloses ? '/' : ''}<span class="tag">${tag}</span>`;
    const classesStr = classes?.length === 0 ? '' : `<span class="classes"> class="${classes}"</span>`;
    const oneTag = !isBlock && !isCloses ? ' /' : '';
    const template = `<div class="line" data-padding="${padding}">
        &lt;${tagStr}${classesStr}${oneTag}&gt;
      </div>
      `;
    return template;
  }

  function travers(obj: ParsedElementsArray, padding: number = 0): HTMLElement {
    const res: HTMLElement = createElement({ tag: 'div' });
    if (!Array.isArray(obj)) {
      const { tag } = obj;
      const elem = htmlToElement(createLine(false, false, obj, padding));
      res.append(elem);
      res.dataset.tagName = `${tag}`;
      res.dataset.colNum = `${padding}`;
      return res;
    }
    if (!Array.isArray(obj[0]) && Array.isArray(obj[1])) {
      const { tag } = obj[0];
      const first = htmlToElement(createLine(false, true, obj[0], padding));
      const last = htmlToElement(createLine(true, true, obj[0], padding));
      const inner = travers(obj[1] as ParsedElementsArray, padding + 1);
      res.append(first, inner, last);
      res.dataset.tagName = `${tag}`;
      res.dataset.colNum = `${padding}`;
      return res;
    }
    obj.forEach((el, i) => {
      const elem = travers(el as ParsedElementsArray, padding + 1);
      elem.dataset.rowNum = `${i}`;
      elemArr.push(elem);
      res.append(elem);
    });
    return res;
  }
  return { prepareCode, elemArr };
}

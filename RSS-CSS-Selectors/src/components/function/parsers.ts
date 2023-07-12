import { Elements, IlineParams, ParsedElementsArray } from '../../types/types';
import createElement from '../../utils/createElement';
import htmlToElement from '../../utils/htmlToElement';

export function parserMapToArray(map: string): ParsedElementsArray {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(map, 'text/xml');
  return mapTraverser(xmlDoc.children[0]);
}

function mapTraverser(child: Element): ParsedElementsArray {
  const arr: ParsedElementsArray = [];
  if (child.children.length === 0) {
    const tag = child.tagName as Elements;
    const classes = [...child.classList];
    const id = child.id;
    const isTarget = child.attributes.getNamedItem('data-target') ? true : false;

    return [{ tag, classes, isTarget, id }];
  }
  Array.from(child.children).forEach((subChild) => {
    if (subChild.children.length !== 0) {
      const subArr: ParsedElementsArray = [];

      const tag = subChild.tagName as Elements;
      const classes = [...subChild.classList];
      const id = subChild.id;
      const isTarget = subChild.attributes.getNamedItem('data-target') ? true : false;

      subArr.push({ tag, classes, isTarget, id });
      subArr.push(mapTraverser(subChild));
      arr.push(subArr);
    } else {
      arr.push(...mapTraverser(subChild));
    }
  });
  return arr;
}

export function parserArrayToHTMLeditor(arrMap: ParsedElementsArray): HTMLElement {
  const prepareCode: HTMLElement = arrayTraverser(arrMap);
  prepareCode.prepend(htmlToElement(`<div class="line">&lt;shelf&gt</div>`));
  prepareCode.append(htmlToElement(`<div class="line">&lt;/shelf&gt</div>`));
  return prepareCode;
}

function createLine(lineParams: IlineParams): string {
  const { isClosed, isBlock, obj, padding } = lineParams;
  const { tag, classes, id } = obj;
  const tagStr = `${isClosed ? '/' : ''}<span class="tag">${tag}</span>`;
  const classesStr = classes?.length !== 0 && !isClosed ? `<span class="classes"> class="${classes}"</span>` : '';
  const idStr = id && !isClosed ? `<span class="id"> id="${id}"</span>` : '';
  const oneTag = !isBlock && !isClosed ? ' /' : '';
  const template = `<div class="line" data-padding="${padding}">
      &lt;${tagStr}${classesStr}${idStr}${oneTag}&gt;
    </div>
    `;
  return template;
}

function arrayTraverser(obj: ParsedElementsArray, padding: number = 0, num: number = 0): HTMLElement {
  const res: HTMLElement = createElement({ tag: 'div' });
  if (!Array.isArray(obj)) {
    const lineParams: IlineParams = {
      obj,
      padding,
      isClosed: false,
      isBlock: false,
    };
    const elem = htmlToElement(createLine(lineParams));
    res.append(elem);
    res.dataset.object = `${JSON.stringify(obj).split('"').join('')}`;
    res.dataset.num = `${num}`;
    return res;
  }
  if (!Array.isArray(obj[0]) && Array.isArray(obj[1])) {
    const firstLineParams: IlineParams = {
      obj: obj[0],
      padding,
      isClosed: false,
      isBlock: true,
    };
    const lastLineParams: IlineParams = {
      obj: obj[0],
      padding,
      isClosed: true,
      isBlock: true,
    };
    const first = htmlToElement(createLine(firstLineParams));
    const last = htmlToElement(createLine(lastLineParams));
    const inner = arrayTraverser(obj[1] as ParsedElementsArray, padding + 1, num);
    res.append(first, inner, last);
    res.dataset.object = `${JSON.stringify(obj).split('"').join('')}`;
    res.dataset.num = `${num}`;
    return res;
  }
  obj.forEach((el, i) => {
    const someBigNum = 1994;
    const numEl = num + someBigNum + i;
    const elem = arrayTraverser(el as ParsedElementsArray, padding + 1, numEl);
    elem.dataset.num1 = `${i}`;
    res.append(elem);
  });
  return res;
}

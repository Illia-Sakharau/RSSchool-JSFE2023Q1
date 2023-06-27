import { Elements, IParsedElem, ParsedElementsArray } from '../../types/types';

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

export function parserArrayToHTMLeditor(arrMap: ParsedElementsArray): string {
  type multiLvlStrArr = (string | multiLvlStrArr)[];

  function createLine(isCloses: boolean, isBlock: boolean, obj: IParsedElem, padding: number): string {
    const { tag, classes } = obj;
    const tagStr = `${isCloses ? '/' : ''}<span class="tag">${tag}</span>`;
    const classesStr = classes?.length === 0 ? '' : `<span class="classes"> class="${classes}"</span>`;
    const openBlock = isBlock && isCloses ? '' : '<div class="block">';
    const closeBlock = isBlock && !isCloses ? '' : '</div>';
    const oneTag = !isBlock && !isCloses ? ' /' : '';
    const template = `
      ${openBlock}
      <div class="line" data-padding="${padding}">
        &lt;${tagStr}${classesStr}${oneTag}&gt;
      </div>
      ${closeBlock}
      `;
    return template;
  }

  function travers(obj: ParsedElementsArray, padding: number = 0): multiLvlStrArr {
    if (!Array.isArray(obj)) {
      return [createLine(false, false, obj, padding)];
    }
    if (!Array.isArray(obj[0]) && Array.isArray(obj[1])) {
      return [
        createLine(false, true, obj[0], padding),
        travers(obj[1] as ParsedElementsArray, padding + 1),
        createLine(true, true, obj[0], padding),
      ];
    }
    const accum: multiLvlStrArr = [];
    const result = obj.reduce((acc, el, i) => {
      acc.splice(i, 0, travers(el as ParsedElementsArray, padding + 1));
      return acc;
    }, accum) as multiLvlStrArr;
    return result;
  }

  return travers(arrMap).flat(20).join('');
}

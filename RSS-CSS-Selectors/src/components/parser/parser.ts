import { Elements, ParsedElementsArray } from '../../types/types';

export default function parserMapToArray(map: string): ParsedElementsArray {
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
        arr.push(travers(child.children[i]));
      }
    }
    return arr;
  }

  const arr = travers(xmlDoc.children[0]);

  return arr;
}

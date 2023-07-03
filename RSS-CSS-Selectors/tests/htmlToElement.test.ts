import htmlToElement from '../src/utils/htmlToElement';
import { referenceElem, template } from './_test-data';

const correctResult = referenceElem;
let createdElem: HTMLElement;
beforeEach(() => {
  createdElem = htmlToElement(template);
});

describe('Test html to element util', () => {
  test('should be defined', () => {
    expect(createdElem).toBeDefined();
  });
  test('should return value instance of HTMLElement', () => {
    expect(createdElem).toBeInstanceOf(HTMLElement);
  });
  test('should return correct answer', () => {
    expect(createdElem).toEqual(correctResult);
  });
});

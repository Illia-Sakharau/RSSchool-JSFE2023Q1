import createElement from '../src/utils/createElement';
import { elemInfo, referenceElem } from './_test-data';

const correctResult = referenceElem;
let createdElem: HTMLElement;
beforeEach(() => {
  createdElem = createElement(elemInfo);
});

describe('Test create element util', () => {
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

import { parserMapToArray } from '../src/components/function/parsers';
import { ParsedElementsArray } from '../src/types/types';
import { currentLevel } from './_test-data';

const testMap = currentLevel.htmlMap;
const correctResult = currentLevel.map;
let parsedMap: ParsedElementsArray;
beforeEach(() => {
  parsedMap = parserMapToArray(testMap);
});

describe('Test parser html map to array', () => {
  test('should be defined', () => {
    expect(parsedMap).toBeDefined();
  });
  test('should return value instance of array', () => {
    expect(parsedMap).toBeInstanceOf(Array);
  });
  test('should return answer with correct length', () => {
    expect(parsedMap).toHaveLength(correctResult.length);
  });
  test('should return correct answer', () => {
    expect(parsedMap).toEqual(correctResult);
  });
});

import { parserArrayToHTMLeditor } from '../src/components/function/parsers';
import { currentLevel } from './_test-data';

const testArrayMap = currentLevel.map;

let createHTMLViewerCode: HTMLElement;
beforeEach(() => {
  createHTMLViewerCode = parserArrayToHTMLeditor(testArrayMap);
});

describe('Test parser array map to html element viewer HTML code', () => {
  test('should be defined', () => {
    expect(createHTMLViewerCode).toBeDefined();
  });
  test('should return value instance of HTMLElement', () => {
    expect(createHTMLViewerCode).toBeInstanceOf(HTMLElement);
  });
  test('should return correct answer', () => {
    expect(createHTMLViewerCode).toMatchSnapshot();
  });
});

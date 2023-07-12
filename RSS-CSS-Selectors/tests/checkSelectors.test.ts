import isCorrectSelector from '../src/components/function/isCorrectSelector';
import { currentLevel } from './_test-data';

describe('Test check selectors function - correct/uncorrect selectors', () => {
  let correctSelectors: boolean;
  let uncorrectSelectors: boolean;
  beforeEach(() => {
    correctSelectors = isCorrectSelector(currentLevel.htmlMap, currentLevel.answer);
    uncorrectSelectors = isCorrectSelector(currentLevel.htmlMap, 'bla');
  });
  test('should be defined', () => {
    expect(correctSelectors).toBeDefined();
    expect(uncorrectSelectors).toBeDefined();
  });
  test('should return true', () => {
    expect(correctSelectors).toBeTruthy();
  });
  test('should return false', () => {
    expect(uncorrectSelectors).toBeFalsy();
  });
});

describe('Test check selectors function - check cheating', () => {
  let alertSpy: jest.SpyInstance;
  let cheatSelectors: boolean;
  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation((str) => str);
    cheatSelectors = isCorrectSelector(currentLevel.htmlMap, '[data-target="true"]');
  });
  afterEach(() => {
    alertSpy.mockRestore();
  });

  test('should be defined', () => {
    expect(cheatSelectors).toBeDefined();
  });
  test('should return false', () => {
    expect(cheatSelectors).toBeFalsy();
  });
  test('should processing cheat selector', () => {
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(`Don't cheat, please!`);
  });
});

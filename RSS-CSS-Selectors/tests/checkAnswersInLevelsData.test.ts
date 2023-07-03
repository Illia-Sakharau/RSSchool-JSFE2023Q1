import checkSelectors from '../src/components/function/checkSelectors';
import levels from '../src/data/levels';

describe('Test check answers in levels data', () => {
  levels.forEach((level, i) => {
    test(`answer should be correct - level ${i + 1} '${level.title}'`, () => {
      const isCorrect = checkSelectors(level.htmlMap, level.answer);
      expect(isCorrect).toBeTruthy();
    });
  });
});

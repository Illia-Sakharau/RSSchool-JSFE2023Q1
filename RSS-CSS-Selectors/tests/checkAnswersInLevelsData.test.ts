import isCorrectSelector from '../src/components/function/isCorrectSelector';
import levels from '../src/data/levels';

describe('Test check answers in levels data', () => {
  levels.forEach((level, i) => {
    test(`answer should be correct - level ${i + 1} '${level.title}'`, () => {
      const isCorrect = isCorrectSelector(level.htmlMap, level.answer);
      expect(isCorrect).toBeTruthy();
    });
  });
});

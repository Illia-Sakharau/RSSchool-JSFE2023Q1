import createrCurentLevel from '../src/data/createrCurentLevel';
import { ILevels } from '../src/types/types';
import { currentLevel, levels } from './_test-data';

jest.mock('../src/data/levels', () => [
  {
    title: 'Test title',
    answer: 'pot',
    selector: 'test',
    linkToInfo: '#',
    htmlMap: `
        <shelf>
          <rack></rack>
          <pot data-target="true"></pot>
          <chamomile></chamomile>
          <tulip></tulip>
        </shelf>
      `,
  },
]);
const createdLevel = new createrCurentLevel(currentLevel.currentLevel);

describe('Test create current level', () => {
  test('should be defined', () => {
    expect(createdLevel).toBeDefined();
  });
  test('should return current level', () => {
    expect(createdLevel.getLevel()).toEqual(currentLevel.currentLevel);
  });
  test('should return title', () => {
    expect(createdLevel.getTitle()).toEqual(currentLevel.title);
  });
  test('should return map', () => {
    expect(createdLevel.getMap()).toEqual(currentLevel.map);
  });
  test('should return answer', () => {
    expect(createdLevel.getAnswer()).toEqual(currentLevel.answer);
  });
  test('should return selector', () => {
    expect(createdLevel.getSelector()).toEqual(currentLevel.selector);
  });
  test('should return linkToInfo', () => {
    expect(createdLevel.getLinkToInfo()).toEqual(currentLevel.linkToInfo);
  });

  test('should return correct answer', () => {
    expect(createdLevel.getHtmlMap()).toMatchSnapshot();
  });
  test('should return correct answer', () => {
    expect(createdLevel.getAllInfo()).toMatchSnapshot();
  });
});

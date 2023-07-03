import Aside from '../src/components/view/main/aside/Aside';

jest.mock('../src/data/levels', () => {
  return [{}, {}, {}];
});
jest.mock('../src/data/constants', () => {
  return {
    CURRENT_LEVEL: {
      getLevel: () => 1,
    },
    LEVELS_STATES: ['completed_help', null, 'completed'],
  };
});
jest.mock('../src/components/view/main/aside/aside.scss', () => ({}));

const aside = new Aside();
const asideElement = aside.draw();

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Test drow aside', () => {
  test('should return correct answer', () => {
    expect(asideElement).toBeDefined();
  });
  test('should create 3 level buttons', () => {
    expect(asideElement.querySelectorAll('.level-btn')).toHaveLength(3);
  });
  test('should create 1 level button as completed with helper', () => {
    expect(asideElement.querySelector('.completed_help')?.textContent).toEqual('Level 1');
  });
  test('should create 2 level button as active', () => {
    expect(asideElement.querySelector('.active')?.textContent).toEqual('Level 2');
  });
  test('should create 3 level button as completed', () => {
    expect(asideElement.querySelector('.completed')?.textContent).toEqual('Level 3');
  });
  test('should return aside', () => {
    expect(asideElement).toMatchSnapshot();
  });
});

import Header from '../src/components/view/header/Header';

jest.mock('../src/data/constants', () => {
  return {
    CURRENT_LEVEL: {
      getLevel: () => 0,
      getTitle: () => 'Test title',
    },
  };
});
jest.mock('../src/components/view/header/header.scss', () => ({}));
jest.mock('../src/assets/logo.svg', () => 'logo.svg');
const header = new Header();

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Test drow header', () => {
  test('should return correct answer', () => {
    expect(header.draw()).toBeDefined();
  });
  test('should return header', () => {
    expect(header.draw()).toMatchSnapshot();
  });
});

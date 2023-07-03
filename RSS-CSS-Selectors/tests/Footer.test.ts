import Footer from '../src/components/view/footer/Footer';

jest.mock('../src/components/view/footer/footer.scss', () => ({}));
jest.mock('../src/assets/github.svg', () => 'github.svg');
jest.mock('../src/assets/rsslogo.svg', () => 'rsslogo.svg');
const footer = new Footer();

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Test drow footer', () => {
  test('should return correct answer', () => {
    expect(footer.draw()).toBeDefined();
  });
  test('should return footer', () => {
    expect(footer.draw()).toMatchSnapshot();
  });
});

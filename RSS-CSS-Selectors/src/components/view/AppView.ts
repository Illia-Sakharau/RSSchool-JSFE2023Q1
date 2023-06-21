import Header from './header/Header';

export default class AppView {
  private body = document.querySelector('body') as HTMLBodyElement;
  private header: Header = new Header();

  public drawHeader(): void {
    this.body.appendChild(this.header.draw('Level 1:', 'сменить на данные data', () => console.log('menu')));
  }
}

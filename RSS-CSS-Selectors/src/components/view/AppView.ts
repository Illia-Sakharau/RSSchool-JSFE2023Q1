import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

export default class AppView {
  private body = document.querySelector('body') as HTMLBodyElement;
  private header: Header = new Header();
  private main: Main = new Main();
  private footer: Footer = new Footer();

  public drawHeader(): void {
    this.body.appendChild(this.header.draw('Level 1:', 'сменить на данные data', () => console.log('menu')));
    this.body.appendChild(this.main.draw());
    this.body.appendChild(this.footer.draw());
  }
}

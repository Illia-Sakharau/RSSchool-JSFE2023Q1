import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

export default class AppView {
  private body = document.body;
  private header: Header = new Header();
  private main: Main = new Main();
  private footer: Footer = new Footer();

  public drawApp(): void {
    this.body.innerHTML = '';
    this.body.appendChild(this.header.draw());
    this.body.appendChild(this.main.draw());
    this.body.appendChild(this.footer.draw());
  }
}

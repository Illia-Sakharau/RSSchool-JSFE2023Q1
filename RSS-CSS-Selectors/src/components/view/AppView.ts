import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

export default class AppView {
  private body = document.body;
  private header: Header = new Header();
  private main: Main = new Main();
  private footer: Footer = new Footer();

  public drawHeader(): void {
    this.body.appendChild(this.header.draw());
  }
  public drawMain(): void {
    this.body.appendChild(this.main.draw());
  }
  public drawFooter(): void {
    this.body.appendChild(this.footer.draw());
  }
}

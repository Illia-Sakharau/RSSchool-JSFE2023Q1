import AppView from './view/AppView';

export default class App {
  private view = new AppView();

  public start(): void {
    this.view.drawApp();

    document.addEventListener('levelChanged', () => {
      this.view.drawApp();
      const closeMenu = new Event('closeMenu');
      document.dispatchEvent(closeMenu);
    });
  }
}

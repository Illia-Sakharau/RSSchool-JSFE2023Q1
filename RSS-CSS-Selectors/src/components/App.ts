import AppView from './view/AppView';

export default class App {
  private view = new AppView();

  public start(): void {
    this.view.drawApp();

    document.addEventListener('levelChanget', () => {
      this.view.drawApp();
      const event = new Event('toggleMenu');
      document.dispatchEvent(event);
    });
  }
}

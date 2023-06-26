import levels from '../data/levels';
import { parserMapToArray } from './parser/parsers';
import AppView from './view/AppView';

export default class App {
  private view = new AppView();

  public start(): void {
    this.view.drawHeader();
    this.view.drawMain();
    this.view.drawFooter();
  }
}

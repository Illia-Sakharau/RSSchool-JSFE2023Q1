import { MAP } from '../data/constants';
import levels from '../data/levels';
import parserMapToArray from './parser/parser';
import AppView from './view/AppView';

export default class App {
  private view = new AppView();

  public start(): void {
    MAP.push(parserMapToArray(levels[0].htmlMap));
    this.view.drawHeader();
    this.view.drawMain();
    this.view.drawFooter();
  }
}

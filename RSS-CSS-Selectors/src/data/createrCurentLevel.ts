import { parserMapToArray } from '../components/function/parsers';
import { ICurrentLevel } from '../types/types';
import levels from './levels';

export default class {
  private curentLvlInfo: ICurrentLevel = {
    currentLevel: 0,
    map: [],
    title: '',
    answer: '',
    htmlMap: '',
    selector: '',
    linkToInfo: '',
  };
  constructor(private currentLvl: number) {
    this.setCurentLvl(currentLvl);
  }
  public setCurentLvl(currentLvl: number) {
    this.currentLvl = currentLvl;
    this.setCurrentLvlInfo(currentLvl);
  }
  private setCurrentLvlInfo(currentLvl: number) {
    const { htmlMap, title, answer, selector, linkToInfo } = levels[currentLvl];
    this.curentLvlInfo.currentLevel = currentLvl;
    this.curentLvlInfo.map = parserMapToArray(htmlMap);
    this.curentLvlInfo.title = title;
    this.curentLvlInfo.answer = answer;
    this.curentLvlInfo.htmlMap = htmlMap;
    this.curentLvlInfo.selector = selector;
    this.curentLvlInfo.linkToInfo = linkToInfo;
    console.log(levels[currentLvl]);
  }
  public getAllInfo() {
    return this.curentLvlInfo;
  }
  public getLevel() {
    return this.curentLvlInfo.currentLevel;
  }
  public getMap() {
    return this.curentLvlInfo.map;
  }
  public getTitle() {
    return this.curentLvlInfo.title;
  }
  public getHtmlMap() {
    return this.curentLvlInfo.htmlMap;
  }
  public getAnswer() {
    return this.curentLvlInfo.answer;
  }
  public getSelector() {
    return this.curentLvlInfo.selector;
  }
  public getLinkToInfo() {
    return this.curentLvlInfo.linkToInfo;
  }
}

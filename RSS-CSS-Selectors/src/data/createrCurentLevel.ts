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
    this.curentLvlInfo.currentLevel = currentLvl;
    this.curentLvlInfo.map = parserMapToArray(levels[currentLvl].htmlMap);
    this.curentLvlInfo.title = levels[currentLvl].title;
    this.curentLvlInfo.answer = levels[currentLvl].answer;
    this.curentLvlInfo.htmlMap = levels[currentLvl].htmlMap;
    this.curentLvlInfo.selector = levels[currentLvl].selector;
    this.curentLvlInfo.linkToInfo = levels[currentLvl].linkToInfo;
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
}

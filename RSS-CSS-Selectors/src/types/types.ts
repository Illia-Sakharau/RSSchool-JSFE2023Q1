export interface ILevels {
  description: string;
  html: string;
}

export interface ICreateElementParam {
  tag: string;
  classes?: string[];
  content?: string;
  id?: string;
}

export interface IParsedElem extends ICreateElementParam {
  tag: Elements;
  target: boolean;
}

// export interface IParsedElem {
//   tag: Elements;
//   classes?: string[];
//   id?: string;
// }

export type ParsedElementsArray = Array<IParsedElem | ParsedElementsArray>;

export enum Elements {
  rack = 'rack',
  pot = 'pot',
  chamomile = 'chamomile',
  tulip = 'tulip',
}

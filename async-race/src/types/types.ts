export interface ICreateElementParam {
  tag: string;
  classes?: string[];
  content?: string;
  id?: string;
}

export interface IRoute {
  path: string;
  view: () => void;
}

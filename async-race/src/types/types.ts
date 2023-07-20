export interface ICreateElementParam {
  tag: string;
  classes?: string[];
  content?: string;
  id?: string;
}

export interface IRoute {
  path: string;
  text: string;
  view: () => void;
}

export interface IButtonParams {
  priority: 'primary' | 'secondary' | 'negative' | 'positive';
  type: 'filled' | 'bordered' | 'icon';
  text?: string;
  icon?: string;
  handler: () => void;
}

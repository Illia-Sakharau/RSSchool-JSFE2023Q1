import { IRoute } from '../types/types';

export const ROUTES: IRoute[] = [
  { path: '#garage', view: () => console.log('Garage') },
  { path: '#winners', view: () => console.log('Winners') },
];

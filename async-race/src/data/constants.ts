import Garage from '../pages/garage/Garage';
import { IRoute } from '../types/types';

const PAGES_INSTANCES = {
  garage: new Garage(),
};

export const ROUTES: IRoute[] = [
  {
    path: '#garage',
    text: 'Garage',
    view: () => {
      const body = document.body;
      body.innerHTML = '';
      body.append(PAGES_INSTANCES.garage.draw());
    },
  },
  { path: '#winners', text: 'Winners', view: () => console.log('Winners') },
];

import Garage from '../pages/garage/Garage';
import Winners from '../pages/winners/Winners';
import { IRoute } from '../types/types';

const body = document.body;
const pagesInstance = {
  garage: new Garage(),
  winners: new Winners(),
};
const routes: IRoute[] = [
  {
    path: '#garage',
    text: 'Garage',
    view: () => {
      body.innerHTML = '';
      body.append(pagesInstance.garage.getGarageView());
    },
  },
  {
    path: '#winners',
    text: 'Winners',
    view: () => {
      body.innerHTML = '';
      body.append(pagesInstance.winners.getWinnersView());
    },
  },
];

const router = () => {
  const match = routes.find((potentialMatch) => potentialMatch.path === location.hash) || routes[0];
  return match.view();
};

window.addEventListener('popstate', router);

export { router };

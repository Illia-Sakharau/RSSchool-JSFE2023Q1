import Garage from '../pages/garage/Garage';
import Winners from '../pages/winners/Winners';
import { IRoute } from '../types/types';

const body = document.body;
const routes: IRoute[] = [
  {
    path: '#garage',
    text: 'Garage',
    view: () => {
      const garage = new Garage();
      body.innerHTML = '';
      body.append(garage.getGarageView());
    },
  },
  {
    path: '#winners',
    text: 'Winners',
    view: () => {
      const winners = new Winners();
      body.innerHTML = '';
      body.append(winners.getWinnersView());
    },
  },
];

const router = async () => {
  const match = routes.find((potentialMatch) => potentialMatch.path === location.hash) || routes[0];
  return match.view();
};

window.addEventListener('popstate', router);

export { router };

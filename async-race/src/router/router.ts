import { ROUTES } from '../data/constants';

const router = async () => {
  const routes = ROUTES;
  const match = routes.find((potentialMatch) => potentialMatch.path === location.hash) || routes[0];
  return match.view();
};

window.addEventListener('popstate', router);

export { router };

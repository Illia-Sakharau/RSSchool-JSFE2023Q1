import './styles/styles.scss';
import { router } from './router/router';
import { getGarageInfo, getWinnersInfo } from './api/api';

async function start() {
  const firstPage: number = 1;
  await getWinnersInfo(firstPage);
  await getGarageInfo(firstPage);
  router();
}

start();

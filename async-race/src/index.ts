import './styles/styles.scss';
import { router } from './router/router';
import { getGarageInfo } from './api/api';

async function start() {
  const firstPage: number = 1;
  await getGarageInfo(firstPage);
  router();
}

start();

import { CARS_ON_PAGE, GARAGE_PAGES_INFO } from '../data/garageInfo';
import { WINNERS_CARS_INFO, WINNERS_ON_PAGE, WINNERS_PAGES_INFO } from '../data/winnersInfo';
import { ICar, IWinners } from '../types/types';

const baseUrl = 'http://127.0.0.1:3000';
const path = {
  cars: '/garage',
  winners: '/winners',
  engine: '/engine',
};

export const getGarageInfo = async (page: number) => {
  const carsOnPageAmount = 7;
  const response = await fetch(`${baseUrl}${path.cars}?_page=${page}&_limit=${carsOnPageAmount}`);
  const data = await response.json();

  CARS_ON_PAGE.length = 0;
  CARS_ON_PAGE.push(...data);
  GARAGE_PAGES_INFO.current = page;
  GARAGE_PAGES_INFO.car_amount = Number(response.headers.get('X-Total-Count'));
  GARAGE_PAGES_INFO.page_amount = Math.ceil(Number(response.headers.get('X-Total-Count')) / carsOnPageAmount) || 1;
};

const getCarInfo = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.cars}/${id}`);
  const data = await response.json();

  return data;
};

export const getWinnersInfo = async (page: number, sort: string = 'id', order: string = 'ASC') => {
  const winnersOnPageAmount = 10;
  const response = await fetch(
    `${baseUrl}${path.winners}?_page=${page}&_limit=${winnersOnPageAmount}&_sort=${sort}&_order=${order}`,
  );
  const data = await response.json();

  WINNERS_ON_PAGE.length = 0;
  WINNERS_ON_PAGE.push(...data);
  WINNERS_PAGES_INFO.current = page;
  WINNERS_PAGES_INFO.winner_amount = Number(response.headers.get('X-Total-Count'));
  WINNERS_PAGES_INFO.page_amount = Math.ceil(Number(response.headers.get('X-Total-Count')) / winnersOnPageAmount) || 1;

  WINNERS_CARS_INFO.length = 0;
  for (let i = 0; i < WINNERS_ON_PAGE.length; i++) {
    const winnerInfo = WINNERS_ON_PAGE[i];
    const carInfo = await getCarInfo(winnerInfo.id);
    WINNERS_CARS_INFO.push(carInfo);
  }
};

export const createNewCar = async (carInfo: ICar) => {
  await fetch(`${baseUrl}${path.cars}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carInfo),
  });
  await getGarageInfo(GARAGE_PAGES_INFO.current);
};

const deleteWinner = async (id: number) => {
  await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'DELETE',
  });
  await getGarageInfo(GARAGE_PAGES_INFO.current);
};

export const deleteCar = async (id: number) => {
  await fetch(`${baseUrl}${path.cars}/${id}`, {
    method: 'DELETE',
  });
  await deleteWinner(id);
  await getWinnersInfo(1, WINNERS_PAGES_INFO.sort, WINNERS_PAGES_INFO.order);
  await getGarageInfo(GARAGE_PAGES_INFO.current);
};

export const updateCar = async (carInfo: ICar, id: number) => {
  await fetch(`${baseUrl}${path.cars}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carInfo),
  });
  await getGarageInfo(GARAGE_PAGES_INFO.current);
  await getWinnersInfo(1, WINNERS_PAGES_INFO.sort, WINNERS_PAGES_INFO.order);
};

export const startEngine = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const data = await response.json();
  return data;
};

export const driveEngine = async (id: number, controller: AbortController) => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=drive`, {
    signal: controller.signal,
    method: 'PATCH',
  });
  const data = await response.json();
  return data;
};

export const stopEngine = async (id: number) => {
  await fetch(`${baseUrl}${path.engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
};

export const getWinnerInfo = async (id: number) => {
  return fetch(`${baseUrl}${path.winners}/${id}`);
};

export const createNewWinner = async (winnerInfo: IWinners) => {
  const { current, sort, order } = WINNERS_PAGES_INFO;
  await fetch(`${baseUrl}${path.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerInfo),
  });
  await getWinnersInfo(current, sort, order);
};

export const updateWinner = async (winnerInfo: IWinners) => {
  const { current, sort, order } = WINNERS_PAGES_INFO;
  await fetch(`${baseUrl}${path.winners}/${winnerInfo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerInfo),
  });
  await getWinnersInfo(current, sort, order);
};

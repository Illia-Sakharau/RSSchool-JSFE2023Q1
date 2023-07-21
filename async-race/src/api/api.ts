import { CARS_ON_PAGE, GARAGE_PAGES_INFO } from '../data/garageInfo';

const baseUrl = 'http://127.0.0.1:3000';
const path = {
  cars: '/garage',
};

export const getGarageInfo = async (page: number) => {
  const carsOnPageAmount = 7;
  const response = await fetch(`${baseUrl}${path.cars}?_page=${page}&_limit=${carsOnPageAmount}`);
  const data = await response.json();

  CARS_ON_PAGE.length = 0;
  CARS_ON_PAGE.push(...data);
  GARAGE_PAGES_INFO.current = page;
  GARAGE_PAGES_INFO.car_amount = Number(response.headers.get('X-Total-Count'));
  GARAGE_PAGES_INFO.page_amount = Math.ceil(Number(response.headers.get('X-Total-Count')) / carsOnPageAmount);
};

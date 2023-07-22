import { ICar, IWinners } from '../types/types';

export const WINNERS_ON_PAGE: IWinners[] = [
  {
    id: 1,
    wins: 5,
    time: 10,
  },
  {
    id: 2,
    wins: 1,
    time: 1.2,
  },
  {
    id: 3,
    wins: 7,
    time: 3.4,
  },
  {
    id: 4,
    wins: 8,
    time: 8.5,
  },
];
export const WINNERS_CARS_INFO: ICar[] = [
  {
    name: '123',
    color: '#e6e6fa',
    id: 1,
  },
  {
    name: 'BMW',
    color: '#fede00',
    id: 2,
  },
  {
    name: 'Mersedes',
    color: '#6c779f',
    id: 3,
  },
  {
    name: 'Ford',
    color: '#ef3c40',
    id: 4,
  },
];
export const WINNERS_PAGES_INFO = {
  current: 1,
  page_amount: 1,
  winner_amount: 4,
};

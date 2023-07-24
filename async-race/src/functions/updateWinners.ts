import { createNewWinner, getWinnerInfo, updateWinner } from '../api/api';
import { IWinners } from '../types/types';

export function updateWinners(id: number, curentTime: number) {
  console.log('WINNER - ', id, ' curentTime: ', curentTime);
  getWinnerInfo(id)
    .then(async (resp) => {
      if (resp.status === 200) {
        const data = (await resp.json()) as IWinners;
        const { time, wins } = data;
        updateWinner({
          wins: wins + 1,
          time: Math.min(curentTime, time),
          id,
        });
        console.log(id, time, wins);
      } else {
        createNewWinner({
          wins: 1,
          time: curentTime,
          id,
        });
      }
    })
    .catch(() => {});
}

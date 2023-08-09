import { driveEngine, startEngine, stopEngine } from '../api/api';
import winnerPopup from '../components/winnerPopup/winnerPopup';
import { CARS_ON_PAGE } from '../data/garageInfo';
import { ICar, IEngine } from '../types/types';
import { updateWinners } from './updateWinners';

export class CarsControls {
  private startPoint = 8;

  private controller = new AbortController();

  private isWinner: boolean = false;

  constructor(private IDs: number[]) {}

  private carAnimation(velocity: number, distance: number, carEl: HTMLElement) {
    let compleateDistance = this.startPoint;
    const roadLenght = document.documentElement.clientWidth - 128;
    const frequency = 20;
    const deltaPX = (velocity * roadLenght * frequency) / distance;
    const timer = setInterval(() => {
      if (roadLenght < compleateDistance) {
        clearInterval(timer);
      }
      compleateDistance += deltaPX;
      if (carEl instanceof HTMLElement) {
        carEl.style.left = compleateDistance + 'px';
      }
    }, frequency);
    return timer;
  }

  public async startCars() {
    const IDs = this.IDs;
    const engines: IEngine[] = [];
    const promisesEngine = IDs.map((id) => startEngine(id));

    this.isWinner = IDs.length > 1 ? true : false;
    await Promise.all(promisesEngine).then((enginesData) => {
      engines.push(...enginesData);
    });
    this.controller = new AbortController();
    IDs.forEach((id, ind) => {
      const carEl = document.querySelector(`[data-car="${id}"]`) as HTMLElement;
      const { velocity, distance } = engines[ind];
      const time = (distance / velocity / 1000).toFixed(2);
      const carAnimation = this.carAnimation(velocity, distance, carEl);
      carEl?.classList.remove('engine-broken');
      carEl?.classList.add('drive');
      driveEngine(id, this.controller)
        .then(() => {
          if (this.isWinner) {
            const carInfo = CARS_ON_PAGE.find((car) => car.id === id) as ICar;
            document.querySelector('.garage')?.append(winnerPopup(carInfo, Number(time)));
            updateWinners(id, Number(time));
            this.isWinner = false;
          }
        })
        .catch((err) => {
          carEl?.classList.remove('drive');
          if (err.toString().includes(`Car has`)) {
            carEl?.classList.add('engine-broken');
          }
          clearInterval(carAnimation);
        });
    });
  }

  public async stopCars() {
    const IDs = this.IDs;
    this.controller.abort();
    IDs.forEach((id) => {
      const carEl = document.querySelector(`[data-car="${id}"]`);

      carEl?.classList.remove('drive', 'engine-broken');
      if (carEl instanceof HTMLElement) {
        carEl.style.left = this.startPoint + 'px';
      }
      stopEngine(id);
    });
  }
}

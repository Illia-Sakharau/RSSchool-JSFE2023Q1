import { driveEngine, startEngine, stopEngine } from '../api/api';
import { IEngine } from '../types/types';
import { updateWinners } from './updateWinners';

export class CarsControls {
  private startPoint = 8;

  private controller = new AbortController();

  private isWinner: boolean = false;

  constructor(private IDs: number[]) {}

  public async startCars() {
    const IDs = this.IDs;
    const roadLenght = document.documentElement.clientWidth - 128;
    const engines: IEngine[] = [];
    const promisesEngine = IDs.map((id) => startEngine(id));

    this.isWinner = IDs.length > 1 ? true : false;
    await Promise.all(promisesEngine).then((enginesData) => {
      engines.push(...enginesData);
    });
    this.controller = new AbortController();
    IDs.forEach((id, ind) => {
      let compleateDistance = this.startPoint;
      const { velocity, distance } = engines[ind];
      const frequency = 20;
      const carEl = document.querySelector(`[data-car="${id}"]`);
      const time = (distance / velocity / 1000).toFixed(2);
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
      carEl?.classList.remove('engine-broken');
      carEl?.classList.add('drive');
      driveEngine(id, this.controller)
        .then(() => {
          if (this.isWinner) {
            updateWinners(id, Number(time));
            this.isWinner = false;
          }
        })
        .catch((err) => {
          carEl?.classList.remove('drive');
          if (err.toString().includes(`Car has`)) {
            carEl?.classList.add('engine-broken');
          }
          clearInterval(timer);
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

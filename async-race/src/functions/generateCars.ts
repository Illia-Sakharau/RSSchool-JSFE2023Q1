import { createNewCar } from '../api/api';
import { CAR_BRANDS, CAR_MODELS } from '../data/constants';

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName(): string {
  const brand = CAR_BRANDS[getRandomIntInclusive(0, CAR_BRANDS.length - 1)];
  const model = CAR_MODELS[getRandomIntInclusive(0, CAR_MODELS.length - 1)];

  return `${brand} ${model}`;
}

function generateColor(): string {
  const R = getRandomIntInclusive(0, 255).toString(16);
  const G = getRandomIntInclusive(0, 255).toString(16);
  const B = getRandomIntInclusive(0, 255).toString(16);

  return `#${R.length == 2 ? R : '0' + R}${G.length == 2 ? G : '0' + G}${B.length == 2 ? B : '0' + B}`;
}

export default async function generateCars() {
  const howManyCars = 100;

  for (let i = 0; i < howManyCars; i++) {
    const name = generateName();
    const color = generateColor();
    await createNewCar({ name, color });
  }
}

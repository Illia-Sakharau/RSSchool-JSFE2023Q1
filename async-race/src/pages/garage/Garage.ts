import './garage.scss';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';
import createTitle from '../../components/title/title';
import createButton from '../../components/button/button';
import carPropsInput from '../../components/carPropsInput/carPropsInput';
import createCarView34 from '../../components/carView34/carView34';
import createPagination from '../../components/pagination/pagination';
import createCarCard from '../../components/carCard/carCard';
import { ICar } from '../../types/types';

export default class Garage {
  private garageView: HTMLElement = createElement({ tag: 'div', classes: ['garage'] });

  private carsOnPage: ICar[] = [
    {
      name: 'Tesla',
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
    {
      name: 'Tesla',
      color: '#e6e6fa',
      id: 5,
    },
    {
      name: 'BMW',
      color: '#fede00',
      id: 6,
    },
    {
      name: 'Mersedes',
      color: '#6c779f',
      id: 7,
    },
  ];

  private activeCar: ICar = this.carsOnPage[0];

  constructor() {
    this.draw();
  }

  private draw(): void {
    const headerEl = Header('Garage');

    const garageInner: HTMLElement = createElement({ tag: 'div', classes: ['garage__inner'] });
    const wrapper: HTMLElement = createElement({ tag: 'div', classes: ['garage__wrapper'] });
    const carSection: HTMLElement = this.createCarSection();
    const carsSection: HTMLElement = this.createCarsSection();
    const trackSection: HTMLElement = createElement({ tag: 'section', classes: ['garage__track'], content: 'TRACK' });

    this.garageView.innerHTML = '';
    wrapper.append(carSection, carsSection);
    garageInner.append(wrapper, trackSection);
    this.garageView.append(headerEl, garageInner);
  }

  private createCarSection(): HTMLElement {
    const carSection: HTMLElement = createElement({ tag: 'section', classes: ['car'] });
    const createCarSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__create'] });
    const modifyCarSubsection: HTMLElement = this.createMoifySubSection();

    const btnGeneratecars: HTMLElement = createButton({
      priority: 'secondary',
      type: 'filled',
      text: 'Generate cars',
      handler: () => {
        console.log('Generate cars');
      },
    });
    const createCarTitle: HTMLElement = createTitle('Create new car', btnGeneratecars);
    const createCarField: HTMLElement = carPropsInput({
      inputText: '',
      color: '#000000',
      btnText: 'Create',
      btnHandler: () => {
        console.log('Create');
      },
    });

    createCarSubsection.append(createCarTitle, createCarField);

    carSection.append(createCarSubsection, modifyCarSubsection);

    return carSection;
  }

  private createMoifySubSection(): HTMLElement {
    const wrapper: HTMLElement = createElement({ tag: 'div', classes: ['car__wrapper'] });
    const modifyCarSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__modify'] });
    const podiumSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__podium'] });

    const modifyCarTitle: HTMLElement = createTitle('Modify selected car');
    const modifyCarField: HTMLElement = carPropsInput({
      inputText: this.activeCar.name,
      color: this.activeCar.color,
      btnText: 'Save',
      btnHandler: () => {
        console.log(`Save ${this.activeCar.id}`);
      },
    });

    modifyCarSubsection.append(modifyCarTitle, modifyCarField);
    podiumSubsection.append(createCarView34(this.activeCar.color));
    wrapper.append(modifyCarSubsection, podiumSubsection);

    return wrapper;
  }

  private createCarsSection(): HTMLElement {
    const carsSection: HTMLElement = createElement({ tag: 'section', classes: ['cars'] });
    const pagination: HTMLElement = createPagination({
      currentPage: 1,
      pagesAmount: 29,
      prevBtnHandler: () => {
        console.log('prevBtnHandler');
      },
      nextBtnHandler: () => {
        console.log('nextBtnHandler');
      },
    });
    const titleEl: HTMLElement = createTitle(`Garage (203)`, pagination);
    const carsListEl: HTMLElement = createElement({ tag: 'div', classes: ['cars__list'] });

    this.carsOnPage.forEach((car) => {
      const isActive: boolean = this.activeCar.id === car.id ? true : false;
      carsListEl.append(createCarCard(car, isActive));
    });

    carsListEl.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLButtonElement && target.id) {
        this.activeCar = this.carsOnPage.find((car) => Number(target.id) === car.id) || this.carsOnPage[0];
        this.draw();
      }
    });

    carsSection.append(titleEl, carsListEl);
    return carsSection;
  }

  public getGarageView(): HTMLElement {
    return this.garageView;
  }
}

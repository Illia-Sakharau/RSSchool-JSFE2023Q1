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
import { CARS_ON_PAGE, GARAGE_PAGES_INFO } from '../../data/garageInfo';
import { createNewCar, deleteCar, getGarageInfo, updateCar } from '../../api/api';
import generateCars from '../../functions/generateCars';
import createTrackLine from '../../components/trackLine/trackLine';
import { CarsControls } from '../../functions/carsControls';

export default class Garage {
  private garageView: HTMLElement = createElement({ tag: 'div', classes: ['garage'] });

  private carsOnPage: ICar[] = CARS_ON_PAGE;

  private activeCar: ICar = {
    name: 'Select Car',
    color: '#FFFFFF',
    id: NaN,
  };

  private isStartedRace: boolean = false;

  private isFirst = true;

  private carsController = new CarsControls(CARS_ON_PAGE.map((car) => Number(car.id)));

  private async draw() {
    const headerEl = Header('Garage');

    const garageInner: HTMLElement = createElement({ tag: 'div', classes: ['garage__inner'] });
    const wrapper: HTMLElement = createElement({ tag: 'div', classes: ['garage__wrapper'] });
    const carSection: HTMLElement = this.createCarSection();
    const carsSection: HTMLElement = this.createCarsSection();
    const trackSection: HTMLElement = this.createTrackSection();

    if (this.isStartedRace) {
      this.carsController.stopCars();
    }
    this.carsController = new CarsControls(CARS_ON_PAGE.map((car) => Number(car.id)));

    this.garageView.innerHTML = '';
    wrapper.append(carSection, carsSection);
    garageInner.append(wrapper, trackSection);
    this.garageView.append(headerEl, garageInner);
  }

  private createCarSection(): HTMLElement {
    const carSection: HTMLElement = createElement({ tag: 'section', classes: ['car'] });
    const createCarSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__create'] });
    const modifyCarSubsection: HTMLElement = this.createModifySubSection();

    const btnGeneratecars: HTMLElement = createButton({
      priority: 'secondary',
      type: 'filled',
      text: 'Generate cars',
      handler: async () => {
        await generateCars();
        this.draw();
      },
    });
    const createCarTitle: HTMLElement = createTitle('Create new car', btnGeneratecars);
    const createCarField: HTMLElement = carPropsInput({
      inputText: '',
      color: '#000000',
      btnText: 'Create',
      btnHandler: async (carInfo: ICar) => {
        await createNewCar(carInfo);
        this.draw();
      },
    });

    createCarSubsection.append(createCarTitle, createCarField);

    carSection.append(createCarSubsection, modifyCarSubsection);

    return carSection;
  }

  private createModifySubSection(): HTMLElement {
    const wrapper: HTMLElement = createElement({ tag: 'div', classes: ['car__wrapper'] });
    const modifyCarSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__modify'] });
    const podiumSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__podium'] });

    const modifyCarTitle: HTMLElement = createTitle('Modify selected car');
    const modifyCarField: HTMLElement = carPropsInput({
      inputText: this.activeCar.name,
      color: this.activeCar.color,
      btnText: 'Save',
      btnHandler: async (carInfo: ICar) => {
        this.activeCar.name = carInfo.name;
        this.activeCar.color = carInfo.color;
        await updateCar(carInfo, Number(this.activeCar.id));
        this.draw();
      },
    });

    modifyCarSubsection.append(modifyCarTitle, modifyCarField);
    if (Number.isNaN(this.activeCar.id)) {
      const elems = [];
      elems.push(...modifyCarField.querySelectorAll('input'));
      elems.push(...modifyCarField.querySelectorAll('button'));
      elems.forEach((el) => (el.disabled = true));
      wrapper.append(modifyCarSubsection);
    } else {
      podiumSubsection.append(createCarView34(this.activeCar.color));
      wrapper.append(modifyCarSubsection, podiumSubsection);
    }

    const colorPicker = modifyCarField.querySelector('.propsInput__color');
    const filter = podiumSubsection.querySelector('svg');
    if (colorPicker instanceof HTMLInputElement && filter) {
      colorPicker.addEventListener('input', () => {
        filter.style.fill = colorPicker.value;
      });
    }

    return wrapper;
  }

  private createCarsSection(): HTMLElement {
    const carsSection: HTMLElement = createElement({ tag: 'section', classes: ['cars'] });
    const pagination: HTMLElement = createPagination({
      currentPage: GARAGE_PAGES_INFO.current,
      pagesAmount: GARAGE_PAGES_INFO.page_amount,
      prevBtnHandler: async () => {
        await getGarageInfo(GARAGE_PAGES_INFO.current - 1);
        this.draw();
      },
      nextBtnHandler: async () => {
        await getGarageInfo(GARAGE_PAGES_INFO.current + 1);
        this.draw();
      },
    });
    const titleEl: HTMLElement = createTitle(`Garage (${GARAGE_PAGES_INFO.car_amount})`, pagination);
    const carsListEl: HTMLElement = createElement({ tag: 'div', classes: ['cars__list'] });

    this.carsOnPage.forEach((car) => {
      const isActive: boolean = this.activeCar.id === car.id ? true : false;
      carsListEl.append(createCarCard(car, isActive));
    });

    carsListEl.addEventListener('click', async (event) => {
      const target = event.target;
      if (target instanceof HTMLButtonElement) {
        const carID = Number(target.closest('.car-card')?.id);
        //select car
        if (target.innerText === 'Select') {
          this.activeCar = this.carsOnPage.find((car) => carID === car.id) || this.carsOnPage[0];
          this.draw();
        }
        //remove car
        if (target.innerText === 'Remove') {
          if (this.activeCar.id === carID) {
            this.activeCar = {
              name: 'Select Car',
              color: '#FFFFFF',
              id: NaN,
            };
          }
          await deleteCar(carID);
          this.draw();
        }
      }
    });

    carsSection.append(titleEl, carsListEl);
    return carsSection;
  }

  private createTrackSection(): HTMLElement {
    const trackSection: HTMLElement = createElement({ tag: 'section', classes: ['garage__track'] });
    const trackEl: HTMLElement = createElement({ tag: 'div', classes: ['track'] });
    const buttonsWrapper: HTMLElement = createElement({ tag: 'div', classes: ['title__btn-wrapper'] });
    const trackTitle: HTMLElement = createTitle('Track', buttonsWrapper);

    const btnRace = createButton({
      priority: 'secondary',
      type: 'filled',
      text: 'Race',
      handler: async () => {
        const carBtn = document.querySelectorAll('[data-btn]');
        this.isStartedRace = true;
        carBtn.forEach((btn) => {
          if (btn instanceof HTMLButtonElement) {
            btn.disabled = true;
          }
        });
        btnRace.disabled = true;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        btnReset.disabled = false;
        await this.carsController.startCars();
      },
    });
    const btnReset = createButton({
      priority: 'secondary',
      type: 'filled',
      text: 'Reset',
      handler: async () => {
        btnRace.disabled = false;
        btnReset.disabled = true;
        this.isStartedRace = false;
        await this.carsController.stopCars();
        this.draw();
      },
    });
    btnRace.dataset.btnTrack = 'race';
    btnReset.dataset.btnTrack = 'reset';
    btnReset.disabled = true;
    buttonsWrapper.append(btnRace, btnReset);
    CARS_ON_PAGE.forEach((carInfo) => {
      const trackLine = createTrackLine(carInfo);
      trackEl.append(trackLine);
    });

    trackSection.append(trackTitle, trackEl);
    return trackSection;
  }

  public getGarageView(): HTMLElement {
    if (this.isFirst) {
      this.draw();
    }
    this.isFirst = false;

    return this.garageView;
  }
}

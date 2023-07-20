import './garage.scss';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';
import createTitle from '../../components/title/title';
import createButton from '../../components/button/button';
import carPropsInput from '../../components/carPropsInput/carPropsInput';
import createCarView34 from '../../components/carView34/carView34';

// import gitImg from '../../assets/arraw-left.svg';

export default class Garage {
  private garageView: HTMLElement = createElement({ tag: 'div', classes: ['garage'] });

  constructor() {
    this.draw('#FF0000');
  }

  private draw(selectedCarColor: string): void {
    const headerEl = Header('Garage');

    const garageInner: HTMLElement = createElement({ tag: 'div', classes: ['garage__inner'] });
    const wrapper: HTMLElement = createElement({ tag: 'div', classes: ['garage__wrapper'] });
    const carSection: HTMLElement = this.createCarSection(selectedCarColor);
    const carsSection: HTMLElement = createElement({ tag: 'section', classes: ['garage__cars'], content: 'CARS' });
    const trackSection: HTMLElement = createElement({ tag: 'section', classes: ['garage__track'], content: 'TRACK' });

    wrapper.append(carSection, carsSection);
    garageInner.append(wrapper, trackSection);
    this.garageView.append(headerEl, garageInner);
  }

  private createCarSection(selectedCarColor: string): HTMLElement {
    const carSection: HTMLElement = createElement({ tag: 'section', classes: ['car'] });
    const createCarSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__create'] });
    const modifyCarSubsection: HTMLElement = this.createMoifySubSection(selectedCarColor);

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

  private createMoifySubSection(carColor: string): HTMLElement {
    const wrapper: HTMLElement = createElement({ tag: 'div', classes: ['car__wrapper'] });
    const modifyCarSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__modify'] });
    const podiumSubsection: HTMLElement = createElement({ tag: 'div', classes: ['car__podium'] });

    const modifyCarTitle: HTMLElement = createTitle('Modify selected car');
    const modifyCarField: HTMLElement = carPropsInput({
      inputText: 'Dodge Charger',
      color: carColor,
      btnText: 'Save',
      btnHandler: () => {
        console.log('Save');
      },
    });

    modifyCarSubsection.append(modifyCarTitle, modifyCarField);
    podiumSubsection.append(createCarView34(carColor));
    wrapper.append(modifyCarSubsection, podiumSubsection);

    return wrapper;
  }

  public getGarageView(): HTMLElement {
    return this.garageView;
  }
}

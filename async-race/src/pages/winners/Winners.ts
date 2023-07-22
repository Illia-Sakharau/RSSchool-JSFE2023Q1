import './winners.scss';
import createElement from '../../utils/createElement';
import Header from '../../components/header/Header';
import createPagination from '../../components/pagination/pagination';
import { WINNERS_CARS_INFO, WINNERS_ON_PAGE, WINNERS_PAGES_INFO } from '../../data/winnersInfo';
import { getWinnersInfo } from '../../api/api';
import createTitle from '../../components/title/title';
import createWinnerLine from '../../components/winnerLine/winnerLine';

export default class Winners {
  private winnersView: HTMLElement = createElement({ tag: 'div', classes: ['winners'] });

  private draw() {
    const headerEl = Header('Winners');
    const innerEl: HTMLElement = this.createInnerWinners();

    this.winnersView.innerHTML = '';
    this.winnersView.append(headerEl, innerEl);
  }

  private createInnerWinners(): HTMLElement {
    const winners = WINNERS_ON_PAGE;
    const inner: HTMLElement = createElement({ tag: 'div', classes: ['winners__inner'] });
    const pagination: HTMLElement = createPagination({
      currentPage: WINNERS_PAGES_INFO.current,
      pagesAmount: WINNERS_PAGES_INFO.page_amount,
      prevBtnHandler: async () => {
        await getWinnersInfo(WINNERS_PAGES_INFO.current - 1);
        this.draw();
      },
      nextBtnHandler: async () => {
        await getWinnersInfo(WINNERS_PAGES_INFO.current + 1);
        this.draw();
      },
    });
    const titleEl: HTMLElement = createTitle(`Winners (${WINNERS_PAGES_INFO.winner_amount})`, pagination);
    const winnerslistHeaderEl: HTMLElement = this.createListHeader();
    const winnersListEl: HTMLElement = createElement({ tag: 'div', classes: ['winners__list'] });

    winners.forEach((winner, ind) => {
      const number = (WINNERS_PAGES_INFO.current - 1) * 10 + (ind + 1);
      const carInfo = WINNERS_CARS_INFO.find((car) => car.id === winner.id);
      if (carInfo) {
        const winnerLine = createWinnerLine(carInfo, winner, number);
        winnersListEl.append(winnerLine);
      }
    });

    inner.append(titleEl, winnerslistHeaderEl, winnersListEl);
    return inner;
  }

  private createListHeader() {
    const winnerslistHeaderEl: HTMLElement = createElement({ tag: 'div', classes: ['winners__list-header'] });
    const columnTitles = ['Number', 'Car', 'Name', 'Wins', 'Best-time'];

    columnTitles.forEach((title) => {
      const titleEl: HTMLElement = createElement({
        tag: 'div',
        classes: ['th', `th_${title.toLowerCase()}`],
        content: title,
      });
      winnerslistHeaderEl.append(titleEl);
    });

    return winnerslistHeaderEl;
  }

  public getWinnersView(): HTMLElement {
    this.draw();
    return this.winnersView;
  }
}

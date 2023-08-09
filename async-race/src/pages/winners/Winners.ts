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

  private sortState = {
    sort: 'id',
    order: 'ASC',
  };

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
      pagesAmount: WINNERS_PAGES_INFO.pageAmount,
      prevBtnHandler: async () => {
        await getWinnersInfo(WINNERS_PAGES_INFO.current - 1, WINNERS_PAGES_INFO.sort, WINNERS_PAGES_INFO.order);
        this.draw();
      },
      nextBtnHandler: async () => {
        await getWinnersInfo(WINNERS_PAGES_INFO.current + 1, WINNERS_PAGES_INFO.sort, WINNERS_PAGES_INFO.order);
        this.draw();
      },
    });
    const titleEl: HTMLElement = createTitle(`Winners (${WINNERS_PAGES_INFO.winnerAmount})`, pagination);
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
    const sorteredColumn = ['Wins', 'Best-time'];

    columnTitles.forEach((title) => {
      const isSortered = sorteredColumn.includes(title);
      const tag = isSortered ? 'button' : 'div';
      const titleEl: HTMLElement = createElement({
        tag,
        classes: ['th', `th_${title.toLowerCase()}`],
        content: title,
      });
      const sort = title.slice(-4).toLocaleLowerCase();
      if (WINNERS_PAGES_INFO.sort === sort) {
        titleEl.classList.add(WINNERS_PAGES_INFO.order);
      }
      if (isSortered) {
        titleEl.addEventListener('click', async () => {
          let order = 'ASC';
          if (WINNERS_PAGES_INFO.sort === sort && WINNERS_PAGES_INFO.order === 'ASC') {
            order = 'DESC';
          }
          WINNERS_PAGES_INFO.sort = sort;
          WINNERS_PAGES_INFO.order = order;
          await getWinnersInfo(WINNERS_PAGES_INFO.current, sort, order);
          this.draw();
        });
      }
      winnerslistHeaderEl.append(titleEl);
    });

    return winnerslistHeaderEl;
  }

  public getWinnersView(): HTMLElement {
    this.draw();
    return this.winnersView;
  }
}

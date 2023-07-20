import './pagination.scss';
import createElement from '../../utils/createElement';
import createButton from '../button/button';
import prevArrowImg from '../../assets/arraw-left.svg';
import nextArrowImg from '../../assets/arraw-right.svg';
import { IPaginationParams } from '../../types/types';

export default function createPagination(params: IPaginationParams): HTMLElement {
  const { currentPage, pagesAmount, prevBtnHandler, nextBtnHandler } = params;
  const pagination: HTMLElement = createElement({ tag: 'div', classes: ['pagination'] });
  const prevBtn: HTMLElement = createButton({
    priority: 'secondary',
    type: 'icon',
    icon: prevArrowImg,
    handler: prevBtnHandler,
  });
  const nextBtn: HTMLElement = createButton({
    priority: 'secondary',
    type: 'icon',
    icon: nextArrowImg,
    handler: nextBtnHandler,
  });
  const text: HTMLElement = createElement({
    tag: 'span',
    classes: ['pagination__text'],
    content: `${currentPage} / ${pagesAmount}`,
  });

  if (currentPage === 1 && prevBtn instanceof HTMLButtonElement) {
    prevBtn.disabled = true;
  }
  if (pagesAmount === currentPage && nextBtn instanceof HTMLButtonElement) {
    nextBtn.disabled = true;
  }

  pagination.append(prevBtn, text, nextBtn);

  return pagination;
}

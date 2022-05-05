import icons from '../../img/icons.svg';
import View from './view';
import { RES_PER_PAGE } from '../config';
class Pagination extends View {
  _parentEl = document.querySelector('.pagination');
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////MARKUP FUNCTION
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  _generateMarkup() {
    // console.log(this._parentEl);
    const numPage = Math.ceil(this._data.searchResults.length / RES_PER_PAGE);
    // console.log(numPage);
    const curPage = this._data.page.pageNumber;

    // console.log(curPage);
    // first page and other pages
    if (numPage > 1 && curPage === 1)
      return `
    <button class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    // first page and no other pages
    if (curPage === numPage && numPage === 1)
      return `
      `;
    // end page no other pages
    if (curPage === numPage && numPage > 1)
      return `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
    // in between pages
    if (curPage > 1 && numPage > 1 && curPage !== numPage)
      return `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////HANDLER FUNCTION
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  addHandlerPagination(handlerPlus, handlerMinus) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const click = e.target.closest('.btn--inline');
      if (!click) return;
      if (click.classList.contains('pagination__btn--next')) handlerPlus();
      if (click.classList.contains('pagination__btn--prev')) handlerMinus();
      //   console.log(click.classList.contains('pagination__btn--next'));
    });
  }
}
export default new Pagination();

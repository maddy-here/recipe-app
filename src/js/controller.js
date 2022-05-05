import 'core-js/stable';
import { async } from 'regenerator-runtime';
import icons from '../img/icons.svg';
import * as model from './model';
import recipeView from './recipeViews/recipeView';
import ResultView from './recipeViews/resultView';
import BookmarkView from './recipeViews/bookmarkView';
// import RecipeView from './recipeViews/recipeView';
import { TIMEOUT_SEC, FIRST_PAGE } from './config';
import { timeout } from './helpers';
import searchView from './recipeViews/searchView';
import PaginationView from './recipeViews/paginationView';
import resultView from './recipeViews/resultView';
import bookmarkView from './recipeViews/bookmarkView';
// import addNewRecipeView from './recipeViews/addNewRecipeView';
// API URL
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// timeout(TIMEOUT_SEC);

if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////CONTROL RECIPE FUNCTIONALITY
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Marking selected Search Result
    resultView.update(
      model.numberOfPage(model.state.searchData.page.pageNumber)
    );

    // 1) getting Recipe
    await model.getRecipe(id);

    // 2) Rendering Recipes
    recipeView.render(model.state.recipe);

    // 3) Rendering bookmarks
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////CONTROL SEARCH RESULT
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const controlSearchResult = async function () {
  try {
    model.state.searchData.page.pageNumber = FIRST_PAGE;

    // 1) getting query
    const query = searchView.getQuery();
    if (!query) return;

    ResultView.renderSpinner();
    // 2) getting search data
    await model.loadSearchResult(query);

    // 3) rendering search data
    // console.log(model.numberOfPage());
    // ResultView.render(model.state.searchData.searchResults);

    ResultView.render(
      model.numberOfPage(model.state.searchData.page.pageNumber)
    );

    // render pagination
    PaginationView.render(model.state.searchData);
    // debugger;
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////PAGINATION CONTROLLER FUNCTION
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const controlPaginationPlus = function () {
  // if (click.classList.contains('pagination__btn--next')) {
  model.state.searchData.page.pageNumber++,
    PaginationView.render(model.state.searchData);
  ResultView.render(model.numberOfPage(model.state.searchData.page.pageNumber));
  // console.log(
  //   model.state.searchData.page.pageNumber,
  //   // click.classList.contains('pagination__btn--next'),
  //   'next page'
  // );

  // this.thisPage++;
  // this.render(this._data);
  // }
  // if (click.classList.contains('pagination__btn--prev')) {
  // console.log(
  //   model.state.searchData.page.pageNumber,
  //   // click.classList.contains('pagination__btn--prev'),
  //   'back page'
  // );
  // this.render(this._data);
  // }
};

const controlPaginationMinus = function () {
  model.state.searchData.page.pageNumber--,
    PaginationView.render(model.state.searchData);
  ResultView.render(model.numberOfPage());
  // console.log(
  //   model.state.searchData.page.pageNumber,
  //   //   // click.classList.contains('pagination__btn--prev'),
  //   'back page'
  // );
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////UPDATE SERVINGS FUNCTIONALITYS
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
const controlServings = function (newServings) {
  // 1) Update Servings (in state)
  model.updateServings(newServings);

  // 2) Render In Recipe View
  recipeView.update(model.state.recipe);
};
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////CONTROL BOOKMARKING
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    // update bookmark (in state as Bookmarked)
    model.addBookmark(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
  } else {
    // update bookmark (in state as NOT bookmarked)
    model.removeBookmark(model.state.recipe.id);
    bookmarkView.render(model.state.bookmarks);
  }
  // 2) render the effect on dom
  recipeView.update(model.state.recipe);
};
const controlBookmarkRender = function () {
  bookmarkView.render(model.state.bookmarks);
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////ADDING RECIPE
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// const controlAddRecipe = function () {
//   // console.log(recipe);
// };

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////INITIALIZING APPLICATION
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const init = (function () {
  bookmarkView.addHandlerBookmarks(controlBookmarkRender);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerPagination(
    controlPaginationPlus,
    controlPaginationMinus
  );
  // addNewRecipeView.addEventHandler(controlAddRecipe);
})();

// document
//   .querySelector('.nav__btn--add-recipe')
//   .addEventListener('click', function (e) {
//     console.log(e);
//   });

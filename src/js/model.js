import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////SETTING STATE OF THE APPLICATION
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export const state = {
  recipe: {},
  searchData: {
    searchResults: [],
    query: '',
    page: {
      pageNumber: 1,
      resultPerPage: RES_PER_PAGE,
    },
  },
  bookmarks: [],
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////GETTING RECIPES
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export const getRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    if (!data) return;

    let { recipe } = data.data;
    state.recipe = {
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      title: recipe.title,
    };
    if (state.bookmarks.some(recipe => recipe.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log(err.message, 'errored accured');
  }
};
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////LOADING SEARCH RESULTS
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export const loadSearchResult = async function (query) {
  try {
    const response = await getJSON(`${API_URL}?search=${query}`);
    state.searchData.searchResults = response.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
      };
    });
  } catch (err) {
    console.log(err.message, '!!@');
  }
};
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////SETTING NUMBER OF PAGES FUNCTIONALITY
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export const numberOfPage = function (page = state.searchData.page.pageNumber) {
  state.searchData.page.pageNumber = page;
  const start = (page - 1) * RES_PER_PAGE; //0;
  const end = page * RES_PER_PAGE; //10;
  // console.log(start, end, state.searchData.searchResults);
  return state.searchData.searchResults.slice(start, end);
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////UPDATE SERVINGS FUNCTIONALITY
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    //  newQt = oldQt * newServings  / oldServings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  // console.log(state);
};
// console.log(model.state);
//   model.state.recipe.ingredients.forEach(ing => {
//     const newIng = servings / model.state.recipe.servings;
//     console.log(newIng);
//     ing.quantity *= newIng;
//     console.log(ing.quantity);
//   });
//   console.log(model.state);
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////BOOKMARKING FUNCTIONALITY
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
export const addBookmark = function (recipe) {
  // recipe.bookmarked = true;
  // if (recipe.bookmarked) state.bookmarks.push(recipe);
  // console.log('after bookmark', state.recipe);
  // // console.log(state.bookmarks);
  // add recipe as bookmarked
  if (recipe.id === state.recipe.id) recipe.bookmarked = true;

  // push bookmarked recipe to bookmarks array
  state.bookmarks.push(recipe);
  storeBookmarksInLocalStorage();
  // console.log(state.bookmarks);
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  // mark recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // delete recipe from bookmarks array
  state.bookmarks.splice(index, 1);
  storeBookmarksInLocalStorage();

  // console.log(state.bookmarks);
};

const storeBookmarksInLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

(function () {
  const getBookmarks = localStorage.getItem('bookmarks');
  if (!getBookmarks) return;
  const bookmarks = JSON.parse(getBookmarks);
  state.bookmarks = bookmarks;
})();

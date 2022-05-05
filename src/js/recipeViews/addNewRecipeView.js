import View from './view';

class AddNewRecipeView extends View {
  _overlay = document.querySelector('.overlay');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _modalClose = document.querySelector('.btn--close-modal');
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  constructor() {
    super();
  }
  addEventHandler(handler) {
    this._btnAddRecipe.addEventListener('click', function (e) {
      console.log(e.target);
      handler();
      //   this._overlay.classList.remove('hidden');
      //   this._recipeWindow.classList.remove('hidden');
    });
  }
}
export default new AddNewRecipeView();

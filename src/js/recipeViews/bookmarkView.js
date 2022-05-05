import previewView from './previewView';
import View from './view';

class BookmarkView extends View {
  _errorMessage = 'No Bookmarks yet! Find a nice recipe and bookmark it :)';
  _parentEl = document.querySelector('.bookmarks');
  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();

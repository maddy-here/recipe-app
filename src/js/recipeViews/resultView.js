import previewView from './previewView';
import View from './view';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new ResultView();

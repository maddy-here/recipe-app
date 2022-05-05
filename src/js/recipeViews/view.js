import icons from '../../img/icons.svg';

export default class View {
  message = '';
  _errorMessage = 'No recipes found for your query ! Please try again :(';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderErr();

    this._data = data;
    // console.log('parent VIEW', this._data);

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const oldElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, index) => {
      const oldEl = oldElements[index];
      if (
        !newEl.isEqualNode(oldEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        oldEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(oldEl))
        Array.from(newEl.attributes).forEach(attr => {
          oldEl.setAttribute(attr.name, attr.value);
        });
    });
  }
  _renderErr(message = this._errorMessage) {
    const err = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', err);
  }

  renderSpinner() {
    const spinner = `
                      <div class="spinner">
                        <svg>
                          <use href="${icons}#icon-loader"></use>
                        </svg>
                      </div>
              `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
}

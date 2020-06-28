const events = {
  SEARCHED_TERM_CHANGED: 'searchTermChangeEvent'
};
class Search {
  ctx = null;
  el = null;
  searchInput = null;
  searchBtn = null;


  constructor (selector, ctx) {
    this.el = document.querySelector('.' + selector)
    if (!this.el) {
      throw new Error('can\'t find element');
    }
    this.searchInput = document.querySelector('[data-searchinput]');
    if (!this.searchInput) {
      throw new Error('can\'t find search input');
    }
    this.searchBtn = document.querySelector('[data-searchbutton]');
    if (!this.searchBtn) {
      throw new Error('can\'t find search button');
    }
    this.ctx = ctx || document.body;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.searchBtn.addEventListener('click', () => {
      this.ctx.dispatchEvent(
        new CustomEvent(events.SEARCHED_TERM_CHANGED, {
          detail: this.searchTerm()
        })
      )
    })
  }

  searchTerm() {
    return this.searchInput.value;
  }
  
  show() {
    this.el.classList.remove('hide');
  }

  hide() {
    this.el.classList.add('hide');
  }
}


export { Search as default, events };

import LocalCache from '../../services/LocalCache';

const events = {
  IMAGE_FAVED: 'imageFav',
  IMAGE_UNFAVED: 'imageUnfav',
}

class FavToggle {
  el = null;
  parent = null;
  bemBlock = 'fav-toggle';
  favCssClass = `${this.bemBlock}--fav`;
  ctx = null;
  extraCSSClasses = null;
  // main image data
  _data = null;

  constructor (parent, ctx, extraCSSClasses) {
    this.extraCSSClasses = extraCSSClasses || [];
    this.parent = parent || document.body;
    this.ctx = ctx || document.body;
    this.buildHTML();
    this.setupEventListeners();
  }

  set data(imageData) {
    if(!imageData) return;
    this._data = imageData;
    this.rehydrate();
  }

  get data() {
    return this._data;
  }

  rehydrate() {
    const {id} = this._data;
    if (LocalCache.isFav(id)) {
      this.favIt();
    } else {
      this.unfavIt();
    }
  }

  buildHTML() {
    let cssClassName = this.bemBlock;

    if (this.extraCSSClasses.length) {
      cssClassName += ` ${this.extraCSSClasses.join(' ')}`;
    }

    this.el = document.createElement('button');
    this.el.classList = cssClassName;
    
    this.parent.appendChild(this.el);
  }

  setupEventListeners () {
    this.el.addEventListener('click', () => this.toggle())
  }

  toggle() {
    const {id} = this._data;
    if (LocalCache.isFav(id)) {
      LocalCache.removeItem(id);
      this.unfavIt();
      this.ctx.dispatchEvent(new CustomEvent(events.IMAGE_UNFAVED, {detail: this.data}))
    } else {
      LocalCache.addItem(this._data);
      this.favIt();
      this.ctx.dispatchEvent(new CustomEvent(events.IMAGE_FAVED, {detail: this.data}))
    }
  }

  favIt() {
    this.el.classList.add(this.favCssClass);
  }

  unfavIt() {
    this.el.classList.remove(this.favCssClass);
  }
}

export { FavToggle as default, events};

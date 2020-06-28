/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/fav-toggle/index.js":
/*!********************************************!*\
  !*** ./src/components/fav-toggle/index.js ***!
  \********************************************/
/*! exports provided: default, events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FavToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony import */ var _services_LocalCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/LocalCache */ "./src/services/LocalCache.js");

const events = {
  IMAGE_FAVED: 'imageFav',
  IMAGE_UNFAVED: 'imageUnfav'
};

class FavToggle {
  // main image data
  constructor(parent, ctx, extraCSSClasses) {
    this.el = null;
    this.parent = null;
    this.bemBlock = 'fav-toggle';
    this.favCssClass = `${this.bemBlock}--fav`;
    this.ctx = null;
    this.extraCSSClasses = null;
    this._data = null;
    this.extraCSSClasses = extraCSSClasses || [];
    this.parent = parent || document.body;
    this.ctx = ctx || document.body;
    this.buildHTML();
    this.setupEventListeners();
  }

  set data(imageData) {
    if (!imageData) return;
    this._data = imageData;
    this.rehydrate();
  }

  get data() {
    return this._data;
  }

  rehydrate() {
    const {
      id
    } = this._data;

    if (_services_LocalCache__WEBPACK_IMPORTED_MODULE_0__["default"].isFav(id)) {
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

  setupEventListeners() {
    this.el.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const {
      id
    } = this._data;

    if (_services_LocalCache__WEBPACK_IMPORTED_MODULE_0__["default"].isFav(id)) {
      _services_LocalCache__WEBPACK_IMPORTED_MODULE_0__["default"].removeItem(id);
      this.unfavIt();
      this.ctx.dispatchEvent(new CustomEvent(events.IMAGE_UNFAVED, {
        detail: this.data
      }));
    } else {
      _services_LocalCache__WEBPACK_IMPORTED_MODULE_0__["default"].addItem(this._data);
      this.favIt();
      this.ctx.dispatchEvent(new CustomEvent(events.IMAGE_FAVED, {
        detail: this.data
      }));
    }
  }

  favIt() {
    this.el.classList.add(this.favCssClass);
  }

  unfavIt() {
    this.el.classList.remove(this.favCssClass);
  }

}



/***/ }),

/***/ "./src/components/gallery-view/index.js":
/*!**********************************************!*\
  !*** ./src/components/gallery-view/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class GalleryView {
  constructor() {
    this.toggleViewBtn = null;
    this.galleryList = null;
    this.tileGalleryView = false;
    this.toggleViewBtn = document.querySelector('.toggle-gallery-view');
    this.galleryList = document.querySelector('.gallery__list');
  }

  startListening() {
    this.toggleViewBtn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.tileGalleryView = !this.tileGalleryView;

    if (this.tileGalleryView) {
      this.toggleViewBtn.style.backgroundImage = "url('./assets/tile.svg')";
      this.galleryList.classList.add('tile-view');
    } else {
      this.toggleViewBtn.style.backgroundImage = "url('./assets/list.svg')";
      this.galleryList.classList.remove('tile-view');
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (GalleryView);

/***/ }),

/***/ "./src/components/gallery/index.js":
/*!*****************************************!*\
  !*** ./src/components/gallery/index.js ***!
  \*****************************************/
/*! exports provided: default, events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
const events = {
  LOAD_MORE: 'galleryLoadMoreEvent',
  IMAGE_SELECTED: 'galleryImageSelectedEvent'
};

class Gallery {
  constructor(bemBlockSelector = 'gallery', ctx) {
    this.ctx = null;
    this.el = null;
    this.images = null;
    this.bemBlock = '';
    this.imagesContainer = null;
    this.css = {
      li: () => `${this.bemBlock}__list__item`,
      list: () => `${this.bemBlock}__list`
    };
    this.el = document.querySelector('.' + bemBlockSelector);

    if (!this.el) {
      throw new Error("Can't initialise gallery");
    }

    this.ctx = ctx || document.body;
    this.bemBlock = bemBlockSelector;
    this.imagesContainer = this.el.querySelector('.' + this.css.list());
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.el.addEventListener('click', evt => {
      if (evt.target.dataset.action === 'load-more') {
        this.ctx.dispatchEvent(new CustomEvent(events.LOAD_MORE));
      }

      if (evt.target.dataset.item === 'image') {
        this.ctx.dispatchEvent(new CustomEvent(events.IMAGE_SELECTED, {
          detail: this.images[evt.target.dataset.id]
        }));
      }
    });
  }

  render(images, flush = true) {
    const docFrag = document.createDocumentFragment();
    const imagesToRender = Object.values(images || this.images);
    const html = imagesToRender.reduce((previous, next) => {
      previous.appendChild(this.buildItemHTML(next));
      return previous;
    }, docFrag);

    if (flush) {
      this.clear();
    }

    this.imagesContainer.appendChild(html);
  }

  buildItemHTML(data) {
    const el = document.createElement('div');
    el.style.backgroundImage = `url('${data.urls.small}')`;
    el.className = this.css.li();
    el.dataset.id = data.id;
    el.dataset.item = 'image';
    return el;
  }

  load(images) {
    let _images = images;

    if (_images instanceof Array) {
      // store images in a hash map
      _images = _images.reduce((prev, next) => {
        prev[next.id] = next;
        return prev;
      }, {});
    }

    this.images = _images;
    this.render();
  }

  clear() {
    this.imagesContainer.innerHTML = '';
  }

  removeItem(item) {
    const node = document.querySelector(`[data-id='${item.id}']`);

    if (node) {
      node.remove();
    }
  }

  addItem(item) {
    this.imagesContainer.appendChild(this.buildItemHTML(item));
  }

  loadMore(images) {
    // store images in a hash map
    const _images = images.reduce((prev, next) => {
      prev[next.id] = next;
      return prev;
    }, {});

    this.images = { ...this.images,
      ..._images
    }; // append the new images

    this.render(_images, false);
  }

}



/***/ }),

/***/ "./src/components/image-modal/index.js":
/*!*********************************************!*\
  !*** ./src/components/image-modal/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fav_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fav-toggle */ "./src/components/fav-toggle/index.js");


class ImageModal {
  // main image data
  // fav toggle component parent element
  // the instance of the fav toggle component
  constructor(ctx) {
    this.ctx = null;
    this.el = null;
    this.id = '';
    this.selectors = {
      close: '[data-action-close]',
      download: '[data-action-download]',
      favourite: '#fav-toggle'
    };
    this._data = null;
    this.downloadBtn = null;
    this.closeBtn = null;
    this.favIconEl = null;
    this.favToggle = null;
    this.image = null;
    this.profile = null;
    this.name = null;
    this.el = document.querySelector('.modal');

    if (!this.el) {
      throw new Error('Can\'t find element');
    }

    this.ctx = ctx || document.body;
    this.initHeader();
    this.initBody();
    this.favIconEl = document.querySelector(this.selectors.favourite);
    this.favToggle = new _fav_toggle__WEBPACK_IMPORTED_MODULE_0__["default"](this.favIconEl, null, ['modal__action']);
    this.setupEventListeners();
  }

  set data(imageData) {
    if (!imageData) return;
    this._data = imageData;
    this.favToggle.data = imageData;
    this.rehydrate();
  }

  setupEventListeners() {
    this.closeBtn.addEventListener('click', () => {
      this.hide();
      this.ctx.dispatchEvent(new CustomEvent('modalImageClosed'));
    });
    this.downloadBtn.addEventListener('click', () => this.downloadImage());
  }

  rehydrate() {
    const {
      urls,
      user
    } = this._data;
    this.image.style.backgroundImage = `url('${urls.small}')`;
    this.profile.style.backgroundImage = `url('${user.profile_image.small}')`;
    const nameText = document.createTextNode(user.name); // clear 

    this.name.innerHTML = ''; // update

    this.name.appendChild(nameText);
  }

  initHeader() {
    this.closeBtn = document.querySelector(this.selectors.close);

    if (!this.closeBtn) {
      throw new Error('Can\'t find close button');
    }

    this.downloadBtn = document.querySelector(this.selectors.download);

    if (!this.downloadBtn) {
      throw new Error('Can\'t find download button');
    }
  }

  initBody() {
    this.image = document.querySelector('.modal__img');

    if (!this.image) {
      throw new Error('Can\'t find close image');
    }

    this.profile = document.querySelector('.modal__footer__photographer-profile-pic');

    if (!this.profile) {
      throw new Error('Can\'t find profile pic');
    }

    this.name = document.querySelector('.modal__footer__photographer-name');

    if (!this.name) {
      throw new Error('Can\'t find name');
    }
  }

  show() {
    this.el.classList.remove('hide');
  }

  hide() {
    this.el.classList.add('hide'); // if on fav # need to refresh page
  }

  downloadImage() {
    console.log('I clicked download');
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ImageModal);

/***/ }),

/***/ "./src/components/page-controller/index.js":
/*!*************************************************!*\
  !*** ./src/components/page-controller/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mocks_UnsplashService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mocks/UnsplashService */ "./src/mocks/UnsplashService/index.js");
/* harmony import */ var _gallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gallery */ "./src/components/gallery/index.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../search */ "./src/components/search/index.js");
/* harmony import */ var _image_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../image-modal */ "./src/components/image-modal/index.js");
/* harmony import */ var _fav_toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fav-toggle */ "./src/components/fav-toggle/index.js");





const gallery = new _gallery__WEBPACK_IMPORTED_MODULE_1__["default"]();
const search = new _search__WEBPACK_IMPORTED_MODULE_2__["default"]('search');
const imageModal = new _image_modal__WEBPACK_IMPORTED_MODULE_3__["default"]();
const routes = {
  HOME: 'home',
  SEARCH: 'search',
  FAVOURITES: 'favourites'
};

class PageController {
  constructor(ctx) {
    this.pageNr = 1;
    this.ctx = null;
    this.title = null;
    this.subTitle = null;
    this.loadMoreBtn = null;
    this.gallery = null;
    this.ctx = ctx || document.body;
  }

  async onSearchedTerm(evt) {
    const term = evt.detail;
    gallery.load(await _mocks_UnsplashService__WEBPACK_IMPORTED_MODULE_0__["default"].search(term));
    this.showLoadMoreBtn();
  }

  async onOnLoadMore() {
    const hash = this.getHash();
    let imageServicePropName = '';

    if (hash === routes.SEARCH) {
      imageServicePropName = 'search';
    }

    if (hash === routes.HOME) {
      imageServicePropName = 'all';
    }

    if (!imageServicePropName) {
      console.error("I don't know what to load more.");
      return;
    }

    gallery.loadMore(await _mocks_UnsplashService__WEBPACK_IMPORTED_MODULE_0__["default"][imageServicePropName](this.pageNr));
  }

  startListening() {
    this.ctx.addEventListener(_search__WEBPACK_IMPORTED_MODULE_2__["events"].SEARCHED_TERM_CHANGED, evt => this.onSearchedTerm(evt));
    this.ctx.addEventListener(_gallery__WEBPACK_IMPORTED_MODULE_1__["events"].LOAD_MORE, () => this.onOnLoadMore());
    this.ctx.addEventListener(_gallery__WEBPACK_IMPORTED_MODULE_1__["events"].IMAGE_SELECTED, evt => {
      imageModal.data = evt.detail;
      imageModal.show();

      if (this.getHash() === routes.SEARCH) {
        search.hide();
      }
    });
    this.ctx.addEventListener('modalImageClosed', () => {
      if (this.getHash() === routes.SEARCH) {
        search.show();
      }
    });
    window.addEventListener('hashchange', () => this.onHashChange()); // handling the hash on page load

    this.onHashChange();
    this.ctx.addEventListener(_fav_toggle__WEBPACK_IMPORTED_MODULE_4__["events"].IMAGE_FAVED, evt => {
      if (this.getHash() == routes.FAVOURITES) {
        const {
          detail: image
        } = evt;
        gallery.addItem(image);
      }
    });
    this.ctx.addEventListener(_fav_toggle__WEBPACK_IMPORTED_MODULE_4__["events"].IMAGE_UNFAVED, evt => {
      if (this.getHash() == routes.FAVOURITES) {
        const {
          detail: image
        } = evt;
        gallery.removeItem(image);
      }
    });
  }

  getHash() {
    return location.hash.slice(1);
  }

  reset() {
    this.pageNr = 1;
  }

  async onHashChange() {
    const hash = this.getHash();

    switch (hash) {
      default:
      case routes.HOME:
        this.reset();
        search.hide();
        this.renderTitle();
        gallery.load(await _mocks_UnsplashService__WEBPACK_IMPORTED_MODULE_0__["default"].all());
        this.showLoadMoreBtn();
        this.normalGalleryPosition();
        break;

      case routes.SEARCH:
        search.show();
        gallery.clear();
        this.reset();
        this.renderTitle();
        this.hideLoadMoreBtn();
        this.searchGalleryPosition();
        break;

      case routes.FAVOURITES:
        this.reset();
        search.hide();
        this.renderTitle();
        gallery.load(await _mocks_UnsplashService__WEBPACK_IMPORTED_MODULE_0__["default"].favourites());
        this.showLoadMoreBtn();
        this.normalGalleryPosition();
        break;
    }
  }

  renderTitle() {
    this.title = document.querySelector('.header__title');
    this.subTitle = document.querySelector('.header__sub-title');

    if (this.getHash() == routes.FAVOURITES) {
      this.title.innerText = 'Favourites';
      this.subTitle.innerText = 'my favourite photos';
    }

    if (this.getHash() == routes.HOME) {
      this.title.innerText = 'Home';
      this.subTitle.innerText = 'latest photos';
    }

    if (this.getHash() == routes.SEARCH) {
      this.title.innerText = 'Search';
      this.subTitle.innerText = '';
    }
  }

  hideLoadMoreBtn() {
    this.loadMoreBtn = document.querySelector('.gallery__see-more-btn');
    this.loadMoreBtn.classList.add('hide');
  }

  showLoadMoreBtn() {
    this.loadMoreBtn = document.querySelector('.gallery__see-more-btn');
    this.loadMoreBtn.classList.remove('hide');
  }

  searchGalleryPosition() {
    this.gallery = document.querySelector('.gallery');
    this.gallery.classList.add('--search');
  }

  normalGalleryPosition() {
    this.gallery = document.querySelector('.gallery');
    this.gallery.classList.remove('--search');
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PageController);

/***/ }),

/***/ "./src/components/search/index.js":
/*!****************************************!*\
  !*** ./src/components/search/index.js ***!
  \****************************************/
/*! exports provided: default, events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
const events = {
  SEARCHED_TERM_CHANGED: 'searchTermChangeEvent'
};

class Search {
  constructor(selector, ctx) {
    this.ctx = null;
    this.el = null;
    this.searchInput = null;
    this.searchBtn = null;
    this.el = document.querySelector('.' + selector);

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
      this.ctx.dispatchEvent(new CustomEvent(events.SEARCHED_TERM_CHANGED, {
        detail: this.searchTerm()
      }));
    });
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



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_page_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/page-controller */ "./src/components/page-controller/index.js");
/* harmony import */ var _components_gallery_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/gallery-view */ "./src/components/gallery-view/index.js");


const pageController = new _components_page_controller__WEBPACK_IMPORTED_MODULE_0__["default"]();
pageController.startListening();
const galleryView = new _components_gallery_view__WEBPACK_IMPORTED_MODULE_1__["default"]();
galleryView.startListening();

/***/ }),

/***/ "./src/mocks/UnsplashService/data.js":
/*!*******************************************!*\
  !*** ./src/mocks/UnsplashService/data.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const photoData = {
  total: 20752,
  total_pages: 2076,
  results: [{
    id: 'qO-PIF84Vxg',
    created_at: '2018-08-15T17:11:28-04:00',
    updated_at: '2020-04-14T01:01:19-04:00',
    promoted_at: '2018-08-16T04:51:50-04:00',
    width: 5184,
    height: 3456,
    color: '#D0CBE9',
    description: 'Fluffy cockapoo having the time of his life at the park',
    alt_description: 'shallow focus photography of white shih tzu puppy running on the grass',
    urls: {
      raw: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/qO-PIF84Vxg',
      html: 'https://unsplash.com/photos/qO-PIF84Vxg',
      download: 'https://unsplash.com/photos/qO-PIF84Vxg/download',
      download_location: 'https://api.unsplash.com/photos/qO-PIF84Vxg/download'
    },
    categories: [],
    likes: 601,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: 's_n3DlAm8iY',
      updated_at: '2020-03-31T09:11:28-04:00',
      username: 'joeyc',
      name: 'Joe Caione',
      first_name: 'Joe',
      last_name: 'Caione',
      twitter_username: '_JoeyC_',
      portfolio_url: 'http://behance.net/joeyc',
      bio: '\ud83c\udf55\ud83c\udfc0',
      location: 'Cleveland, OH',
      links: {
        self: 'https://api.unsplash.com/users/joeyc',
        html: 'https://unsplash.com/@joeyc',
        photos: 'https://api.unsplash.com/users/joeyc/photos',
        likes: 'https://api.unsplash.com/users/joeyc/likes',
        portfolio: 'https://api.unsplash.com/users/joeyc/portfolio',
        following: 'https://api.unsplash.com/users/joeyc/following',
        followers: 'https://api.unsplash.com/users/joeyc/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1446647338458-f976efa11db9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1446647338458-f976efa11db9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1446647338458-f976efa11db9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: '_joeyc_',
      total_collections: 0,
      total_likes: 112,
      total_photos: 16,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: 'eoqnr8ikwFE',
    created_at: '2018-09-16T22:33:41-04:00',
    updated_at: '2020-04-14T01:04:31-04:00',
    promoted_at: null,
    width: 2744,
    height: 4049,
    color: '#2B1A27',
    description: null,
    alt_description: 'short-coated brown and white puppy',
    urls: {
      raw: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/eoqnr8ikwFE',
      html: 'https://unsplash.com/photos/eoqnr8ikwFE',
      download: 'https://unsplash.com/photos/eoqnr8ikwFE/download',
      download_location: 'https://api.unsplash.com/photos/eoqnr8ikwFE/download'
    },
    categories: [],
    likes: 452,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: '1LMzZNX562k',
      updated_at: '2020-04-16T22:56:19-04:00',
      username: 'alvannee',
      name: 'Alvan Nee',
      first_name: 'Alvan',
      last_name: 'Nee',
      twitter_username: 'Alvan Nee',
      portfolio_url: null,
      bio: 'I really love unsplash\uff01\uff01\uff01\uff01\uff01',
      location: 'Shanghai, China',
      links: {
        self: 'https://api.unsplash.com/users/alvannee',
        html: 'https://unsplash.com/@alvannee',
        photos: 'https://api.unsplash.com/users/alvannee/photos',
        likes: 'https://api.unsplash.com/users/alvannee/likes',
        portfolio: 'https://api.unsplash.com/users/alvannee/portfolio',
        following: 'https://api.unsplash.com/users/alvannee/following',
        followers: 'https://api.unsplash.com/users/alvannee/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: 'alvan_nee',
      total_collections: 0,
      total_likes: 62,
      total_photos: 175,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: 'K4mSJ7kc0As',
    created_at: '2018-02-07T11:21:22-05:00',
    updated_at: '2020-04-14T01:01:18-04:00',
    promoted_at: '2018-02-08T09:29:58-05:00',
    width: 2776,
    height: 3866,
    color: '#010404',
    description: 'Toshi (black pug) wearing my pilot jacket.',
    alt_description: 'black dog wearing blue denim collar',
    urls: {
      raw: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/K4mSJ7kc0As',
      html: 'https://unsplash.com/photos/K4mSJ7kc0As',
      download: 'https://unsplash.com/photos/K4mSJ7kc0As/download',
      download_location: 'https://api.unsplash.com/photos/K4mSJ7kc0As/download'
    },
    categories: [],
    likes: 1670,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: 'mA08QQzQf8Y',
      updated_at: '2020-04-18T09:53:00-04:00',
      username: 'charlesdeluvio',
      name: 'Charles Deluvio',
      first_name: 'Charles',
      last_name: 'Deluvio',
      twitter_username: 'charlesdeluvio',
      portfolio_url: 'http://charlesdeluvio.com',
      bio: 'Graphic designer at Unsplash \ud83c\uddf5\ud83c\udded',
      location: 'Montreal',
      links: {
        self: 'https://api.unsplash.com/users/charlesdeluvio',
        html: 'https://unsplash.com/@charlesdeluvio',
        photos: 'https://api.unsplash.com/users/charlesdeluvio/photos',
        likes: 'https://api.unsplash.com/users/charlesdeluvio/likes',
        portfolio: 'https://api.unsplash.com/users/charlesdeluvio/portfolio',
        following: 'https://api.unsplash.com/users/charlesdeluvio/following',
        followers: 'https://api.unsplash.com/users/charlesdeluvio/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: null,
      total_collections: 131,
      total_likes: 4650,
      total_photos: 630,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: 'N04FIfHhv_k',
    created_at: '2019-06-20T09:30:15-04:00',
    updated_at: '2020-04-14T01:04:34-04:00',
    promoted_at: '2019-06-22T01:43:24-04:00',
    width: 6000,
    height: 4000,
    color: '#150A06',
    description: null,
    alt_description: 'black and white short coated dog',
    urls: {
      raw: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/N04FIfHhv_k',
      html: 'https://unsplash.com/photos/N04FIfHhv_k',
      download: 'https://unsplash.com/photos/N04FIfHhv_k/download',
      download_location: 'https://api.unsplash.com/photos/N04FIfHhv_k/download'
    },
    categories: [],
    likes: 153,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: '23l-A2OoQPo',
      updated_at: '2020-04-07T07:22:05-04:00',
      username: 'qrupt',
      name: 'Victor Grabarczyk',
      first_name: 'Victor',
      last_name: 'Grabarczyk',
      twitter_username: null,
      portfolio_url: null,
      bio: null,
      location: 'Estepona Spain',
      links: {
        self: 'https://api.unsplash.com/users/qrupt',
        html: 'https://unsplash.com/@qrupt',
        photos: 'https://api.unsplash.com/users/qrupt/photos',
        likes: 'https://api.unsplash.com/users/qrupt/likes',
        portfolio: 'https://api.unsplash.com/users/qrupt/portfolio',
        following: 'https://api.unsplash.com/users/qrupt/following',
        followers: 'https://api.unsplash.com/users/qrupt/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1550575359794-cb0e21c8f3f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1550575359794-cb0e21c8f3f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1550575359794-cb0e21c8f3f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: null,
      total_collections: 0,
      total_likes: 42,
      total_photos: 82,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'canine'
    }]
  }, {
    id: 'Sg3XwuEpybU',
    created_at: '2019-03-08T09:04:22-05:00',
    updated_at: '2020-04-14T01:04:34-04:00',
    promoted_at: '2019-03-11T06:12:41-04:00',
    width: 3742,
    height: 6000,
    color: '#F7FAFA',
    description: 'Happy Women\u2019s Day!',
    alt_description: 'yellow Labrador retriever biting yellow tulip flower',
    urls: {
      raw: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/Sg3XwuEpybU',
      html: 'https://unsplash.com/photos/Sg3XwuEpybU',
      download: 'https://unsplash.com/photos/Sg3XwuEpybU/download',
      download_location: 'https://api.unsplash.com/photos/Sg3XwuEpybU/download'
    },
    categories: [],
    likes: 419,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: 'y9oEVbc-NAE',
      updated_at: '2020-02-04T05:45:14-05:00',
      username: 'richardbrutyo',
      name: 'Richard Brutyo',
      first_name: 'Richard',
      last_name: 'Brutyo',
      twitter_username: null,
      portfolio_url: null,
      bio: 'instagram: richardbrutyo\r\n',
      location: 'Szeged',
      links: {
        self: 'https://api.unsplash.com/users/richardbrutyo',
        html: 'https://unsplash.com/@richardbrutyo',
        photos: 'https://api.unsplash.com/users/richardbrutyo/photos',
        likes: 'https://api.unsplash.com/users/richardbrutyo/likes',
        portfolio: 'https://api.unsplash.com/users/richardbrutyo/portfolio',
        following: 'https://api.unsplash.com/users/richardbrutyo/following',
        followers: 'https://api.unsplash.com/users/richardbrutyo/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1549929411753-5b10f8c9b0fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1549929411753-5b10f8c9b0fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1549929411753-5b10f8c9b0fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: 'richardbrutyo',
      total_collections: 0,
      total_likes: 1,
      total_photos: 20,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: 'UtrE5DcgEyg',
    created_at: '2018-12-11T17:46:12-05:00',
    updated_at: '2020-04-14T01:07:21-04:00',
    promoted_at: null,
    width: 5184,
    height: 3888,
    color: '#FBFBFC',
    description: null,
    alt_description: 'medium-coated brown dog during daytime',
    urls: {
      raw: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/UtrE5DcgEyg',
      html: 'https://unsplash.com/photos/UtrE5DcgEyg',
      download: 'https://unsplash.com/photos/UtrE5DcgEyg/download',
      download_location: 'https://api.unsplash.com/photos/UtrE5DcgEyg/download'
    },
    categories: [],
    likes: 241,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: 'fQ_5pQ17HFY',
      updated_at: '2020-04-16T14:36:47-04:00',
      username: 'jamie452',
      name: 'Jamie Street',
      first_name: 'Jamie',
      last_name: 'Street',
      twitter_username: 'JamieDotSt',
      portfolio_url: 'http://jamie.st',
      bio: 'Software engineer by day, photographer by night. Follow me on instagram @Jamie452 for more goodness.',
      location: 'Surrey, UK',
      links: {
        self: 'https://api.unsplash.com/users/jamie452',
        html: 'https://unsplash.com/@jamie452',
        photos: 'https://api.unsplash.com/users/jamie452/photos',
        likes: 'https://api.unsplash.com/users/jamie452/likes',
        portfolio: 'https://api.unsplash.com/users/jamie452/portfolio',
        following: 'https://api.unsplash.com/users/jamie452/following',
        followers: 'https://api.unsplash.com/users/jamie452/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1567713447157-130935b61064image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1567713447157-130935b61064image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1567713447157-130935b61064image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: 'jamie452',
      total_collections: 7,
      total_likes: 320,
      total_photos: 324,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: 'T-0EW-SEbsE',
    created_at: '2019-01-22T18:32:59-05:00',
    updated_at: '2020-04-14T01:05:36-04:00',
    promoted_at: '2019-01-24T06:29:28-05:00',
    width: 5784,
    height: 3861,
    color: '#352016',
    description: null,
    alt_description: 'two brown and white dogs running dirt road during daytime',
    urls: {
      raw: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/T-0EW-SEbsE',
      html: 'https://unsplash.com/photos/T-0EW-SEbsE',
      download: 'https://unsplash.com/photos/T-0EW-SEbsE/download',
      download_location: 'https://api.unsplash.com/photos/T-0EW-SEbsE/download'
    },
    categories: [],
    likes: 476,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: '1LMzZNX562k',
      updated_at: '2020-04-16T22:56:19-04:00',
      username: 'alvannee',
      name: 'Alvan Nee',
      first_name: 'Alvan',
      last_name: 'Nee',
      twitter_username: 'Alvan Nee',
      portfolio_url: null,
      bio: 'I really love unsplash\uff01\uff01\uff01\uff01\uff01',
      location: 'Shanghai, China',
      links: {
        self: 'https://api.unsplash.com/users/alvannee',
        html: 'https://unsplash.com/@alvannee',
        photos: 'https://api.unsplash.com/users/alvannee/photos',
        likes: 'https://api.unsplash.com/users/alvannee/likes',
        portfolio: 'https://api.unsplash.com/users/alvannee/portfolio',
        following: 'https://api.unsplash.com/users/alvannee/following',
        followers: 'https://api.unsplash.com/users/alvannee/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: 'alvan_nee',
      total_collections: 0,
      total_likes: 62,
      total_photos: 175,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: '1VgfQdCuX-4',
    created_at: '2019-06-16T23:54:04-04:00',
    updated_at: '2020-04-14T01:06:59-04:00',
    promoted_at: '2020-03-28T13:06:01-04:00',
    width: 1851,
    height: 2780,
    color: '#262124',
    description: null,
    alt_description: 'white and brown corgi besides brown dog',
    urls: {
      raw: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/1VgfQdCuX-4',
      html: 'https://unsplash.com/photos/1VgfQdCuX-4',
      download: 'https://unsplash.com/photos/1VgfQdCuX-4/download',
      download_location: 'https://api.unsplash.com/photos/1VgfQdCuX-4/download'
    },
    categories: [],
    likes: 207,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: '1LMzZNX562k',
      updated_at: '2020-04-16T22:56:19-04:00',
      username: 'alvannee',
      name: 'Alvan Nee',
      first_name: 'Alvan',
      last_name: 'Nee',
      twitter_username: 'Alvan Nee',
      portfolio_url: null,
      bio: 'I really love unsplash\uff01\uff01\uff01\uff01\uff01',
      location: 'Shanghai, China',
      links: {
        self: 'https://api.unsplash.com/users/alvannee',
        html: 'https://unsplash.com/@alvannee',
        photos: 'https://api.unsplash.com/users/alvannee/photos',
        likes: 'https://api.unsplash.com/users/alvannee/likes',
        portfolio: 'https://api.unsplash.com/users/alvannee/portfolio',
        following: 'https://api.unsplash.com/users/alvannee/following',
        followers: 'https://api.unsplash.com/users/alvannee/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1578964332567-ad65cf92e5d9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: 'alvan_nee',
      total_collections: 0,
      total_likes: 62,
      total_photos: 175,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: 'DziZIYOGAHc',
    created_at: '2018-01-31T13:31:36-05:00',
    updated_at: '2020-04-14T01:01:18-04:00',
    promoted_at: '2018-02-01T04:02:58-05:00',
    width: 2683,
    height: 3469,
    color: '#EA301F',
    description: 'Doggy with style. (instagram.com/toshi.dog/)',
    alt_description: 'black pug wearing striped apparel',
    urls: {
      raw: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/DziZIYOGAHc',
      html: 'https://unsplash.com/photos/DziZIYOGAHc',
      download: 'https://unsplash.com/photos/DziZIYOGAHc/download',
      download_location: 'https://api.unsplash.com/photos/DziZIYOGAHc/download'
    },
    categories: [],
    likes: 914,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: 'mA08QQzQf8Y',
      updated_at: '2020-04-18T09:53:00-04:00',
      username: 'charlesdeluvio',
      name: 'Charles Deluvio',
      first_name: 'Charles',
      last_name: 'Deluvio',
      twitter_username: 'charlesdeluvio',
      portfolio_url: 'http://charlesdeluvio.com',
      bio: 'Graphic designer at Unsplash \ud83c\uddf5\ud83c\udded',
      location: 'Montreal',
      links: {
        self: 'https://api.unsplash.com/users/charlesdeluvio',
        html: 'https://unsplash.com/@charlesdeluvio',
        photos: 'https://api.unsplash.com/users/charlesdeluvio/photos',
        likes: 'https://api.unsplash.com/users/charlesdeluvio/likes',
        portfolio: 'https://api.unsplash.com/users/charlesdeluvio/portfolio',
        following: 'https://api.unsplash.com/users/charlesdeluvio/following',
        followers: 'https://api.unsplash.com/users/charlesdeluvio/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1515694660956-9133b2f53e3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: null,
      total_collections: 131,
      total_likes: 4650,
      total_photos: 630,
      accepted_tos: true
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }, {
    id: '2s6ORaJY6gI',
    created_at: '2017-11-15T15:19:58-05:00',
    updated_at: '2020-04-14T01:04:34-04:00',
    promoted_at: null,
    width: 1362,
    height: 2421,
    color: '#F8F7F6',
    description: 'Well\u2026 I just gave the flower to my dog and he did it :D, he\u2019s a good boy and a great model. But at the end he almost ate the flower haha. And that\u2019s the picture\u2026 the flower and the dog',
    alt_description: 'dog holding flower',
    urls: {
      raw: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      full: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      regular: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      small: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0',
      thumb: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyODMwNn0'
    },
    links: {
      self: 'https://api.unsplash.com/photos/2s6ORaJY6gI',
      html: 'https://unsplash.com/photos/2s6ORaJY6gI',
      download: 'https://unsplash.com/photos/2s6ORaJY6gI/download',
      download_location: 'https://api.unsplash.com/photos/2s6ORaJY6gI/download'
    },
    categories: [],
    likes: 582,
    liked_by_user: false,
    current_user_collections: [],
    user: {
      id: 'qkLpDm1oSRw',
      updated_at: '2020-03-17T05:12:06-04:00',
      username: 'celine_sayuri',
      name: 'Celine Sayuri Tagami',
      first_name: 'Celine',
      last_name: 'Sayuri Tagami',
      twitter_username: null,
      portfolio_url: null,
      bio: null,
      location: null,
      links: {
        self: 'https://api.unsplash.com/users/celine_sayuri',
        html: 'https://unsplash.com/@celine_sayuri',
        photos: 'https://api.unsplash.com/users/celine_sayuri/photos',
        likes: 'https://api.unsplash.com/users/celine_sayuri/likes',
        portfolio: 'https://api.unsplash.com/users/celine_sayuri/portfolio',
        following: 'https://api.unsplash.com/users/celine_sayuri/following',
        followers: 'https://api.unsplash.com/users/celine_sayuri/followers'
      },
      profile_image: {
        small: 'https://images.unsplash.com/profile-1517524000936-70302b108fd5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
        medium: 'https://images.unsplash.com/profile-1517524000936-70302b108fd5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        large: 'https://images.unsplash.com/profile-1517524000936-70302b108fd5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
      },
      instagram_username: 'celine.s.t ',
      total_collections: 0,
      total_likes: 1,
      total_photos: 0,
      accepted_tos: false
    },
    tags: [{
      type: 'landing_page',
      title: 'dog',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          },
          subcategory: {
            slug: 'dog',
            pretty_slug: 'Dog'
          }
        },
        title: 'Dog Images & Pictures',
        subtitle: 'Download free dog images',
        description: "Man's best friend is something to behold in all forms: gorgeous Golden Retrievers, tiny yapping chihuahuas, fearsome pitbulls. Unsplash's community of incredible photographers has helped us curate an amazing selection of dog images that you can access and use free of charge.",
        meta_title: 'Dog Pictures | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free dog pictures. Download HD dog photos for free on Unsplash.',
        cover_photo: {
          id: 'tGBRQw52Thw',
          created_at: '2018-01-19T09:20:08-05:00',
          updated_at: '2020-03-21T01:02:44-04:00',
          promoted_at: '2018-01-20T05:59:48-05:00',
          width: 3264,
          height: 4896,
          color: '#F1F2F0',
          description: 'Dog day out',
          alt_description: 'short-coated brown dog',
          urls: {
            raw: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/tGBRQw52Thw',
            html: 'https://unsplash.com/photos/tGBRQw52Thw',
            download: 'https://unsplash.com/photos/tGBRQw52Thw/download',
            download_location: 'https://api.unsplash.com/photos/tGBRQw52Thw/download'
          },
          categories: [],
          likes: 303,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'toGyhBVt2M4',
            updated_at: '2020-03-22T21:38:14-04:00',
            username: 'fredrikohlander',
            name: 'Fredrik \u00d6hlander',
            first_name: 'Fredrik',
            last_name: '\u00d6hlander',
            twitter_username: null,
            portfolio_url: null,
            bio: 'fredrikohlander@gmail.com\r\n\r\n',
            location: 'El Stockholmo, Sweden',
            links: {
              self: 'https://api.unsplash.com/users/fredrikohlander',
              html: 'https://unsplash.com/@fredrikohlander',
              photos: 'https://api.unsplash.com/users/fredrikohlander/photos',
              likes: 'https://api.unsplash.com/users/fredrikohlander/likes',
              portfolio: 'https://api.unsplash.com/users/fredrikohlander/portfolio',
              following: 'https://api.unsplash.com/users/fredrikohlander/following',
              followers: 'https://api.unsplash.com/users/fredrikohlander/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-1530864939049-bcc82b6c41c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: 'fredrikohlander',
            total_collections: 10,
            total_likes: 37,
            total_photos: 151,
            accepted_tos: true
          }
        }
      }
    }, {
      type: 'landing_page',
      title: 'animal',
      source: {
        ancestry: {
          type: {
            slug: 'images',
            pretty_slug: 'Images'
          },
          category: {
            slug: 'animals',
            pretty_slug: 'Animals'
          }
        },
        title: 'Animals Images & Pictures',
        subtitle: 'Download free animals images',
        description: 'Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!',
        meta_title: 'Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash',
        meta_description: 'Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.',
        cover_photo: {
          id: 'YozNeHM8MaA',
          created_at: '2017-04-18T13:00:04-04:00',
          updated_at: '2020-03-21T01:03:59-04:00',
          promoted_at: '2017-04-19T13:54:55-04:00',
          width: 5184,
          height: 3456,
          color: '#120803',
          description: 'I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.',
          alt_description: 'selective focus photography of giraffe',
          urls: {
            raw: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1',
            full: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
            regular: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            small: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
            thumb: 'https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max'
          },
          links: {
            self: 'https://api.unsplash.com/photos/YozNeHM8MaA',
            html: 'https://unsplash.com/photos/YozNeHM8MaA',
            download: 'https://unsplash.com/photos/YozNeHM8MaA/download',
            download_location: 'https://api.unsplash.com/photos/YozNeHM8MaA/download'
          },
          categories: [],
          likes: 768,
          liked_by_user: false,
          current_user_collections: [],
          user: {
            id: 'J6cg9TA8-e8',
            updated_at: '2019-11-30T02:58:31-05:00',
            username: 'judahlegge',
            name: 'Judah Legge',
            first_name: 'Judah',
            last_name: 'Legge',
            twitter_username: null,
            portfolio_url: null,
            bio: null,
            location: null,
            links: {
              self: 'https://api.unsplash.com/users/judahlegge',
              html: 'https://unsplash.com/@judahlegge',
              photos: 'https://api.unsplash.com/users/judahlegge/photos',
              likes: 'https://api.unsplash.com/users/judahlegge/likes',
              portfolio: 'https://api.unsplash.com/users/judahlegge/portfolio',
              following: 'https://api.unsplash.com/users/judahlegge/following',
              followers: 'https://api.unsplash.com/users/judahlegge/followers'
            },
            profile_image: {
              small: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
              medium: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
              large: 'https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128'
            },
            instagram_username: null,
            total_collections: 0,
            total_likes: 4,
            total_photos: 1,
            accepted_tos: false
          }
        }
      }
    }, {
      type: 'search',
      title: 'pet'
    }]
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (photoData);

/***/ }),

/***/ "./src/mocks/UnsplashService/index.js":
/*!********************************************!*\
  !*** ./src/mocks/UnsplashService/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/mocks/UnsplashService/data.js");
/* harmony import */ var _services_LocalCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/LocalCache */ "./src/services/LocalCache.js");



class UnsplashService {
  static getData(pageNr = 1) {
    return new Promise((resolve, reject) => {
      resolve(_data__WEBPACK_IMPORTED_MODULE_0__["default"].results);
    });
  }

  static all(pageNr) {
    return UnsplashService.getData(pageNr);
  }

  static search(pageNr) {
    return UnsplashService.getData(pageNr);
  }

  static favourites() {
    return new Promise((resolve, reject) => {
      resolve(_services_LocalCache__WEBPACK_IMPORTED_MODULE_1__["default"].getData());
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (UnsplashService);

/***/ }),

/***/ "./src/services/LocalCache.js":
/*!************************************!*\
  !*** ./src/services/LocalCache.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const LOCALSTORAGE_KEY = 'photoAppFavourites';

class LocalCache {
  constructor() {
    this.DEFAULT_DATA = {};
  }

}

LocalCache.getData = () => {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);

  if (!data) {
    saveData(LocalCache.DEFAULT_DATA);
    return LocalCache.DEFAULT_DATA;
  }

  return JSON.parse(data);
};

LocalCache.saveData = data => localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));

LocalCache.removeItem = id => {
  const data = LocalCache.getData();
  delete data[id];
  LocalCache.saveData(data);
};

LocalCache.addItem = item => {
  const data = LocalCache.getData();
  data[item.id] = item;
  LocalCache.saveData(data);
};

LocalCache.isFav = id => Boolean(LocalCache.getData()[id]);

/* harmony default export */ __webpack_exports__["default"] = (LocalCache);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZmF2LXRvZ2dsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9nYWxsZXJ5LXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZ2FsbGVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pbWFnZS1tb2RhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlLWNvbnRyb2xsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9ja3MvVW5zcGxhc2hTZXJ2aWNlL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vY2tzL1Vuc3BsYXNoU2VydmljZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvTG9jYWxDYWNoZS5qcyJdLCJuYW1lcyI6WyJldmVudHMiLCJJTUFHRV9GQVZFRCIsIklNQUdFX1VORkFWRUQiLCJGYXZUb2dnbGUiLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsImN0eCIsImV4dHJhQ1NTQ2xhc3NlcyIsImVsIiwiYmVtQmxvY2siLCJmYXZDc3NDbGFzcyIsIl9kYXRhIiwiZG9jdW1lbnQiLCJib2R5IiwiYnVpbGRIVE1MIiwic2V0dXBFdmVudExpc3RlbmVycyIsImRhdGEiLCJpbWFnZURhdGEiLCJyZWh5ZHJhdGUiLCJpZCIsIkxvY2FsQ2FjaGUiLCJpc0ZhdiIsImZhdkl0IiwidW5mYXZJdCIsImNzc0NsYXNzTmFtZSIsImxlbmd0aCIsImpvaW4iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlIiwicmVtb3ZlSXRlbSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImFkZEl0ZW0iLCJhZGQiLCJyZW1vdmUiLCJHYWxsZXJ5VmlldyIsInRvZ2dsZVZpZXdCdG4iLCJnYWxsZXJ5TGlzdCIsInRpbGVHYWxsZXJ5VmlldyIsInF1ZXJ5U2VsZWN0b3IiLCJzdGFydExpc3RlbmluZyIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwiTE9BRF9NT1JFIiwiSU1BR0VfU0VMRUNURUQiLCJHYWxsZXJ5IiwiYmVtQmxvY2tTZWxlY3RvciIsImltYWdlcyIsImltYWdlc0NvbnRhaW5lciIsImNzcyIsImxpIiwibGlzdCIsIkVycm9yIiwiZXZ0IiwidGFyZ2V0IiwiZGF0YXNldCIsImFjdGlvbiIsIml0ZW0iLCJyZW5kZXIiLCJmbHVzaCIsImRvY0ZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiaW1hZ2VzVG9SZW5kZXIiLCJPYmplY3QiLCJ2YWx1ZXMiLCJodG1sIiwicmVkdWNlIiwicHJldmlvdXMiLCJuZXh0IiwiYnVpbGRJdGVtSFRNTCIsImNsZWFyIiwidXJscyIsInNtYWxsIiwiY2xhc3NOYW1lIiwibG9hZCIsIl9pbWFnZXMiLCJBcnJheSIsInByZXYiLCJpbm5lckhUTUwiLCJub2RlIiwibG9hZE1vcmUiLCJJbWFnZU1vZGFsIiwic2VsZWN0b3JzIiwiY2xvc2UiLCJkb3dubG9hZCIsImZhdm91cml0ZSIsImRvd25sb2FkQnRuIiwiY2xvc2VCdG4iLCJmYXZJY29uRWwiLCJmYXZUb2dnbGUiLCJpbWFnZSIsInByb2ZpbGUiLCJuYW1lIiwiaW5pdEhlYWRlciIsImluaXRCb2R5IiwiaGlkZSIsImRvd25sb2FkSW1hZ2UiLCJ1c2VyIiwicHJvZmlsZV9pbWFnZSIsIm5hbWVUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJzaG93IiwiY29uc29sZSIsImxvZyIsImdhbGxlcnkiLCJzZWFyY2giLCJTZWFyY2giLCJpbWFnZU1vZGFsIiwicm91dGVzIiwiSE9NRSIsIlNFQVJDSCIsIkZBVk9VUklURVMiLCJQYWdlQ29udHJvbGxlciIsInBhZ2VOciIsInRpdGxlIiwic3ViVGl0bGUiLCJsb2FkTW9yZUJ0biIsIm9uU2VhcmNoZWRUZXJtIiwidGVybSIsIkltYWdlU2VydmljZSIsInNob3dMb2FkTW9yZUJ0biIsIm9uT25Mb2FkTW9yZSIsImhhc2giLCJnZXRIYXNoIiwiaW1hZ2VTZXJ2aWNlUHJvcE5hbWUiLCJlcnJvciIsInNlYXJjaEV2ZW50cyIsIlNFQVJDSEVEX1RFUk1fQ0hBTkdFRCIsImdhbGxlcnlFdmVudHMiLCJ3aW5kb3ciLCJvbkhhc2hDaGFuZ2UiLCJmYXZUb2dnbGVFdmVudHMiLCJsb2NhdGlvbiIsInNsaWNlIiwicmVzZXQiLCJyZW5kZXJUaXRsZSIsImFsbCIsIm5vcm1hbEdhbGxlcnlQb3NpdGlvbiIsImhpZGVMb2FkTW9yZUJ0biIsInNlYXJjaEdhbGxlcnlQb3NpdGlvbiIsImZhdm91cml0ZXMiLCJpbm5lclRleHQiLCJzZWxlY3RvciIsInNlYXJjaElucHV0Iiwic2VhcmNoQnRuIiwic2VhcmNoVGVybSIsInZhbHVlIiwicGFnZUNvbnRyb2xsZXIiLCJnYWxsZXJ5VmlldyIsInBob3RvRGF0YSIsInRvdGFsIiwidG90YWxfcGFnZXMiLCJyZXN1bHRzIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJwcm9tb3RlZF9hdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3IiLCJkZXNjcmlwdGlvbiIsImFsdF9kZXNjcmlwdGlvbiIsInJhdyIsImZ1bGwiLCJyZWd1bGFyIiwidGh1bWIiLCJsaW5rcyIsInNlbGYiLCJkb3dubG9hZF9sb2NhdGlvbiIsImNhdGVnb3JpZXMiLCJsaWtlcyIsImxpa2VkX2J5X3VzZXIiLCJjdXJyZW50X3VzZXJfY29sbGVjdGlvbnMiLCJ1c2VybmFtZSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJ0d2l0dGVyX3VzZXJuYW1lIiwicG9ydGZvbGlvX3VybCIsImJpbyIsInBob3RvcyIsInBvcnRmb2xpbyIsImZvbGxvd2luZyIsImZvbGxvd2VycyIsIm1lZGl1bSIsImxhcmdlIiwiaW5zdGFncmFtX3VzZXJuYW1lIiwidG90YWxfY29sbGVjdGlvbnMiLCJ0b3RhbF9saWtlcyIsInRvdGFsX3Bob3RvcyIsImFjY2VwdGVkX3RvcyIsInRhZ3MiLCJ0eXBlIiwic291cmNlIiwiYW5jZXN0cnkiLCJzbHVnIiwicHJldHR5X3NsdWciLCJjYXRlZ29yeSIsInN1YmNhdGVnb3J5Iiwic3VidGl0bGUiLCJtZXRhX3RpdGxlIiwibWV0YV9kZXNjcmlwdGlvbiIsImNvdmVyX3Bob3RvIiwiVW5zcGxhc2hTZXJ2aWNlIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiTE9DQUxTVE9SQUdFX0tFWSIsIkRFRkFVTFRfREFUQSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzYXZlRGF0YSIsIkpTT04iLCJwYXJzZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJCb29sZWFuIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNB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LEdBQVd0TSxJQUFJLElBQ3BCb00sWUFBWSxDQUFDSyxPQUFiLENBQXFCUCxnQkFBckIsRUFBdUNLLElBQUksQ0FBQ0csU0FBTCxDQUFlMU0sSUFBZixDQUF2QyxDOztBQWJFSSxVLENBZUdZLFUsR0FBYWIsRUFBRSxJQUFJO0FBQ3hCLFFBQU1ILElBQUksR0FoQlJJLFVBZ0JXLENBQUswTCxPQUFMLEVBQWI7QUFDQSxTQUFPOUwsSUFBSSxDQUFDRyxFQUFELENBQVg7QUFqQkVDLFlBa0JGLENBQUtrTSxRQUFMLENBQWN0TSxJQUFkO0FBQ0QsQzs7QUFuQkdJLFUsQ0FxQkdnQixPLEdBQVV5QixJQUFJLElBQUk7QUFDdkIsUUFBTTdDLElBQUksR0F0QlJJLFVBc0JXLENBQUswTCxPQUFMLEVBQWI7QUFDQTlMLE1BQUksQ0FBQzZDLElBQUksQ0FBQzFDLEVBQU4sQ0FBSixHQUFnQjBDLElBQWhCO0FBdkJFekMsWUF3QkYsQ0FBS2tNLFFBQUwsQ0FBY3RNLElBQWQ7QUFDRCxDOztBQXpCR0ksVSxDQTJCR0MsSyxHQUFRRixFQUFFLElBQUl3TSxPQUFPLENBM0J4QnZNLFVBMkJ5QixDQUFLMEwsT0FBTCxHQUFlM0wsRUFBZixDQUFELEM7O0FBR2ZDLHlFQUFmLEUiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IExvY2FsQ2FjaGUgZnJvbSAnLi4vLi4vc2VydmljZXMvTG9jYWxDYWNoZSc7XHJcblxyXG5jb25zdCBldmVudHMgPSB7XHJcbiAgSU1BR0VfRkFWRUQ6ICdpbWFnZUZhdicsXHJcbiAgSU1BR0VfVU5GQVZFRDogJ2ltYWdlVW5mYXYnLFxyXG59XHJcblxyXG5jbGFzcyBGYXZUb2dnbGUge1xyXG4gIGVsID0gbnVsbDtcclxuICBwYXJlbnQgPSBudWxsO1xyXG4gIGJlbUJsb2NrID0gJ2Zhdi10b2dnbGUnO1xyXG4gIGZhdkNzc0NsYXNzID0gYCR7dGhpcy5iZW1CbG9ja30tLWZhdmA7XHJcbiAgY3R4ID0gbnVsbDtcclxuICBleHRyYUNTU0NsYXNzZXMgPSBudWxsO1xyXG4gIC8vIG1haW4gaW1hZ2UgZGF0YVxyXG4gIF9kYXRhID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IgKHBhcmVudCwgY3R4LCBleHRyYUNTU0NsYXNzZXMpIHtcclxuICAgIHRoaXMuZXh0cmFDU1NDbGFzc2VzID0gZXh0cmFDU1NDbGFzc2VzIHx8IFtdO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQuYm9keTtcclxuICAgIHRoaXMuY3R4ID0gY3R4IHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICB0aGlzLmJ1aWxkSFRNTCgpO1xyXG4gICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgZGF0YShpbWFnZURhdGEpIHtcclxuICAgIGlmKCFpbWFnZURhdGEpIHJldHVybjtcclxuICAgIHRoaXMuX2RhdGEgPSBpbWFnZURhdGE7XHJcbiAgICB0aGlzLnJlaHlkcmF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIHJlaHlkcmF0ZSgpIHtcclxuICAgIGNvbnN0IHtpZH0gPSB0aGlzLl9kYXRhO1xyXG4gICAgaWYgKExvY2FsQ2FjaGUuaXNGYXYoaWQpKSB7XHJcbiAgICAgIHRoaXMuZmF2SXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudW5mYXZJdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRIVE1MKCkge1xyXG4gICAgbGV0IGNzc0NsYXNzTmFtZSA9IHRoaXMuYmVtQmxvY2s7XHJcblxyXG4gICAgaWYgKHRoaXMuZXh0cmFDU1NDbGFzc2VzLmxlbmd0aCkge1xyXG4gICAgICBjc3NDbGFzc05hbWUgKz0gYCAke3RoaXMuZXh0cmFDU1NDbGFzc2VzLmpvaW4oJyAnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuZWwuY2xhc3NMaXN0ID0gY3NzQ2xhc3NOYW1lO1xyXG4gICAgXHJcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcclxuICB9XHJcblxyXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMgKCkge1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlKCkpXHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICBjb25zdCB7aWR9ID0gdGhpcy5fZGF0YTtcclxuICAgIGlmIChMb2NhbENhY2hlLmlzRmF2KGlkKSkge1xyXG4gICAgICBMb2NhbENhY2hlLnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgICB0aGlzLnVuZmF2SXQoKTtcclxuICAgICAgdGhpcy5jdHguZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnRzLklNQUdFX1VORkFWRUQsIHtkZXRhaWw6IHRoaXMuZGF0YX0pKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgTG9jYWxDYWNoZS5hZGRJdGVtKHRoaXMuX2RhdGEpO1xyXG4gICAgICB0aGlzLmZhdkl0KCk7XHJcbiAgICAgIHRoaXMuY3R4LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50cy5JTUFHRV9GQVZFRCwge2RldGFpbDogdGhpcy5kYXRhfSkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmYXZJdCgpIHtcclxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCh0aGlzLmZhdkNzc0NsYXNzKTtcclxuICB9XHJcblxyXG4gIHVuZmF2SXQoKSB7XHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5mYXZDc3NDbGFzcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGYXZUb2dnbGUgYXMgZGVmYXVsdCwgZXZlbnRzfTtcclxuIiwiY2xhc3MgR2FsbGVyeVZpZXcge1xyXG4gICAgdG9nZ2xlVmlld0J0biA9IG51bGw7XHJcbiAgICBnYWxsZXJ5TGlzdCA9IG51bGw7XHJcbiAgICB0aWxlR2FsbGVyeVZpZXcgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVWaWV3QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1nYWxsZXJ5LXZpZXcnKTtcclxuICAgICAgICB0aGlzLmdhbGxlcnlMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2xpc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydExpc3RlbmluZygpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZVZpZXdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy50aWxlR2FsbGVyeVZpZXcgPSAhdGhpcy50aWxlR2FsbGVyeVZpZXc7XHJcbiAgICAgICAgaWYgKHRoaXMudGlsZUdhbGxlcnlWaWV3KSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZVZpZXdCdG4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vYXNzZXRzL3RpbGUuc3ZnJylcIjtcclxuICAgICAgICAgIHRoaXMuZ2FsbGVyeUxpc3QuY2xhc3NMaXN0LmFkZCgndGlsZS12aWV3Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlVmlld0J0bi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9hc3NldHMvbGlzdC5zdmcnKVwiO1xyXG4gICAgICAgICAgdGhpcy5nYWxsZXJ5TGlzdC5jbGFzc0xpc3QucmVtb3ZlKCd0aWxlLXZpZXcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnlWaWV3OyIsImNvbnN0IGV2ZW50cyA9IHtcclxuICBMT0FEX01PUkU6ICdnYWxsZXJ5TG9hZE1vcmVFdmVudCcsXHJcbiAgSU1BR0VfU0VMRUNURUQ6ICdnYWxsZXJ5SW1hZ2VTZWxlY3RlZEV2ZW50J1xyXG59O1xyXG5cclxuY2xhc3MgR2FsbGVyeSB7XHJcbiAgY3R4ID0gbnVsbDtcclxuICBlbCA9IG51bGw7XHJcbiAgaW1hZ2VzID0gbnVsbDtcclxuICBiZW1CbG9jayA9ICcnO1xyXG4gIGltYWdlc0NvbnRhaW5lciA9IG51bGw7XHJcblxyXG4gIGNzcyA9IHtcclxuICAgIGxpOiAoKSA9PiBgJHt0aGlzLmJlbUJsb2NrfV9fbGlzdF9faXRlbWAsXHJcbiAgICBsaXN0OiAoKSA9PiBgJHt0aGlzLmJlbUJsb2NrfV9fbGlzdGBcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihiZW1CbG9ja1NlbGVjdG9yID0gJ2dhbGxlcnknLCBjdHgpIHtcclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGJlbUJsb2NrU2VsZWN0b3IpO1xyXG4gICAgaWYgKCF0aGlzLmVsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGluaXRpYWxpc2UgZ2FsbGVyeVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuY3R4ID0gY3R4IHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICB0aGlzLmJlbUJsb2NrID0gYmVtQmxvY2tTZWxlY3RvcjtcclxuICAgIHRoaXMuaW1hZ2VzQ29udGFpbmVyID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMuY3NzLmxpc3QoKSk7XHJcbiAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgaWYgKGV2dC50YXJnZXQuZGF0YXNldC5hY3Rpb24gPT09ICdsb2FkLW1vcmUnKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudChldmVudHMuTE9BRF9NT1JFKVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGV2dC50YXJnZXQuZGF0YXNldC5pdGVtID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudChldmVudHMuSU1BR0VfU0VMRUNURUQsIHtcclxuICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmltYWdlc1tldnQudGFyZ2V0LmRhdGFzZXQuaWRdXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGltYWdlcywgZmx1c2ggPSB0cnVlKSB7XHJcbiAgICBjb25zdCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGNvbnN0IGltYWdlc1RvUmVuZGVyID0gT2JqZWN0LnZhbHVlcyhpbWFnZXMgfHwgdGhpcy5pbWFnZXMpO1xyXG5cclxuICAgIGNvbnN0IGh0bWwgPSBpbWFnZXNUb1JlbmRlci5yZWR1Y2UoKHByZXZpb3VzLCBuZXh0KSA9PiB7XHJcbiAgICAgIHByZXZpb3VzLmFwcGVuZENoaWxkKHRoaXMuYnVpbGRJdGVtSFRNTChuZXh0KSk7XHJcbiAgICAgIHJldHVybiBwcmV2aW91cztcclxuICAgIH0sIGRvY0ZyYWcpO1xyXG5cclxuICAgIGlmIChmbHVzaCkge1xyXG4gICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbWFnZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcbiAgfVxyXG5cclxuICBidWlsZEl0ZW1IVE1MKGRhdGEpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2RhdGEudXJscy5zbWFsbH0nKWA7XHJcbiAgICBlbC5jbGFzc05hbWUgPSB0aGlzLmNzcy5saSgpO1xyXG4gICAgZWwuZGF0YXNldC5pZCA9IGRhdGEuaWQ7XHJcbiAgICBlbC5kYXRhc2V0Lml0ZW0gPSAnaW1hZ2UnO1xyXG4gICAgcmV0dXJuIGVsO1xyXG4gIH1cclxuXHJcbiAgbG9hZChpbWFnZXMpIHtcclxuICAgIGxldCBfaW1hZ2VzID0gaW1hZ2VzO1xyXG4gICAgaWYgKF9pbWFnZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAvLyBzdG9yZSBpbWFnZXMgaW4gYSBoYXNoIG1hcFxyXG4gICAgICBfaW1hZ2VzID0gX2ltYWdlcy5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHtcclxuICAgICAgICBwcmV2W25leHQuaWRdID0gbmV4dDtcclxuICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgfSwge30pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbWFnZXMgPSBfaW1hZ2VzO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5pbWFnZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgfVxyXG5cclxuICByZW1vdmVJdGVtKGl0ZW0pIHtcclxuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD0nJHtpdGVtLmlkfSddYCk7XHJcbiAgICBpZihub2RlKSB7XHJcbiAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRJdGVtKGl0ZW0pIHtcclxuICAgIHRoaXMuaW1hZ2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYnVpbGRJdGVtSFRNTChpdGVtKSk7XHJcbiAgfVxyXG5cclxuICBsb2FkTW9yZShpbWFnZXMpIHtcclxuICAgIC8vIHN0b3JlIGltYWdlcyBpbiBhIGhhc2ggbWFwXHJcbiAgICBjb25zdCBfaW1hZ2VzID0gaW1hZ2VzLnJlZHVjZSgocHJldiwgbmV4dCkgPT4ge1xyXG4gICAgICBwcmV2W25leHQuaWRdID0gbmV4dDtcclxuICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICB9LCB7fSk7XHJcblxyXG4gICAgdGhpcy5pbWFnZXMgPSB7IC4uLnRoaXMuaW1hZ2VzLCAuLi5faW1hZ2VzIH07XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgaW1hZ2VzXHJcbiAgICB0aGlzLnJlbmRlcihfaW1hZ2VzLCBmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBHYWxsZXJ5IGFzIGRlZmF1bHQsIGV2ZW50cyB9O1xyXG4iLCJpbXBvcnQgRmF2VG9nZ2xlIGZyb20gJy4uL2Zhdi10b2dnbGUnO1xyXG5cclxuY2xhc3MgSW1hZ2VNb2RhbCB7XHJcbiAgICBjdHggPSBudWxsO1xyXG4gICAgZWwgPSBudWxsO1xyXG4gICAgaWQgPSAnJztcclxuICAgIHNlbGVjdG9ycyA9IHtcclxuICAgICAgICBjbG9zZTogJ1tkYXRhLWFjdGlvbi1jbG9zZV0nLFxyXG4gICAgICAgIGRvd25sb2FkOiAnW2RhdGEtYWN0aW9uLWRvd25sb2FkXScsXHJcbiAgICAgICAgZmF2b3VyaXRlOiAnI2Zhdi10b2dnbGUnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIG1haW4gaW1hZ2UgZGF0YVxyXG4gICAgX2RhdGEgPSBudWxsO1xyXG4gICAgXHJcbiAgICBkb3dubG9hZEJ0biA9IG51bGw7XHJcbiAgICBjbG9zZUJ0biA9IG51bGw7XHJcbiAgICBcclxuICAgIC8vIGZhdiB0b2dnbGUgY29tcG9uZW50IHBhcmVudCBlbGVtZW50XHJcbiAgICBmYXZJY29uRWwgPSBudWxsO1xyXG4gICAgXHJcbiAgICAvLyB0aGUgaW5zdGFuY2Ugb2YgdGhlIGZhdiB0b2dnbGUgY29tcG9uZW50XHJcbiAgICBmYXZUb2dnbGUgPSBudWxsO1xyXG5cclxuICAgIGltYWdlID0gbnVsbDtcclxuICAgIHByb2ZpbGUgPSBudWxsXHJcbiAgICBuYW1lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoY3R4KSB7XHJcbiAgICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xyXG4gICAgICAgIGlmICghdGhpcy5lbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgZmluZCBlbGVtZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4IHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgdGhpcy5pbml0SGVhZGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0Qm9keSgpO1xyXG5cclxuICAgICAgICB0aGlzLmZhdkljb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcnMuZmF2b3VyaXRlKTtcclxuICAgICAgICB0aGlzLmZhdlRvZ2dsZSA9IG5ldyBGYXZUb2dnbGUodGhpcy5mYXZJY29uRWwsIG51bGwsIFsnbW9kYWxfX2FjdGlvbiddKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGEoaW1hZ2VEYXRhKSB7XHJcbiAgICAgICAgaWYoIWltYWdlRGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBpbWFnZURhdGE7XHJcbiAgICAgICAgdGhpcy5mYXZUb2dnbGUuZGF0YSA9IGltYWdlRGF0YTtcclxuICAgICAgICB0aGlzLnJlaHlkcmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMgKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbW9kYWxJbWFnZUNsb3NlZCcpKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5kb3dubG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuZG93bmxvYWRJbWFnZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZWh5ZHJhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge3VybHMsIHVzZXJ9ID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB0aGlzLmltYWdlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7dXJscy5zbWFsbH0nKWA7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7dXNlci5wcm9maWxlX2ltYWdlLnNtYWxsfScpYDtcclxuICAgICAgICBjb25zdCBuYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHVzZXIubmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2xlYXIgXHJcbiAgICAgICAgdGhpcy5uYW1lLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGVcclxuICAgICAgICB0aGlzLm5hbWUuYXBwZW5kQ2hpbGQobmFtZVRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRIZWFkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcnMuY2xvc2UpO1xyXG4gICAgICAgIGlmICghdGhpcy5jbG9zZUJ0bikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgZmluZCBjbG9zZSBidXR0b24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kb3dubG9hZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcnMuZG93bmxvYWQpO1xyXG4gICAgICAgIGlmICghdGhpcy5kb3dubG9hZEJ0bikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgZmluZCBkb3dubG9hZCBidXR0b24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJvZHkoKSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9faW1nJyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmltYWdlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBmaW5kIGNsb3NlIGltYWdlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fZm9vdGVyX19waG90b2dyYXBoZXItcHJvZmlsZS1waWMnKTtcclxuICAgICAgICBpZiAoIXRoaXMucHJvZmlsZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgZmluZCBwcm9maWxlIHBpYycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Zvb3Rlcl9fcGhvdG9ncmFwaGVyLW5hbWUnKTtcclxuICAgICAgICBpZiAoIXRoaXMubmFtZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgZmluZCBuYW1lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICAvLyBpZiBvbiBmYXYgIyBuZWVkIHRvIHJlZnJlc2ggcGFnZVxyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkSW1hZ2UgKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdJIGNsaWNrZWQgZG93bmxvYWQnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VNb2RhbDsiLCJpbXBvcnQgSW1hZ2VTZXJ2aWNlIGZyb20gJy4uLy4uL21vY2tzL1Vuc3BsYXNoU2VydmljZSc7XHJcbmltcG9ydCBHYWxsZXJ5LCB7IGV2ZW50cyBhcyBnYWxsZXJ5RXZlbnRzIH0gZnJvbSAnLi4vZ2FsbGVyeSc7XHJcbmltcG9ydCBTZWFyY2gsIHsgZXZlbnRzIGFzIHNlYXJjaEV2ZW50cyB9IGZyb20gJy4uL3NlYXJjaCc7XHJcbmltcG9ydCBJbWFnZU1vZGFsLCB7IGV2ZW50cyBhcyBtb2RhbEV2ZW50cyB9IGZyb20gJy4uL2ltYWdlLW1vZGFsJztcclxuaW1wb3J0IHtldmVudHMgYXMgZmF2VG9nZ2xlRXZlbnRzfSBmcm9tICcuLi9mYXYtdG9nZ2xlJztcclxuXHJcbmNvbnN0IGdhbGxlcnkgPSBuZXcgR2FsbGVyeSgpO1xyXG5jb25zdCBzZWFyY2ggPSBuZXcgU2VhcmNoKCdzZWFyY2gnKTtcclxuY29uc3QgaW1hZ2VNb2RhbCA9IG5ldyBJbWFnZU1vZGFsKCk7XHJcblxyXG5jb25zdCByb3V0ZXMgPSB7XHJcbiAgSE9NRTogJ2hvbWUnLFxyXG4gIFNFQVJDSDogJ3NlYXJjaCcsXHJcbiAgRkFWT1VSSVRFUzogJ2Zhdm91cml0ZXMnXHJcbn07XHJcblxyXG5jbGFzcyBQYWdlQ29udHJvbGxlciB7XHJcbiAgcGFnZU5yID0gMTtcclxuICBjdHggPSBudWxsO1xyXG4gIHRpdGxlID0gbnVsbDtcclxuICBzdWJUaXRsZSA9IG51bGw7XHJcbiAgbG9hZE1vcmVCdG4gPSBudWxsO1xyXG4gIGdhbGxlcnkgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihjdHgpIHtcclxuICAgIHRoaXMuY3R4ID0gY3R4IHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvblNlYXJjaGVkVGVybShldnQpIHtcclxuICAgIGNvbnN0IHRlcm0gPSBldnQuZGV0YWlsO1xyXG4gICAgZ2FsbGVyeS5sb2FkKGF3YWl0IEltYWdlU2VydmljZS5zZWFyY2godGVybSkpO1xyXG4gICAgdGhpcy5zaG93TG9hZE1vcmVCdG4oKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uT25Mb2FkTW9yZSgpIHtcclxuICAgIGNvbnN0IGhhc2ggPSB0aGlzLmdldEhhc2goKTtcclxuICAgIGxldCBpbWFnZVNlcnZpY2VQcm9wTmFtZSA9ICcnO1xyXG5cclxuICAgIGlmIChoYXNoID09PSByb3V0ZXMuU0VBUkNIKSB7XHJcbiAgICAgIGltYWdlU2VydmljZVByb3BOYW1lID0gJ3NlYXJjaCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhhc2ggPT09IHJvdXRlcy5IT01FKSB7XHJcbiAgICAgIGltYWdlU2VydmljZVByb3BOYW1lID0gJ2FsbCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpbWFnZVNlcnZpY2VQcm9wTmFtZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiSSBkb24ndCBrbm93IHdoYXQgdG8gbG9hZCBtb3JlLlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbGxlcnkubG9hZE1vcmUoYXdhaXQgSW1hZ2VTZXJ2aWNlW2ltYWdlU2VydmljZVByb3BOYW1lXSh0aGlzLnBhZ2VOcikpO1xyXG4gIH1cclxuICBzdGFydExpc3RlbmluZygpIHtcclxuXHJcbiAgICB0aGlzLmN0eC5hZGRFdmVudExpc3RlbmVyKHNlYXJjaEV2ZW50cy5TRUFSQ0hFRF9URVJNX0NIQU5HRUQsIGV2dCA9PlxyXG4gICAgICB0aGlzLm9uU2VhcmNoZWRUZXJtKGV2dClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5jdHguYWRkRXZlbnRMaXN0ZW5lcihnYWxsZXJ5RXZlbnRzLkxPQURfTU9SRSwgKCkgPT5cclxuICAgICAgdGhpcy5vbk9uTG9hZE1vcmUoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmN0eC5hZGRFdmVudExpc3RlbmVyKGdhbGxlcnlFdmVudHMuSU1BR0VfU0VMRUNURUQsIGV2dCA9PiB7XHJcbiAgICAgIGltYWdlTW9kYWwuZGF0YSA9IGV2dC5kZXRhaWw7XHJcbiAgICAgIGltYWdlTW9kYWwuc2hvdygpO1xyXG4gICAgICBpZiAodGhpcy5nZXRIYXNoKCkgPT09IHJvdXRlcy5TRUFSQ0gpIHtcclxuICAgICAgICBzZWFyY2guaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmN0eC5hZGRFdmVudExpc3RlbmVyKCdtb2RhbEltYWdlQ2xvc2VkJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5nZXRIYXNoKCkgPT09IHJvdXRlcy5TRUFSQ0gpIHtcclxuICAgICAgICBzZWFyY2guc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4gdGhpcy5vbkhhc2hDaGFuZ2UoKSk7XHJcbiAgICAvLyBoYW5kbGluZyB0aGUgaGFzaCBvbiBwYWdlIGxvYWRcclxuICAgIHRoaXMub25IYXNoQ2hhbmdlKCk7XHJcblxyXG4gICAgdGhpcy5jdHguYWRkRXZlbnRMaXN0ZW5lcihmYXZUb2dnbGVFdmVudHMuSU1BR0VfRkFWRUQsIChldnQpID0+IHtcclxuICAgICAgaWYodGhpcy5nZXRIYXNoKCkgPT0gcm91dGVzLkZBVk9VUklURVMpIHtcclxuICAgICAgICBjb25zdCB7ZGV0YWlsOmltYWdlfSA9IGV2dDtcclxuICAgICAgICBnYWxsZXJ5LmFkZEl0ZW0oaW1hZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmN0eC5hZGRFdmVudExpc3RlbmVyKGZhdlRvZ2dsZUV2ZW50cy5JTUFHRV9VTkZBVkVELCAoZXZ0KSA9PiB7XHJcbiAgICAgIGlmKHRoaXMuZ2V0SGFzaCgpID09IHJvdXRlcy5GQVZPVVJJVEVTKSB7ICAgICAgXHJcbiAgICAgICAgY29uc3Qge2RldGFpbDppbWFnZX0gPSBldnQ7XHJcbiAgICAgICAgZ2FsbGVyeS5yZW1vdmVJdGVtKGltYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICBnZXRIYXNoKCkge1xyXG4gICAgcmV0dXJuIGxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XHJcbiAgfVxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5wYWdlTnIgPSAxO1xyXG4gIH1cclxuICBhc3luYyBvbkhhc2hDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBoYXNoID0gdGhpcy5nZXRIYXNoKCk7XHJcblxyXG4gICAgc3dpdGNoIChoYXNoKSB7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNhc2Ugcm91dGVzLkhPTUU6XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHNlYXJjaC5oaWRlKClcclxuICAgICAgICB0aGlzLnJlbmRlclRpdGxlKCk7XHJcbiAgICAgICAgZ2FsbGVyeS5sb2FkKGF3YWl0IEltYWdlU2VydmljZS5hbGwoKSk7XHJcbiAgICAgICAgdGhpcy5zaG93TG9hZE1vcmVCdG4oKTtcclxuICAgICAgICB0aGlzLm5vcm1hbEdhbGxlcnlQb3NpdGlvbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIHJvdXRlcy5TRUFSQ0g6XHJcbiAgICAgICAgc2VhcmNoLnNob3coKTtcclxuICAgICAgICBnYWxsZXJ5LmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyVGl0bGUoKTtcclxuICAgICAgICB0aGlzLmhpZGVMb2FkTW9yZUJ0bigpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoR2FsbGVyeVBvc2l0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2Ugcm91dGVzLkZBVk9VUklURVM6XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHNlYXJjaC5oaWRlKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUaXRsZSgpO1xyXG4gICAgICAgIGdhbGxlcnkubG9hZChhd2FpdCBJbWFnZVNlcnZpY2UuZmF2b3VyaXRlcygpKTtcclxuICAgICAgICB0aGlzLnNob3dMb2FkTW9yZUJ0bigpO1xyXG4gICAgICAgIHRoaXMubm9ybWFsR2FsbGVyeVBvc2l0aW9uKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXJUaXRsZSgpIHtcclxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX190aXRsZScpO1xyXG4gICAgdGhpcy5zdWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3N1Yi10aXRsZScpO1xyXG4gICAgaWYodGhpcy5nZXRIYXNoKCkgPT0gcm91dGVzLkZBVk9VUklURVMpIHtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lclRleHQgPSAnRmF2b3VyaXRlcyc7XHJcbiAgICAgIHRoaXMuc3ViVGl0bGUuaW5uZXJUZXh0ID0gJ215IGZhdm91cml0ZSBwaG90b3MnO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5nZXRIYXNoKCkgPT0gcm91dGVzLkhPTUUpIHtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lclRleHQgPSAnSG9tZSc7XHJcbiAgICAgIHRoaXMuc3ViVGl0bGUuaW5uZXJUZXh0ID0gJ2xhdGVzdCBwaG90b3MnO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5nZXRIYXNoKCkgPT0gcm91dGVzLlNFQVJDSCkge1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVyVGV4dCA9ICdTZWFyY2gnO1xyXG4gICAgICB0aGlzLnN1YlRpdGxlLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRNb3JlQnRuKCkge1xyXG4gICAgdGhpcy5sb2FkTW9yZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19zZWUtbW9yZS1idG4nKTtcclxuICAgIHRoaXMubG9hZE1vcmVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gIH1cclxuICBzaG93TG9hZE1vcmVCdG4oKSB7XHJcbiAgICB0aGlzLmxvYWRNb3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX3NlZS1tb3JlLWJ0bicpO1xyXG4gICAgdGhpcy5sb2FkTW9yZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hHYWxsZXJ5UG9zaXRpb24oKSB7XHJcbiAgICB0aGlzLmdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeScpO1xyXG4gICAgdGhpcy5nYWxsZXJ5LmNsYXNzTGlzdC5hZGQoJy0tc2VhcmNoJyk7XHJcbiAgfVxyXG4gIG5vcm1hbEdhbGxlcnlQb3NpdGlvbigpIHtcclxuICAgIHRoaXMuZ2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5Jyk7XHJcbiAgICB0aGlzLmdhbGxlcnkuY2xhc3NMaXN0LnJlbW92ZSgnLS1zZWFyY2gnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VDb250cm9sbGVyO1xyXG4iLCJjb25zdCBldmVudHMgPSB7XHJcbiAgU0VBUkNIRURfVEVSTV9DSEFOR0VEOiAnc2VhcmNoVGVybUNoYW5nZUV2ZW50J1xyXG59O1xyXG5jbGFzcyBTZWFyY2gge1xyXG4gIGN0eCA9IG51bGw7XHJcbiAgZWwgPSBudWxsO1xyXG4gIHNlYXJjaElucHV0ID0gbnVsbDtcclxuICBzZWFyY2hCdG4gPSBudWxsO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IgKHNlbGVjdG9yLCBjdHgpIHtcclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHNlbGVjdG9yKVxyXG4gICAgaWYgKCF0aGlzLmVsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2FuXFwndCBmaW5kIGVsZW1lbnQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWFyY2hpbnB1dF0nKTtcclxuICAgIGlmICghdGhpcy5zZWFyY2hJbnB1dCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgZmluZCBzZWFyY2ggaW5wdXQnKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2VhcmNoYnV0dG9uXScpO1xyXG4gICAgaWYgKCF0aGlzLnNlYXJjaEJ0bikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgZmluZCBzZWFyY2ggYnV0dG9uJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN0eCA9IGN0eCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuY3R4LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50cy5TRUFSQ0hFRF9URVJNX0NIQU5HRUQsIHtcclxuICAgICAgICAgIGRldGFpbDogdGhpcy5zZWFyY2hUZXJtKClcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc2VhcmNoVGVybSgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xyXG4gIH1cclxuICBcclxuICBzaG93KCkge1xyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgU2VhcmNoIGFzIGRlZmF1bHQsIGV2ZW50cyB9O1xyXG4iLCJpbXBvcnQgUGFnZUNvbnRyb2xsZXIgZnJvbSAnLi9jb21wb25lbnRzL3BhZ2UtY29udHJvbGxlcic7XHJcbmltcG9ydCBHYWxsZXJ5VmlldyBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS12aWV3JztcclxuXHJcbmNvbnN0IHBhZ2VDb250cm9sbGVyID0gbmV3IFBhZ2VDb250cm9sbGVyKCk7XHJcbnBhZ2VDb250cm9sbGVyLnN0YXJ0TGlzdGVuaW5nKCk7XHJcblxyXG5jb25zdCBnYWxsZXJ5VmlldyA9IG5ldyBHYWxsZXJ5VmlldygpO1xyXG5nYWxsZXJ5Vmlldy5zdGFydExpc3RlbmluZygpO1xyXG5cclxuIiwiY29uc3QgcGhvdG9EYXRhID0ge1xyXG4gIHRvdGFsOiAyMDc1MixcclxuICB0b3RhbF9wYWdlczogMjA3NixcclxuICByZXN1bHRzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAncU8tUElGODRWeGcnLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnMjAxOC0wOC0xNVQxNzoxMToyOC0wNDowMCcsXHJcbiAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTE0VDAxOjAxOjE5LTA0OjAwJyxcclxuICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE4LTA4LTE2VDA0OjUxOjUwLTA0OjAwJyxcclxuICAgICAgd2lkdGg6IDUxODQsXHJcbiAgICAgIGhlaWdodDogMzQ1NixcclxuICAgICAgY29sb3I6ICcjRDBDQkU5JyxcclxuICAgICAgZGVzY3JpcHRpb246ICdGbHVmZnkgY29ja2Fwb28gaGF2aW5nIHRoZSB0aW1lIG9mIGhpcyBsaWZlIGF0IHRoZSBwYXJrJyxcclxuICAgICAgYWx0X2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICdzaGFsbG93IGZvY3VzIHBob3RvZ3JhcGh5IG9mIHdoaXRlIHNoaWggdHp1IHB1cHB5IHJ1bm5pbmcgb24gdGhlIGdyYXNzJyxcclxuICAgICAgdXJsczoge1xyXG4gICAgICAgIHJhdzpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNDM2MTk2MDA1Ny0xOTg4OWRiOTYyMWU/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgZnVsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNDM2MTk2MDA1Ny0xOTg4OWRiOTYyMWU/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2ImaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNDM2MTk2MDA1Ny0xOTg4OWRiOTYyMWU/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM0MzYxOTYwMDU3LTE5ODg5ZGI5NjIxZT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNDM2MTk2MDA1Ny0xOTg4OWRiOTYyMWU/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCdcclxuICAgICAgfSxcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9xTy1QSUY4NFZ4ZycsXHJcbiAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9xTy1QSUY4NFZ4ZycsXHJcbiAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvcU8tUElGODRWeGcvZG93bmxvYWQnLFxyXG4gICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcU8tUElGODRWeGcvZG93bmxvYWQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICBsaWtlczogNjAxLFxyXG4gICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgdXNlcjoge1xyXG4gICAgICAgIGlkOiAnc19uM0RsQW04aVknLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTMxVDA5OjExOjI4LTA0OjAwJyxcclxuICAgICAgICB1c2VybmFtZTogJ2pvZXljJyxcclxuICAgICAgICBuYW1lOiAnSm9lIENhaW9uZScsXHJcbiAgICAgICAgZmlyc3RfbmFtZTogJ0pvZScsXHJcbiAgICAgICAgbGFzdF9uYW1lOiAnQ2Fpb25lJyxcclxuICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiAnX0pvZXlDXycsXHJcbiAgICAgICAgcG9ydGZvbGlvX3VybDogJ2h0dHA6Ly9iZWhhbmNlLm5ldC9qb2V5YycsXHJcbiAgICAgICAgYmlvOiAnXFx1ZDgzY1xcdWRmNTVcXHVkODNjXFx1ZGZjMCcsXHJcbiAgICAgICAgbG9jYXRpb246ICdDbGV2ZWxhbmQsIE9IJyxcclxuICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qb2V5YycsXHJcbiAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGpvZXljJyxcclxuICAgICAgICAgIHBob3RvczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qb2V5Yy9waG90b3MnLFxyXG4gICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvam9leWMvbGlrZXMnLFxyXG4gICAgICAgICAgcG9ydGZvbGlvOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2pvZXljL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICBmb2xsb3dpbmc6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvam9leWMvZm9sbG93aW5nJyxcclxuICAgICAgICAgIGZvbGxvd2VyczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qb2V5Yy9mb2xsb3dlcnMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE0NDY2NDczMzg0NTgtZjk3NmVmYTExZGI5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE0NDY2NDczMzg0NTgtZjk3NmVmYTExZGI5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTQ0NjY0NzMzODQ1OC1mOTc2ZWZhMTFkYjk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogJ19qb2V5Y18nLFxyXG4gICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAwLFxyXG4gICAgICAgIHRvdGFsX2xpa2VzOiAxMTIsXHJcbiAgICAgICAgdG90YWxfcGhvdG9zOiAxNixcclxuICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgdGFnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdkb2cnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzdWJjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2RvZycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0RvZydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRG9nIEltYWdlcyAmIFBpY3R1cmVzJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdEb3dubG9hZCBmcmVlIGRvZyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICBcIk1hbidzIGJlc3QgZnJpZW5kIGlzIHNvbWV0aGluZyB0byBiZWhvbGQgaW4gYWxsIGZvcm1zOiBnb3JnZW91cyBHb2xkZW4gUmV0cmlldmVycywgdGlueSB5YXBwaW5nIGNoaWh1YWh1YXMsIGZlYXJzb21lIHBpdGJ1bGxzLiBVbnNwbGFzaCdzIGNvbW11bml0eSBvZiBpbmNyZWRpYmxlIHBob3RvZ3JhcGhlcnMgaGFzIGhlbHBlZCB1cyBjdXJhdGUgYW4gYW1hemluZyBzZWxlY3Rpb24gb2YgZG9nIGltYWdlcyB0aGF0IHlvdSBjYW4gYWNjZXNzIGFuZCB1c2UgZnJlZSBvZiBjaGFyZ2UuXCIsXHJcbiAgICAgICAgICAgIG1ldGFfdGl0bGU6ICdEb2cgUGljdHVyZXMgfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgZG9nIHBpY3R1cmVzLiBEb3dubG9hZCBIRCBkb2cgcGhvdG9zIGZvciBmcmVlIG9uIFVuc3BsYXNoLicsXHJcbiAgICAgICAgICAgIGNvdmVyX3Bob3RvOiB7XHJcbiAgICAgICAgICAgICAgaWQ6ICd0R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZF9hdDogJzIwMTgtMDEtMTlUMDk6MjA6MDgtMDU6MDAnLFxyXG4gICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIxVDAxOjAyOjQ0LTA0OjAwJyxcclxuICAgICAgICAgICAgICBwcm9tb3RlZF9hdDogJzIwMTgtMDEtMjBUMDU6NTk6NDgtMDU6MDAnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiAzMjY0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogNDg5NixcclxuICAgICAgICAgICAgICBjb2xvcjogJyNGMUYyRjAnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRG9nIGRheSBvdXQnLFxyXG4gICAgICAgICAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3Nob3J0LWNvYXRlZCBicm93biBkb2cnLFxyXG4gICAgICAgICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgICAgIHJhdzpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMScsXHJcbiAgICAgICAgICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJyxcclxuICAgICAgICAgICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4J1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcvZG93bmxvYWQnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgICAgICAgICAgbGlrZXM6IDMwMyxcclxuICAgICAgICAgICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAndG9HeWhCVnQyTTQnLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjJUMjE6Mzg6MTQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0ZyZWRyaWsgXFx1MDBkNmhsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0ZyZWRyaWsnLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnXFx1MDBkNmhsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBiaW86ICdmcmVkcmlrb2hsYW5kZXJAZ21haWwuY29tXFxyXFxuXFxyXFxuJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnRWwgU3RvY2tob2xtbywgU3dlZGVuJyxcclxuICAgICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgICBwaG90b3M6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2xpa2VzJyxcclxuICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93ZXJzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogJ2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMTAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9saWtlczogMzcsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9waG90b3M6IDE1MSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdGVkX3RvczogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2xhbmRpbmdfcGFnZScsXHJcbiAgICAgICAgICB0aXRsZTogJ2FuaW1hbCcsXHJcbiAgICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgYW5jZXN0cnk6IHtcclxuICAgICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnaW1hZ2VzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnSW1hZ2VzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdhbmltYWxzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnQW5pbWFscydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQW5pbWFscyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBhbmltYWxzIGltYWdlcycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdQYXNzaW9uYXRlIHBob3RvZ3JhcGhlcnMgaGF2ZSBjYXB0dXJlZCB0aGUgbW9zdCBnb3JnZW91cyBhbmltYWxzIGluIHRoZSB3b3JsZCBpbiB0aGVpciBuYXR1cmFsIGhhYml0YXRzIGFuZCBzaGFyZWQgdGhlbSB3aXRoIFVuc3BsYXNoLiBOb3cgeW91IGNhbiB1c2UgdGhlc2UgcGhvdG9zIGhvd2V2ZXIgeW91IHdpc2gsIGZvciBmcmVlIScsXHJcbiAgICAgICAgICAgIG1ldGFfdGl0bGU6XHJcbiAgICAgICAgICAgICAgJ0Jlc3QgMjArIEFuaW1hbHMgUGljdHVyZXMgW0hEXSB8IERvd25sb2FkIEZyZWUgSW1hZ2VzIG9uIFVuc3BsYXNoJyxcclxuICAgICAgICAgICAgbWV0YV9kZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBhbmltYWxzIHBpY3R1cmVzLiBEb3dubG9hZCBIRCBhbmltYWxzIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAnWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE3LTA0LTE4VDEzOjAwOjA0LTA0OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMzo1OS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE3LTA0LTE5VDEzOjU0OjU1LTA0OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogNTE4NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDM0NTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMTIwODAzJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAgICdJIG1ldCB0aGlzIGR1ZGUgb24gc2FmYXJpIGluIEtydWdlciBOYXRpb25hbCBwYXJrIGluIG5vcnRoZXJuIFNvdXRoIEFmcmljYS4gVGhlIGdpcmFmZmVzIHdlcmUgZWFzaWx5IGluIG15IGZhdm9yaXRlIGNyZWF0dXJlcyB0byB3aXRuZXNzLiBUaGV5IHNlZW1lZCBhbG1vc3QgcHJlaGlzdG9yaWMgdGhlIHRoZSB3YXkgdGhlIGdyYWNlZCB0aGUgQWZyaWNhbiBwbGFpbi4nLFxyXG4gICAgICAgICAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3NlbGVjdGl2ZSBmb2N1cyBwaG90b2dyYXBoeSBvZiBnaXJhZmZlJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBL2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiA3NjgsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ0o2Y2c5VEE4LWU4JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDE5LTExLTMwVDAyOjU4OjMxLTA1OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnSnVkYWggTGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0p1ZGFoJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ0xlZ2dlJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGp1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgICBwaG90b3M6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9waG90b3MnLFxyXG4gICAgICAgICAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2xpa2VzJyxcclxuICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2VyczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvZm9sbG93ZXJzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDQsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9waG90b3M6IDEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnc2VhcmNoJyxcclxuICAgICAgICAgIHRpdGxlOiAncGV0J1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdlb3Fucjhpa3dGRScsXHJcbiAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE4LTA5LTE2VDIyOjMzOjQxLTA0OjAwJyxcclxuICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMTRUMDE6MDQ6MzEtMDQ6MDAnLFxyXG4gICAgICBwcm9tb3RlZF9hdDogbnVsbCxcclxuICAgICAgd2lkdGg6IDI3NDQsXHJcbiAgICAgIGhlaWdodDogNDA0OSxcclxuICAgICAgY29sb3I6ICcjMkIxQTI3JyxcclxuICAgICAgZGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3Nob3J0LWNvYXRlZCBicm93biBhbmQgd2hpdGUgcHVwcHknLFxyXG4gICAgICB1cmxzOiB7XHJcbiAgICAgICAgcmF3OlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM3MTUxNjA4ODI4LWVhMmIxMTc3N2VlOD9peGxpYj1yYi0xLjIuMSZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM3MTUxNjA4ODI4LWVhMmIxMTc3N2VlOD9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYiZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM3MTUxNjA4ODI4LWVhMmIxMTc3N2VlOD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzcxNTE2MDg4MjgtZWEyYjExNzc3ZWU4P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM3MTUxNjA4ODI4LWVhMmIxMTc3N2VlOD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJ1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL2VvcW5yOGlrd0ZFJyxcclxuICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL2VvcW5yOGlrd0ZFJyxcclxuICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9lb3Fucjhpa3dGRS9kb3dubG9hZCcsXHJcbiAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9lb3Fucjhpa3dGRS9kb3dubG9hZCdcclxuICAgICAgfSxcclxuICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgIGxpa2VzOiA0NTIsXHJcbiAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgaWQ6ICcxTE16Wk5YNTYyaycsXHJcbiAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMTZUMjI6NTY6MTktMDQ6MDAnLFxyXG4gICAgICAgIHVzZXJuYW1lOiAnYWx2YW5uZWUnLFxyXG4gICAgICAgIG5hbWU6ICdBbHZhbiBOZWUnLFxyXG4gICAgICAgIGZpcnN0X25hbWU6ICdBbHZhbicsXHJcbiAgICAgICAgbGFzdF9uYW1lOiAnTmVlJyxcclxuICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiAnQWx2YW4gTmVlJyxcclxuICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgIGJpbzogJ0kgcmVhbGx5IGxvdmUgdW5zcGxhc2hcXHVmZjAxXFx1ZmYwMVxcdWZmMDFcXHVmZjAxXFx1ZmYwMScsXHJcbiAgICAgICAgbG9jYXRpb246ICdTaGFuZ2hhaSwgQ2hpbmEnLFxyXG4gICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlJyxcclxuICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AYWx2YW5uZWUnLFxyXG4gICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlL3Bob3RvcycsXHJcbiAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbHZhbm5lZS9saWtlcycsXHJcbiAgICAgICAgICBwb3J0Zm9saW86ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYWx2YW5uZWUvcG9ydGZvbGlvJyxcclxuICAgICAgICAgIGZvbGxvd2luZzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbHZhbm5lZS9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgZm9sbG93ZXJzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlL2ZvbGxvd2VycydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU3ODk2NDMzMjU2Ny1hZDY1Y2Y5MmU1ZDlpbWFnZT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTc4OTY0MzMyNTY3LWFkNjVjZjkyZTVkOWltYWdlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU3ODk2NDMzMjU2Ny1hZDY1Y2Y5MmU1ZDlpbWFnZT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiAnYWx2YW5fbmVlJyxcclxuICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICB0b3RhbF9saWtlczogNjIsXHJcbiAgICAgICAgdG90YWxfcGhvdG9zOiAxNzUsXHJcbiAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHRhZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnZG9nJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdkb2cnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdEb2cnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0RvZyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBkb2cgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgXCJNYW4ncyBiZXN0IGZyaWVuZCBpcyBzb21ldGhpbmcgdG8gYmVob2xkIGluIGFsbCBmb3JtczogZ29yZ2VvdXMgR29sZGVuIFJldHJpZXZlcnMsIHRpbnkgeWFwcGluZyBjaGlodWFodWFzLCBmZWFyc29tZSBwaXRidWxscy4gVW5zcGxhc2gncyBjb21tdW5pdHkgb2YgaW5jcmVkaWJsZSBwaG90b2dyYXBoZXJzIGhhcyBoZWxwZWQgdXMgY3VyYXRlIGFuIGFtYXppbmcgc2VsZWN0aW9uIG9mIGRvZyBpbWFnZXMgdGhhdCB5b3UgY2FuIGFjY2VzcyBhbmQgdXNlIGZyZWUgb2YgY2hhcmdlLlwiLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOiAnRG9nIFBpY3R1cmVzIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGRvZyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgZG9nIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAndEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE4LTAxLTE5VDA5OjIwOjA4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMjo0NC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE4LTAxLTIwVDA1OjU5OjQ4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogMzI2NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDQ4OTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjRjFGMkYwJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RvZyBkYXkgb3V0JyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzaG9ydC1jb2F0ZWQgYnJvd24gZG9nJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiAzMDMsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvR3loQlZ0Mk00JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIyVDIxOjM4OjE0LTA0OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdGcmVkcmlrIFxcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdGcmVkcmlrJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ1xcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiAnZnJlZHJpa29obGFuZGVyQGdtYWlsLmNvbVxcclxcblxcclxcbicsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0VsIFN0b2NraG9sbW8sIFN3ZWRlbicsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDEwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDM3LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxNTEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdhbmltYWwnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0FuaW1hbHMgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgYW5pbWFscyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnUGFzc2lvbmF0ZSBwaG90b2dyYXBoZXJzIGhhdmUgY2FwdHVyZWQgdGhlIG1vc3QgZ29yZ2VvdXMgYW5pbWFscyBpbiB0aGUgd29ybGQgaW4gdGhlaXIgbmF0dXJhbCBoYWJpdGF0cyBhbmQgc2hhcmVkIHRoZW0gd2l0aCBVbnNwbGFzaC4gTm93IHlvdSBjYW4gdXNlIHRoZXNlIHBob3RvcyBob3dldmVyIHlvdSB3aXNoLCBmb3IgZnJlZSEnLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOlxyXG4gICAgICAgICAgICAgICdCZXN0IDIwKyBBbmltYWxzIFBpY3R1cmVzIFtIRF0gfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgYW5pbWFscyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgYW5pbWFscyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxNy0wNC0xOFQxMzowMDowNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDM6NTktMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxNy0wNC0xOVQxMzo1NDo1NS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUxODQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAzNDU2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzEyMDgwMycsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgICAnSSBtZXQgdGhpcyBkdWRlIG9uIHNhZmFyaSBpbiBLcnVnZXIgTmF0aW9uYWwgcGFyayBpbiBub3J0aGVybiBTb3V0aCBBZnJpY2EuIFRoZSBnaXJhZmZlcyB3ZXJlIGVhc2lseSBpbiBteSBmYXZvcml0ZSBjcmVhdHVyZXMgdG8gd2l0bmVzcy4gVGhleSBzZWVtZWQgYWxtb3N0IHByZWhpc3RvcmljIHRoZSB0aGUgd2F5IHRoZSBncmFjZWQgdGhlIEFmcmljYW4gcGxhaW4uJyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzZWxlY3RpdmUgZm9jdXMgcGhvdG9ncmFwaHkgb2YgZ2lyYWZmZScsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogNzY4LFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdKNmNnOVRBOC1lOCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAxOS0xMS0zMFQwMjo1ODozMS0wNTowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0p1ZGFoIExlZ2dlJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdKdWRhaCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdMZWdnZScsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiA0LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3BldCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSzRtU0o3a2MwQXMnLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnMjAxOC0wMi0wN1QxMToyMToyMi0wNTowMCcsXHJcbiAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTE0VDAxOjAxOjE4LTA0OjAwJyxcclxuICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE4LTAyLTA4VDA5OjI5OjU4LTA1OjAwJyxcclxuICAgICAgd2lkdGg6IDI3NzYsXHJcbiAgICAgIGhlaWdodDogMzg2NixcclxuICAgICAgY29sb3I6ICcjMDEwNDA0JyxcclxuICAgICAgZGVzY3JpcHRpb246ICdUb3NoaSAoYmxhY2sgcHVnKSB3ZWFyaW5nIG15IHBpbG90IGphY2tldC4nLFxyXG4gICAgICBhbHRfZGVzY3JpcHRpb246ICdibGFjayBkb2cgd2VhcmluZyBibHVlIGRlbmltIGNvbGxhcicsXHJcbiAgICAgIHVybHM6IHtcclxuICAgICAgICByYXc6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgwMjAzODIxMTMtYTdlOGZjMzhlYWM5P2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgwMjAzODIxMTMtYTdlOGZjMzhlYWM5P2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgwMjAzODIxMTMtYTdlOGZjMzhlYWM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxODAyMDM4MjExMy1hN2U4ZmMzOGVhYzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgwMjAzODIxMTMtYTdlOGZjMzhlYWM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvSzRtU0o3a2MwQXMnLFxyXG4gICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvSzRtU0o3a2MwQXMnLFxyXG4gICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL0s0bVNKN2tjMEFzL2Rvd25sb2FkJyxcclxuICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL0s0bVNKN2tjMEFzL2Rvd25sb2FkJ1xyXG4gICAgICB9LFxyXG4gICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgbGlrZXM6IDE2NzAsXHJcbiAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgaWQ6ICdtQTA4UVF6UWY4WScsXHJcbiAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMThUMDk6NTM6MDAtMDQ6MDAnLFxyXG4gICAgICAgIHVzZXJuYW1lOiAnY2hhcmxlc2RlbHV2aW8nLFxyXG4gICAgICAgIG5hbWU6ICdDaGFybGVzIERlbHV2aW8nLFxyXG4gICAgICAgIGZpcnN0X25hbWU6ICdDaGFybGVzJyxcclxuICAgICAgICBsYXN0X25hbWU6ICdEZWx1dmlvJyxcclxuICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiAnY2hhcmxlc2RlbHV2aW8nLFxyXG4gICAgICAgIHBvcnRmb2xpb191cmw6ICdodHRwOi8vY2hhcmxlc2RlbHV2aW8uY29tJyxcclxuICAgICAgICBiaW86ICdHcmFwaGljIGRlc2lnbmVyIGF0IFVuc3BsYXNoIFxcdWQ4M2NcXHVkZGY1XFx1ZDgzY1xcdWRkZWQnLFxyXG4gICAgICAgIGxvY2F0aW9uOiAnTW9udHJlYWwnLFxyXG4gICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NoYXJsZXNkZWx1dmlvJyxcclxuICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AY2hhcmxlc2RlbHV2aW8nLFxyXG4gICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NoYXJsZXNkZWx1dmlvL3Bob3RvcycsXHJcbiAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9jaGFybGVzZGVsdXZpby9saWtlcycsXHJcbiAgICAgICAgICBwb3J0Zm9saW86ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvY2hhcmxlc2RlbHV2aW8vcG9ydGZvbGlvJyxcclxuICAgICAgICAgIGZvbGxvd2luZzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9jaGFybGVzZGVsdXZpby9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgZm9sbG93ZXJzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NoYXJsZXNkZWx1dmlvL2ZvbGxvd2VycydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUxNTY5NDY2MDk1Ni05MTMzYjJmNTNlM2I/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUxNTY5NDY2MDk1Ni05MTMzYjJmNTNlM2I/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTE1Njk0NjYwOTU2LTkxMzNiMmY1M2UzYj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAxMzEsXHJcbiAgICAgICAgdG90YWxfbGlrZXM6IDQ2NTAsXHJcbiAgICAgICAgdG90YWxfcGhvdG9zOiA2MzAsXHJcbiAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHRhZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnZG9nJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdkb2cnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdEb2cnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0RvZyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBkb2cgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgXCJNYW4ncyBiZXN0IGZyaWVuZCBpcyBzb21ldGhpbmcgdG8gYmVob2xkIGluIGFsbCBmb3JtczogZ29yZ2VvdXMgR29sZGVuIFJldHJpZXZlcnMsIHRpbnkgeWFwcGluZyBjaGlodWFodWFzLCBmZWFyc29tZSBwaXRidWxscy4gVW5zcGxhc2gncyBjb21tdW5pdHkgb2YgaW5jcmVkaWJsZSBwaG90b2dyYXBoZXJzIGhhcyBoZWxwZWQgdXMgY3VyYXRlIGFuIGFtYXppbmcgc2VsZWN0aW9uIG9mIGRvZyBpbWFnZXMgdGhhdCB5b3UgY2FuIGFjY2VzcyBhbmQgdXNlIGZyZWUgb2YgY2hhcmdlLlwiLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOiAnRG9nIFBpY3R1cmVzIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGRvZyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgZG9nIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAndEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE4LTAxLTE5VDA5OjIwOjA4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMjo0NC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE4LTAxLTIwVDA1OjU5OjQ4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogMzI2NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDQ4OTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjRjFGMkYwJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RvZyBkYXkgb3V0JyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzaG9ydC1jb2F0ZWQgYnJvd24gZG9nJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiAzMDMsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvR3loQlZ0Mk00JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIyVDIxOjM4OjE0LTA0OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdGcmVkcmlrIFxcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdGcmVkcmlrJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ1xcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiAnZnJlZHJpa29obGFuZGVyQGdtYWlsLmNvbVxcclxcblxcclxcbicsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0VsIFN0b2NraG9sbW8sIFN3ZWRlbicsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDEwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDM3LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxNTEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdhbmltYWwnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0FuaW1hbHMgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgYW5pbWFscyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnUGFzc2lvbmF0ZSBwaG90b2dyYXBoZXJzIGhhdmUgY2FwdHVyZWQgdGhlIG1vc3QgZ29yZ2VvdXMgYW5pbWFscyBpbiB0aGUgd29ybGQgaW4gdGhlaXIgbmF0dXJhbCBoYWJpdGF0cyBhbmQgc2hhcmVkIHRoZW0gd2l0aCBVbnNwbGFzaC4gTm93IHlvdSBjYW4gdXNlIHRoZXNlIHBob3RvcyBob3dldmVyIHlvdSB3aXNoLCBmb3IgZnJlZSEnLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOlxyXG4gICAgICAgICAgICAgICdCZXN0IDIwKyBBbmltYWxzIFBpY3R1cmVzIFtIRF0gfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgYW5pbWFscyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgYW5pbWFscyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxNy0wNC0xOFQxMzowMDowNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDM6NTktMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxNy0wNC0xOVQxMzo1NDo1NS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUxODQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAzNDU2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzEyMDgwMycsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgICAnSSBtZXQgdGhpcyBkdWRlIG9uIHNhZmFyaSBpbiBLcnVnZXIgTmF0aW9uYWwgcGFyayBpbiBub3J0aGVybiBTb3V0aCBBZnJpY2EuIFRoZSBnaXJhZmZlcyB3ZXJlIGVhc2lseSBpbiBteSBmYXZvcml0ZSBjcmVhdHVyZXMgdG8gd2l0bmVzcy4gVGhleSBzZWVtZWQgYWxtb3N0IHByZWhpc3RvcmljIHRoZSB0aGUgd2F5IHRoZSBncmFjZWQgdGhlIEFmcmljYW4gcGxhaW4uJyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzZWxlY3RpdmUgZm9jdXMgcGhvdG9ncmFwaHkgb2YgZ2lyYWZmZScsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogNzY4LFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdKNmNnOVRBOC1lOCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAxOS0xMS0zMFQwMjo1ODozMS0wNTowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0p1ZGFoIExlZ2dlJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdKdWRhaCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdMZWdnZScsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiA0LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3BldCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTjA0RklmSGh2X2snLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnMjAxOS0wNi0yMFQwOTozMDoxNS0wNDowMCcsXHJcbiAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTE0VDAxOjA0OjM0LTA0OjAwJyxcclxuICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE5LTA2LTIyVDAxOjQzOjI0LTA0OjAwJyxcclxuICAgICAgd2lkdGg6IDYwMDAsXHJcbiAgICAgIGhlaWdodDogNDAwMCxcclxuICAgICAgY29sb3I6ICcjMTUwQTA2JyxcclxuICAgICAgZGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ2JsYWNrIGFuZCB3aGl0ZSBzaG9ydCBjb2F0ZWQgZG9nJyxcclxuICAgICAgdXJsczoge1xyXG4gICAgICAgIHJhdzpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU2MTAzNzQwNC02MWNkNDZhYTYxNWI/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgZnVsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU2MTAzNzQwNC02MWNkNDZhYTYxNWI/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2ImaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU2MTAzNzQwNC02MWNkNDZhYTYxNWI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTYxMDM3NDA0LTYxY2Q0NmFhNjE1Yj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU2MTAzNzQwNC02MWNkNDZhYTYxNWI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCdcclxuICAgICAgfSxcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9OMDRGSWZIaHZfaycsXHJcbiAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9OMDRGSWZIaHZfaycsXHJcbiAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvTjA0RklmSGh2X2svZG93bmxvYWQnLFxyXG4gICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvTjA0RklmSGh2X2svZG93bmxvYWQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICBsaWtlczogMTUzLFxyXG4gICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgdXNlcjoge1xyXG4gICAgICAgIGlkOiAnMjNsLUEyT29RUG8nLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTA3VDA3OjIyOjA1LTA0OjAwJyxcclxuICAgICAgICB1c2VybmFtZTogJ3FydXB0JyxcclxuICAgICAgICBuYW1lOiAnVmljdG9yIEdyYWJhcmN6eWsnLFxyXG4gICAgICAgIGZpcnN0X25hbWU6ICdWaWN0b3InLFxyXG4gICAgICAgIGxhc3RfbmFtZTogJ0dyYWJhcmN6eWsnLFxyXG4gICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICBiaW86IG51bGwsXHJcbiAgICAgICAgbG9jYXRpb246ICdFc3RlcG9uYSBTcGFpbicsXHJcbiAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvcXJ1cHQnLFxyXG4gICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BxcnVwdCcsXHJcbiAgICAgICAgICBwaG90b3M6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvcXJ1cHQvcGhvdG9zJyxcclxuICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3FydXB0L2xpa2VzJyxcclxuICAgICAgICAgIHBvcnRmb2xpbzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9xcnVwdC9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgZm9sbG93aW5nOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3FydXB0L2ZvbGxvd2luZycsXHJcbiAgICAgICAgICBmb2xsb3dlcnM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvcXJ1cHQvZm9sbG93ZXJzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTUwNTc1MzU5Nzk0LWNiMGUyMWM4ZjNmMT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTUwNTc1MzU5Nzk0LWNiMGUyMWM4ZjNmMT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1NTA1NzUzNTk3OTQtY2IwZTIxYzhmM2YxP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDAsXHJcbiAgICAgICAgdG90YWxfbGlrZXM6IDQyLFxyXG4gICAgICAgIHRvdGFsX3Bob3RvczogODIsXHJcbiAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHRhZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnZG9nJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdkb2cnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdEb2cnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0RvZyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBkb2cgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgXCJNYW4ncyBiZXN0IGZyaWVuZCBpcyBzb21ldGhpbmcgdG8gYmVob2xkIGluIGFsbCBmb3JtczogZ29yZ2VvdXMgR29sZGVuIFJldHJpZXZlcnMsIHRpbnkgeWFwcGluZyBjaGlodWFodWFzLCBmZWFyc29tZSBwaXRidWxscy4gVW5zcGxhc2gncyBjb21tdW5pdHkgb2YgaW5jcmVkaWJsZSBwaG90b2dyYXBoZXJzIGhhcyBoZWxwZWQgdXMgY3VyYXRlIGFuIGFtYXppbmcgc2VsZWN0aW9uIG9mIGRvZyBpbWFnZXMgdGhhdCB5b3UgY2FuIGFjY2VzcyBhbmQgdXNlIGZyZWUgb2YgY2hhcmdlLlwiLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOiAnRG9nIFBpY3R1cmVzIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGRvZyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgZG9nIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAndEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE4LTAxLTE5VDA5OjIwOjA4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMjo0NC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE4LTAxLTIwVDA1OjU5OjQ4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogMzI2NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDQ4OTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjRjFGMkYwJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RvZyBkYXkgb3V0JyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzaG9ydC1jb2F0ZWQgYnJvd24gZG9nJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiAzMDMsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvR3loQlZ0Mk00JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIyVDIxOjM4OjE0LTA0OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdGcmVkcmlrIFxcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdGcmVkcmlrJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ1xcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiAnZnJlZHJpa29obGFuZGVyQGdtYWlsLmNvbVxcclxcblxcclxcbicsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0VsIFN0b2NraG9sbW8sIFN3ZWRlbicsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDEwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDM3LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxNTEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdhbmltYWwnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0FuaW1hbHMgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgYW5pbWFscyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnUGFzc2lvbmF0ZSBwaG90b2dyYXBoZXJzIGhhdmUgY2FwdHVyZWQgdGhlIG1vc3QgZ29yZ2VvdXMgYW5pbWFscyBpbiB0aGUgd29ybGQgaW4gdGhlaXIgbmF0dXJhbCBoYWJpdGF0cyBhbmQgc2hhcmVkIHRoZW0gd2l0aCBVbnNwbGFzaC4gTm93IHlvdSBjYW4gdXNlIHRoZXNlIHBob3RvcyBob3dldmVyIHlvdSB3aXNoLCBmb3IgZnJlZSEnLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOlxyXG4gICAgICAgICAgICAgICdCZXN0IDIwKyBBbmltYWxzIFBpY3R1cmVzIFtIRF0gfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgYW5pbWFscyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgYW5pbWFscyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxNy0wNC0xOFQxMzowMDowNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDM6NTktMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxNy0wNC0xOVQxMzo1NDo1NS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUxODQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAzNDU2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzEyMDgwMycsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgICAnSSBtZXQgdGhpcyBkdWRlIG9uIHNhZmFyaSBpbiBLcnVnZXIgTmF0aW9uYWwgcGFyayBpbiBub3J0aGVybiBTb3V0aCBBZnJpY2EuIFRoZSBnaXJhZmZlcyB3ZXJlIGVhc2lseSBpbiBteSBmYXZvcml0ZSBjcmVhdHVyZXMgdG8gd2l0bmVzcy4gVGhleSBzZWVtZWQgYWxtb3N0IHByZWhpc3RvcmljIHRoZSB0aGUgd2F5IHRoZSBncmFjZWQgdGhlIEFmcmljYW4gcGxhaW4uJyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzZWxlY3RpdmUgZm9jdXMgcGhvdG9ncmFwaHkgb2YgZ2lyYWZmZScsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogNzY4LFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdKNmNnOVRBOC1lOCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAxOS0xMS0zMFQwMjo1ODozMS0wNTowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0p1ZGFoIExlZ2dlJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdKdWRhaCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdMZWdnZScsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiA0LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgICB0aXRsZTogJ2NhbmluZSdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnU2czWHd1RXB5YlUnLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnMjAxOS0wMy0wOFQwOTowNDoyMi0wNTowMCcsXHJcbiAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTE0VDAxOjA0OjM0LTA0OjAwJyxcclxuICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE5LTAzLTExVDA2OjEyOjQxLTA0OjAwJyxcclxuICAgICAgd2lkdGg6IDM3NDIsXHJcbiAgICAgIGhlaWdodDogNjAwMCxcclxuICAgICAgY29sb3I6ICcjRjdGQUZBJyxcclxuICAgICAgZGVzY3JpcHRpb246ICdIYXBweSBXb21lblxcdTIwMTlzIERheSEnLFxyXG4gICAgICBhbHRfZGVzY3JpcHRpb246ICd5ZWxsb3cgTGFicmFkb3IgcmV0cmlldmVyIGJpdGluZyB5ZWxsb3cgdHVsaXAgZmxvd2VyJyxcclxuICAgICAgdXJsczoge1xyXG4gICAgICAgIHJhdzpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1MjA1MzgzMS03MTU5NGEyNzYzMmQ/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgZnVsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1MjA1MzgzMS03MTU5NGEyNzYzMmQ/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2ImaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1MjA1MzgzMS03MTU5NGEyNzYzMmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTUyMDUzODMxLTcxNTk0YTI3NjMyZD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1MjA1MzgzMS03MTU5NGEyNzYzMmQ/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCdcclxuICAgICAgfSxcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9TZzNYd3VFcHliVScsXHJcbiAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9TZzNYd3VFcHliVScsXHJcbiAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvU2czWHd1RXB5YlUvZG93bmxvYWQnLFxyXG4gICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvU2czWHd1RXB5YlUvZG93bmxvYWQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICBsaWtlczogNDE5LFxyXG4gICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgdXNlcjoge1xyXG4gICAgICAgIGlkOiAneTlvRVZiYy1OQUUnLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAyLTA0VDA1OjQ1OjE0LTA1OjAwJyxcclxuICAgICAgICB1c2VybmFtZTogJ3JpY2hhcmRicnV0eW8nLFxyXG4gICAgICAgIG5hbWU6ICdSaWNoYXJkIEJydXR5bycsXHJcbiAgICAgICAgZmlyc3RfbmFtZTogJ1JpY2hhcmQnLFxyXG4gICAgICAgIGxhc3RfbmFtZTogJ0JydXR5bycsXHJcbiAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgIGJpbzogJ2luc3RhZ3JhbTogcmljaGFyZGJydXR5b1xcclxcbicsXHJcbiAgICAgICAgbG9jYXRpb246ICdTemVnZWQnLFxyXG4gICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3JpY2hhcmRicnV0eW8nLFxyXG4gICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0ByaWNoYXJkYnJ1dHlvJyxcclxuICAgICAgICAgIHBob3RvczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9yaWNoYXJkYnJ1dHlvL3Bob3RvcycsXHJcbiAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9yaWNoYXJkYnJ1dHlvL2xpa2VzJyxcclxuICAgICAgICAgIHBvcnRmb2xpbzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9yaWNoYXJkYnJ1dHlvL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICBmb2xsb3dpbmc6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvcmljaGFyZGJydXR5by9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgZm9sbG93ZXJzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL3JpY2hhcmRicnV0eW8vZm9sbG93ZXJzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTQ5OTI5NDExNzUzLTViMTBmOGM5YjBmYj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTQ5OTI5NDExNzUzLTViMTBmOGM5YjBmYj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1NDk5Mjk0MTE3NTMtNWIxMGY4YzliMGZiP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdyaWNoYXJkYnJ1dHlvJyxcclxuICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICB0b3RhbF9saWtlczogMSxcclxuICAgICAgICB0b3RhbF9waG90b3M6IDIwLFxyXG4gICAgICAgIGFjY2VwdGVkX3RvczogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB0YWdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2xhbmRpbmdfcGFnZScsXHJcbiAgICAgICAgICB0aXRsZTogJ2RvZycsXHJcbiAgICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgYW5jZXN0cnk6IHtcclxuICAgICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnaW1hZ2VzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnSW1hZ2VzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdhbmltYWxzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnQW5pbWFscydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnZG9nJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnRG9nJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6ICdEb2cgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgZG9nIGltYWdlcycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgIFwiTWFuJ3MgYmVzdCBmcmllbmQgaXMgc29tZXRoaW5nIHRvIGJlaG9sZCBpbiBhbGwgZm9ybXM6IGdvcmdlb3VzIEdvbGRlbiBSZXRyaWV2ZXJzLCB0aW55IHlhcHBpbmcgY2hpaHVhaHVhcywgZmVhcnNvbWUgcGl0YnVsbHMuIFVuc3BsYXNoJ3MgY29tbXVuaXR5IG9mIGluY3JlZGlibGUgcGhvdG9ncmFwaGVycyBoYXMgaGVscGVkIHVzIGN1cmF0ZSBhbiBhbWF6aW5nIHNlbGVjdGlvbiBvZiBkb2cgaW1hZ2VzIHRoYXQgeW91IGNhbiBhY2Nlc3MgYW5kIHVzZSBmcmVlIG9mIGNoYXJnZS5cIixcclxuICAgICAgICAgICAgbWV0YV90aXRsZTogJ0RvZyBQaWN0dXJlcyB8IERvd25sb2FkIEZyZWUgSW1hZ2VzIG9uIFVuc3BsYXNoJyxcclxuICAgICAgICAgICAgbWV0YV9kZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBkb2cgcGljdHVyZXMuIERvd25sb2FkIEhEIGRvZyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxOC0wMS0xOVQwOToyMDowOC0wNTowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDI6NDQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxOC0wMS0yMFQwNTo1OTo0OC0wNTowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDMyNjQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiA0ODk2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnI0YxRjJGMCcsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEb2cgZGF5IG91dCcsXHJcbiAgICAgICAgICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnc2hvcnQtY29hdGVkIGJyb3duIGRvZycsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogMzAzLFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICd0b0d5aEJWdDJNNCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMlQyMTozODoxNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnRnJlZHJpayBcXHUwMGQ2aGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAnRnJlZHJpaycsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdcXHUwMGQ2aGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogJ2ZyZWRyaWtvaGxhbmRlckBnbWFpbC5jb21cXHJcXG5cXHJcXG4nLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICdFbCBTdG9ja2hvbG1vLCBTd2VkZW4nLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIHBob3RvczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9waG90b3MnLFxyXG4gICAgICAgICAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvbGlrZXMnLFxyXG4gICAgICAgICAgICAgICAgICBwb3J0Zm9saW86XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2VyczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9mb2xsb3dlcnMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAxMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiAzNyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX3Bob3RvczogMTUxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnYW5pbWFsJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6ICdBbmltYWxzIEltYWdlcyAmIFBpY3R1cmVzJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdEb3dubG9hZCBmcmVlIGFuaW1hbHMgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ1Bhc3Npb25hdGUgcGhvdG9ncmFwaGVycyBoYXZlIGNhcHR1cmVkIHRoZSBtb3N0IGdvcmdlb3VzIGFuaW1hbHMgaW4gdGhlIHdvcmxkIGluIHRoZWlyIG5hdHVyYWwgaGFiaXRhdHMgYW5kIHNoYXJlZCB0aGVtIHdpdGggVW5zcGxhc2guIE5vdyB5b3UgY2FuIHVzZSB0aGVzZSBwaG90b3MgaG93ZXZlciB5b3Ugd2lzaCwgZm9yIGZyZWUhJyxcclxuICAgICAgICAgICAgbWV0YV90aXRsZTpcclxuICAgICAgICAgICAgICAnQmVzdCAyMCsgQW5pbWFscyBQaWN0dXJlcyBbSERdIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGFuaW1hbHMgcGljdHVyZXMuIERvd25sb2FkIEhEIGFuaW1hbHMgcGhvdG9zIGZvciBmcmVlIG9uIFVuc3BsYXNoLicsXHJcbiAgICAgICAgICAgIGNvdmVyX3Bob3RvOiB7XHJcbiAgICAgICAgICAgICAgaWQ6ICdZb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZF9hdDogJzIwMTctMDQtMThUMTM6MDA6MDQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIxVDAxOjAzOjU5LTA0OjAwJyxcclxuICAgICAgICAgICAgICBwcm9tb3RlZF9hdDogJzIwMTctMDQtMTlUMTM6NTQ6NTUtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiA1MTg0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogMzQ1NixcclxuICAgICAgICAgICAgICBjb2xvcjogJyMxMjA4MDMnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICAgJ0kgbWV0IHRoaXMgZHVkZSBvbiBzYWZhcmkgaW4gS3J1Z2VyIE5hdGlvbmFsIHBhcmsgaW4gbm9ydGhlcm4gU291dGggQWZyaWNhLiBUaGUgZ2lyYWZmZXMgd2VyZSBlYXNpbHkgaW4gbXkgZmF2b3JpdGUgY3JlYXR1cmVzIHRvIHdpdG5lc3MuIFRoZXkgc2VlbWVkIGFsbW9zdCBwcmVoaXN0b3JpYyB0aGUgdGhlIHdheSB0aGUgZ3JhY2VkIHRoZSBBZnJpY2FuIHBsYWluLicsXHJcbiAgICAgICAgICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnc2VsZWN0aXZlIGZvY3VzIHBob3RvZ3JhcGh5IG9mIGdpcmFmZmUnLFxyXG4gICAgICAgICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgICAgIHJhdzpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMScsXHJcbiAgICAgICAgICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJyxcclxuICAgICAgICAgICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4J1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBL2Rvd25sb2FkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgICAgICAgICAgbGlrZXM6IDc2OCxcclxuICAgICAgICAgICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnSjZjZzlUQTgtZTgnLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMTktMTEtMzBUMDI6NTg6MzEtMDU6MDAnLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdKdWRhaCBMZWdnZScsXHJcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAnSnVkYWgnLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnTGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBiaW86IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICAgIHBob3RvczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvbGlrZXMnLFxyXG4gICAgICAgICAgICAgICAgICBwb3J0Zm9saW86XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dlcnMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9saWtlczogNCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX3Bob3RvczogMSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdGVkX3RvczogZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdzZWFyY2gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdwZXQnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1V0ckU1RGNnRXlnJyxcclxuICAgICAgY3JlYXRlZF9hdDogJzIwMTgtMTItMTFUMTc6NDY6MTItMDU6MDAnLFxyXG4gICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wNC0xNFQwMTowNzoyMS0wNDowMCcsXHJcbiAgICAgIHByb21vdGVkX2F0OiBudWxsLFxyXG4gICAgICB3aWR0aDogNTE4NCxcclxuICAgICAgaGVpZ2h0OiAzODg4LFxyXG4gICAgICBjb2xvcjogJyNGQkZCRkMnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnbWVkaXVtLWNvYXRlZCBicm93biBkb2cgZHVyaW5nIGRheXRpbWUnLFxyXG4gICAgICB1cmxzOiB7XHJcbiAgICAgICAgcmF3OlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ0NTY4MTAwLTg0N2E5NDg1ODViOT9peGxpYj1yYi0xLjIuMSZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ0NTY4MTAwLTg0N2E5NDg1ODViOT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYiZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ0NTY4MTAwLTg0N2E5NDg1ODViOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDQ1NjgxMDAtODQ3YTk0ODU4NWI5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ0NTY4MTAwLTg0N2E5NDg1ODViOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJ1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1V0ckU1RGNnRXlnJyxcclxuICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1V0ckU1RGNnRXlnJyxcclxuICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9VdHJFNURjZ0V5Zy9kb3dubG9hZCcsXHJcbiAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9VdHJFNURjZ0V5Zy9kb3dubG9hZCdcclxuICAgICAgfSxcclxuICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgIGxpa2VzOiAyNDEsXHJcbiAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgaWQ6ICdmUV81cFExN0hGWScsXHJcbiAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMTZUMTQ6MzY6NDctMDQ6MDAnLFxyXG4gICAgICAgIHVzZXJuYW1lOiAnamFtaWU0NTInLFxyXG4gICAgICAgIG5hbWU6ICdKYW1pZSBTdHJlZXQnLFxyXG4gICAgICAgIGZpcnN0X25hbWU6ICdKYW1pZScsXHJcbiAgICAgICAgbGFzdF9uYW1lOiAnU3RyZWV0JyxcclxuICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiAnSmFtaWVEb3RTdCcsXHJcbiAgICAgICAgcG9ydGZvbGlvX3VybDogJ2h0dHA6Ly9qYW1pZS5zdCcsXHJcbiAgICAgICAgYmlvOlxyXG4gICAgICAgICAgJ1NvZnR3YXJlIGVuZ2luZWVyIGJ5IGRheSwgcGhvdG9ncmFwaGVyIGJ5IG5pZ2h0LiBGb2xsb3cgbWUgb24gaW5zdGFncmFtIEBKYW1pZTQ1MiBmb3IgbW9yZSBnb29kbmVzcy4nLFxyXG4gICAgICAgIGxvY2F0aW9uOiAnU3VycmV5LCBVSycsXHJcbiAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvamFtaWU0NTInLFxyXG4gICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BqYW1pZTQ1MicsXHJcbiAgICAgICAgICBwaG90b3M6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvamFtaWU0NTIvcGhvdG9zJyxcclxuICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2phbWllNDUyL2xpa2VzJyxcclxuICAgICAgICAgIHBvcnRmb2xpbzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qYW1pZTQ1Mi9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgZm9sbG93aW5nOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2phbWllNDUyL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICBmb2xsb3dlcnM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvamFtaWU0NTIvZm9sbG93ZXJzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTY3NzEzNDQ3MTU3LTEzMDkzNWI2MTA2NGltYWdlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1Njc3MTM0NDcxNTctMTMwOTM1YjYxMDY0aW1hZ2U/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTY3NzEzNDQ3MTU3LTEzMDkzNWI2MTA2NGltYWdlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdqYW1pZTQ1MicsXHJcbiAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDcsXHJcbiAgICAgICAgdG90YWxfbGlrZXM6IDMyMCxcclxuICAgICAgICB0b3RhbF9waG90b3M6IDMyNCxcclxuICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgdGFnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdkb2cnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzdWJjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2RvZycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0RvZydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRG9nIEltYWdlcyAmIFBpY3R1cmVzJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdEb3dubG9hZCBmcmVlIGRvZyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICBcIk1hbidzIGJlc3QgZnJpZW5kIGlzIHNvbWV0aGluZyB0byBiZWhvbGQgaW4gYWxsIGZvcm1zOiBnb3JnZW91cyBHb2xkZW4gUmV0cmlldmVycywgdGlueSB5YXBwaW5nIGNoaWh1YWh1YXMsIGZlYXJzb21lIHBpdGJ1bGxzLiBVbnNwbGFzaCdzIGNvbW11bml0eSBvZiBpbmNyZWRpYmxlIHBob3RvZ3JhcGhlcnMgaGFzIGhlbHBlZCB1cyBjdXJhdGUgYW4gYW1hemluZyBzZWxlY3Rpb24gb2YgZG9nIGltYWdlcyB0aGF0IHlvdSBjYW4gYWNjZXNzIGFuZCB1c2UgZnJlZSBvZiBjaGFyZ2UuXCIsXHJcbiAgICAgICAgICAgIG1ldGFfdGl0bGU6ICdEb2cgUGljdHVyZXMgfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgZG9nIHBpY3R1cmVzLiBEb3dubG9hZCBIRCBkb2cgcGhvdG9zIGZvciBmcmVlIG9uIFVuc3BsYXNoLicsXHJcbiAgICAgICAgICAgIGNvdmVyX3Bob3RvOiB7XHJcbiAgICAgICAgICAgICAgaWQ6ICd0R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZF9hdDogJzIwMTgtMDEtMTlUMDk6MjA6MDgtMDU6MDAnLFxyXG4gICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIxVDAxOjAyOjQ0LTA0OjAwJyxcclxuICAgICAgICAgICAgICBwcm9tb3RlZF9hdDogJzIwMTgtMDEtMjBUMDU6NTk6NDgtMDU6MDAnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiAzMjY0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogNDg5NixcclxuICAgICAgICAgICAgICBjb2xvcjogJyNGMUYyRjAnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRG9nIGRheSBvdXQnLFxyXG4gICAgICAgICAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3Nob3J0LWNvYXRlZCBicm93biBkb2cnLFxyXG4gICAgICAgICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgICAgIHJhdzpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMScsXHJcbiAgICAgICAgICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJyxcclxuICAgICAgICAgICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4J1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcvZG93bmxvYWQnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgICAgICAgICAgbGlrZXM6IDMwMyxcclxuICAgICAgICAgICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAndG9HeWhCVnQyTTQnLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjJUMjE6Mzg6MTQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0ZyZWRyaWsgXFx1MDBkNmhsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0ZyZWRyaWsnLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnXFx1MDBkNmhsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBiaW86ICdmcmVkcmlrb2hsYW5kZXJAZ21haWwuY29tXFxyXFxuXFxyXFxuJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnRWwgU3RvY2tob2xtbywgU3dlZGVuJyxcclxuICAgICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgICBwaG90b3M6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2xpa2VzJyxcclxuICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93ZXJzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogJ2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMTAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9saWtlczogMzcsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9waG90b3M6IDE1MSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdGVkX3RvczogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2xhbmRpbmdfcGFnZScsXHJcbiAgICAgICAgICB0aXRsZTogJ2FuaW1hbCcsXHJcbiAgICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgYW5jZXN0cnk6IHtcclxuICAgICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnaW1hZ2VzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnSW1hZ2VzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdhbmltYWxzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnQW5pbWFscydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQW5pbWFscyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBhbmltYWxzIGltYWdlcycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdQYXNzaW9uYXRlIHBob3RvZ3JhcGhlcnMgaGF2ZSBjYXB0dXJlZCB0aGUgbW9zdCBnb3JnZW91cyBhbmltYWxzIGluIHRoZSB3b3JsZCBpbiB0aGVpciBuYXR1cmFsIGhhYml0YXRzIGFuZCBzaGFyZWQgdGhlbSB3aXRoIFVuc3BsYXNoLiBOb3cgeW91IGNhbiB1c2UgdGhlc2UgcGhvdG9zIGhvd2V2ZXIgeW91IHdpc2gsIGZvciBmcmVlIScsXHJcbiAgICAgICAgICAgIG1ldGFfdGl0bGU6XHJcbiAgICAgICAgICAgICAgJ0Jlc3QgMjArIEFuaW1hbHMgUGljdHVyZXMgW0hEXSB8IERvd25sb2FkIEZyZWUgSW1hZ2VzIG9uIFVuc3BsYXNoJyxcclxuICAgICAgICAgICAgbWV0YV9kZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBhbmltYWxzIHBpY3R1cmVzLiBEb3dubG9hZCBIRCBhbmltYWxzIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAnWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE3LTA0LTE4VDEzOjAwOjA0LTA0OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMzo1OS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE3LTA0LTE5VDEzOjU0OjU1LTA0OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogNTE4NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDM0NTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMTIwODAzJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAgICdJIG1ldCB0aGlzIGR1ZGUgb24gc2FmYXJpIGluIEtydWdlciBOYXRpb25hbCBwYXJrIGluIG5vcnRoZXJuIFNvdXRoIEFmcmljYS4gVGhlIGdpcmFmZmVzIHdlcmUgZWFzaWx5IGluIG15IGZhdm9yaXRlIGNyZWF0dXJlcyB0byB3aXRuZXNzLiBUaGV5IHNlZW1lZCBhbG1vc3QgcHJlaGlzdG9yaWMgdGhlIHRoZSB3YXkgdGhlIGdyYWNlZCB0aGUgQWZyaWNhbiBwbGFpbi4nLFxyXG4gICAgICAgICAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3NlbGVjdGl2ZSBmb2N1cyBwaG90b2dyYXBoeSBvZiBnaXJhZmZlJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBL2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiA3NjgsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ0o2Y2c5VEE4LWU4JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDE5LTExLTMwVDAyOjU4OjMxLTA1OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnSnVkYWggTGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0p1ZGFoJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ0xlZ2dlJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGp1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgICBwaG90b3M6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9waG90b3MnLFxyXG4gICAgICAgICAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2xpa2VzJyxcclxuICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2VyczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvZm9sbG93ZXJzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDQsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9waG90b3M6IDEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnc2VhcmNoJyxcclxuICAgICAgICAgIHRpdGxlOiAncGV0J1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdULTBFVy1TRWJzRScsXHJcbiAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE5LTAxLTIyVDE4OjMyOjU5LTA1OjAwJyxcclxuICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMTRUMDE6MDU6MzYtMDQ6MDAnLFxyXG4gICAgICBwcm9tb3RlZF9hdDogJzIwMTktMDEtMjRUMDY6Mjk6MjgtMDU6MDAnLFxyXG4gICAgICB3aWR0aDogNTc4NCxcclxuICAgICAgaGVpZ2h0OiAzODYxLFxyXG4gICAgICBjb2xvcjogJyMzNTIwMTYnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgYWx0X2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICd0d28gYnJvd24gYW5kIHdoaXRlIGRvZ3MgcnVubmluZyBkaXJ0IHJvYWQgZHVyaW5nIGRheXRpbWUnLFxyXG4gICAgICB1cmxzOiB7XHJcbiAgICAgICAgcmF3OlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ4MTk5OTczLTAzY2NlMGJiYzg3Yj9peGxpYj1yYi0xLjIuMSZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ4MTk5OTczLTAzY2NlMGJiYzg3Yj9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYiZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ4MTk5OTczLTAzY2NlMGJiYzg3Yj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDgxOTk5NzMtMDNjY2UwYmJjODdiP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ4MTk5OTczLTAzY2NlMGJiYzg3Yj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJ1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1QtMEVXLVNFYnNFJyxcclxuICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1QtMEVXLVNFYnNFJyxcclxuICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9ULTBFVy1TRWJzRS9kb3dubG9hZCcsXHJcbiAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9ULTBFVy1TRWJzRS9kb3dubG9hZCdcclxuICAgICAgfSxcclxuICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgIGxpa2VzOiA0NzYsXHJcbiAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgaWQ6ICcxTE16Wk5YNTYyaycsXHJcbiAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMTZUMjI6NTY6MTktMDQ6MDAnLFxyXG4gICAgICAgIHVzZXJuYW1lOiAnYWx2YW5uZWUnLFxyXG4gICAgICAgIG5hbWU6ICdBbHZhbiBOZWUnLFxyXG4gICAgICAgIGZpcnN0X25hbWU6ICdBbHZhbicsXHJcbiAgICAgICAgbGFzdF9uYW1lOiAnTmVlJyxcclxuICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiAnQWx2YW4gTmVlJyxcclxuICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgIGJpbzogJ0kgcmVhbGx5IGxvdmUgdW5zcGxhc2hcXHVmZjAxXFx1ZmYwMVxcdWZmMDFcXHVmZjAxXFx1ZmYwMScsXHJcbiAgICAgICAgbG9jYXRpb246ICdTaGFuZ2hhaSwgQ2hpbmEnLFxyXG4gICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlJyxcclxuICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AYWx2YW5uZWUnLFxyXG4gICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlL3Bob3RvcycsXHJcbiAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbHZhbm5lZS9saWtlcycsXHJcbiAgICAgICAgICBwb3J0Zm9saW86ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYWx2YW5uZWUvcG9ydGZvbGlvJyxcclxuICAgICAgICAgIGZvbGxvd2luZzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbHZhbm5lZS9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgZm9sbG93ZXJzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlL2ZvbGxvd2VycydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU3ODk2NDMzMjU2Ny1hZDY1Y2Y5MmU1ZDlpbWFnZT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTc4OTY0MzMyNTY3LWFkNjVjZjkyZTVkOWltYWdlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTU3ODk2NDMzMjU2Ny1hZDY1Y2Y5MmU1ZDlpbWFnZT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiAnYWx2YW5fbmVlJyxcclxuICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICB0b3RhbF9saWtlczogNjIsXHJcbiAgICAgICAgdG90YWxfcGhvdG9zOiAxNzUsXHJcbiAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHRhZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnZG9nJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdkb2cnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdEb2cnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0RvZyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBkb2cgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgXCJNYW4ncyBiZXN0IGZyaWVuZCBpcyBzb21ldGhpbmcgdG8gYmVob2xkIGluIGFsbCBmb3JtczogZ29yZ2VvdXMgR29sZGVuIFJldHJpZXZlcnMsIHRpbnkgeWFwcGluZyBjaGlodWFodWFzLCBmZWFyc29tZSBwaXRidWxscy4gVW5zcGxhc2gncyBjb21tdW5pdHkgb2YgaW5jcmVkaWJsZSBwaG90b2dyYXBoZXJzIGhhcyBoZWxwZWQgdXMgY3VyYXRlIGFuIGFtYXppbmcgc2VsZWN0aW9uIG9mIGRvZyBpbWFnZXMgdGhhdCB5b3UgY2FuIGFjY2VzcyBhbmQgdXNlIGZyZWUgb2YgY2hhcmdlLlwiLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOiAnRG9nIFBpY3R1cmVzIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGRvZyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgZG9nIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAndEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE4LTAxLTE5VDA5OjIwOjA4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMjo0NC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE4LTAxLTIwVDA1OjU5OjQ4LTA1OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogMzI2NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDQ4OTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjRjFGMkYwJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RvZyBkYXkgb3V0JyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzaG9ydC1jb2F0ZWQgYnJvd24gZG9nJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiAzMDMsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3RvR3loQlZ0Mk00JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIyVDIxOjM4OjE0LTA0OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdGcmVkcmlrIFxcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdGcmVkcmlrJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ1xcdTAwZDZobGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiAnZnJlZHJpa29obGFuZGVyQGdtYWlsLmNvbVxcclxcblxcclxcbicsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0VsIFN0b2NraG9sbW8sIFN3ZWRlbicsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDEwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDM3LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxNTEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdhbmltYWwnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogJ0FuaW1hbHMgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgYW5pbWFscyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnUGFzc2lvbmF0ZSBwaG90b2dyYXBoZXJzIGhhdmUgY2FwdHVyZWQgdGhlIG1vc3QgZ29yZ2VvdXMgYW5pbWFscyBpbiB0aGUgd29ybGQgaW4gdGhlaXIgbmF0dXJhbCBoYWJpdGF0cyBhbmQgc2hhcmVkIHRoZW0gd2l0aCBVbnNwbGFzaC4gTm93IHlvdSBjYW4gdXNlIHRoZXNlIHBob3RvcyBob3dldmVyIHlvdSB3aXNoLCBmb3IgZnJlZSEnLFxyXG4gICAgICAgICAgICBtZXRhX3RpdGxlOlxyXG4gICAgICAgICAgICAgICdCZXN0IDIwKyBBbmltYWxzIFBpY3R1cmVzIFtIRF0gfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgYW5pbWFscyBwaWN0dXJlcy4gRG93bmxvYWQgSEQgYW5pbWFscyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxNy0wNC0xOFQxMzowMDowNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDM6NTktMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxNy0wNC0xOVQxMzo1NDo1NS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDUxODQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAzNDU2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzEyMDgwMycsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgICAnSSBtZXQgdGhpcyBkdWRlIG9uIHNhZmFyaSBpbiBLcnVnZXIgTmF0aW9uYWwgcGFyayBpbiBub3J0aGVybiBTb3V0aCBBZnJpY2EuIFRoZSBnaXJhZmZlcyB3ZXJlIGVhc2lseSBpbiBteSBmYXZvcml0ZSBjcmVhdHVyZXMgdG8gd2l0bmVzcy4gVGhleSBzZWVtZWQgYWxtb3N0IHByZWhpc3RvcmljIHRoZSB0aGUgd2F5IHRoZSBncmFjZWQgdGhlIEFmcmljYW4gcGxhaW4uJyxcclxuICAgICAgICAgICAgICBhbHRfZGVzY3JpcHRpb246ICdzZWxlY3RpdmUgZm9jdXMgcGhvdG9ncmFwaHkgb2YgZ2lyYWZmZScsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogNzY4LFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdKNmNnOVRBOC1lOCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAxOS0xMS0zMFQwMjo1ODozMS0wNTowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0p1ZGFoIExlZ2dlJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6ICdKdWRhaCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdMZWdnZScsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9saWtlcycsXHJcbiAgICAgICAgICAgICAgICAgIHBvcnRmb2xpbzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2VycydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiA0LFxyXG4gICAgICAgICAgICAgICAgdG90YWxfcGhvdG9zOiAxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3NlYXJjaCcsXHJcbiAgICAgICAgICB0aXRsZTogJ3BldCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnMVZnZlFkQ3VYLTQnLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnMjAxOS0wNi0xNlQyMzo1NDowNC0wNDowMCcsXHJcbiAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTE0VDAxOjA2OjU5LTA0OjAwJyxcclxuICAgICAgcHJvbW90ZWRfYXQ6ICcyMDIwLTAzLTI4VDEzOjA2OjAxLTA0OjAwJyxcclxuICAgICAgd2lkdGg6IDE4NTEsXHJcbiAgICAgIGhlaWdodDogMjc4MCxcclxuICAgICAgY29sb3I6ICcjMjYyMTI0JyxcclxuICAgICAgZGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3doaXRlIGFuZCBicm93biBjb3JnaSBiZXNpZGVzIGJyb3duIGRvZycsXHJcbiAgICAgIHVybHM6IHtcclxuICAgICAgICByYXc6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NjA3NDM2NDEtMzkxNGYyYzQ1NjM2P2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NjA3NDM2NDEtMzkxNGYyYzQ1NjM2P2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NjA3NDM2NDEtMzkxNGYyYzQ1NjM2P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU2MDc0MzY0MS0zOTE0ZjJjNDU2MzY/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NjA3NDM2NDEtMzkxNGYyYzQ1NjM2P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvMVZnZlFkQ3VYLTQnLFxyXG4gICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvMVZnZlFkQ3VYLTQnLFxyXG4gICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zLzFWZ2ZRZEN1WC00L2Rvd25sb2FkJyxcclxuICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zLzFWZ2ZRZEN1WC00L2Rvd25sb2FkJ1xyXG4gICAgICB9LFxyXG4gICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgbGlrZXM6IDIwNyxcclxuICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgIHVzZXI6IHtcclxuICAgICAgICBpZDogJzFMTXpaTlg1NjJrJyxcclxuICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wNC0xNlQyMjo1NjoxOS0wNDowMCcsXHJcbiAgICAgICAgdXNlcm5hbWU6ICdhbHZhbm5lZScsXHJcbiAgICAgICAgbmFtZTogJ0FsdmFuIE5lZScsXHJcbiAgICAgICAgZmlyc3RfbmFtZTogJ0FsdmFuJyxcclxuICAgICAgICBsYXN0X25hbWU6ICdOZWUnLFxyXG4gICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6ICdBbHZhbiBOZWUnLFxyXG4gICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgYmlvOiAnSSByZWFsbHkgbG92ZSB1bnNwbGFzaFxcdWZmMDFcXHVmZjAxXFx1ZmYwMVxcdWZmMDFcXHVmZjAxJyxcclxuICAgICAgICBsb2NhdGlvbjogJ1NoYW5naGFpLCBDaGluYScsXHJcbiAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYWx2YW5uZWUnLFxyXG4gICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BhbHZhbm5lZScsXHJcbiAgICAgICAgICBwaG90b3M6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYWx2YW5uZWUvcGhvdG9zJyxcclxuICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlL2xpa2VzJyxcclxuICAgICAgICAgIHBvcnRmb2xpbzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9hbHZhbm5lZS9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgZm9sbG93aW5nOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2FsdmFubmVlL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICBmb2xsb3dlcnM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvYWx2YW5uZWUvZm9sbG93ZXJzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTc4OTY0MzMyNTY3LWFkNjVjZjkyZTVkOWltYWdlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1Nzg5NjQzMzI1NjctYWQ2NWNmOTJlNWQ5aW1hZ2U/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTc4OTY0MzMyNTY3LWFkNjVjZjkyZTVkOWltYWdlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW1fdXNlcm5hbWU6ICdhbHZhbl9uZWUnLFxyXG4gICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAwLFxyXG4gICAgICAgIHRvdGFsX2xpa2VzOiA2MixcclxuICAgICAgICB0b3RhbF9waG90b3M6IDE3NSxcclxuICAgICAgICBhY2NlcHRlZF90b3M6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgdGFnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdsYW5kaW5nX3BhZ2UnLFxyXG4gICAgICAgICAgdGl0bGU6ICdkb2cnLFxyXG4gICAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGFuY2VzdHJ5OiB7XHJcbiAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2ltYWdlcycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0ltYWdlcydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnYW5pbWFscycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0FuaW1hbHMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBzdWJjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2RvZycsXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlfc2x1ZzogJ0RvZydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRG9nIEltYWdlcyAmIFBpY3R1cmVzJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdEb3dubG9hZCBmcmVlIGRvZyBpbWFnZXMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICBcIk1hbidzIGJlc3QgZnJpZW5kIGlzIHNvbWV0aGluZyB0byBiZWhvbGQgaW4gYWxsIGZvcm1zOiBnb3JnZW91cyBHb2xkZW4gUmV0cmlldmVycywgdGlueSB5YXBwaW5nIGNoaWh1YWh1YXMsIGZlYXJzb21lIHBpdGJ1bGxzLiBVbnNwbGFzaCdzIGNvbW11bml0eSBvZiBpbmNyZWRpYmxlIHBob3RvZ3JhcGhlcnMgaGFzIGhlbHBlZCB1cyBjdXJhdGUgYW4gYW1hemluZyBzZWxlY3Rpb24gb2YgZG9nIGltYWdlcyB0aGF0IHlvdSBjYW4gYWNjZXNzIGFuZCB1c2UgZnJlZSBvZiBjaGFyZ2UuXCIsXHJcbiAgICAgICAgICAgIG1ldGFfdGl0bGU6ICdEb2cgUGljdHVyZXMgfCBEb3dubG9hZCBGcmVlIEltYWdlcyBvbiBVbnNwbGFzaCcsXHJcbiAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ0Nob29zZSBmcm9tIGh1bmRyZWRzIG9mIGZyZWUgZG9nIHBpY3R1cmVzLiBEb3dubG9hZCBIRCBkb2cgcGhvdG9zIGZvciBmcmVlIG9uIFVuc3BsYXNoLicsXHJcbiAgICAgICAgICAgIGNvdmVyX3Bob3RvOiB7XHJcbiAgICAgICAgICAgICAgaWQ6ICd0R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZF9hdDogJzIwMTgtMDEtMTlUMDk6MjA6MDgtMDU6MDAnLFxyXG4gICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIxVDAxOjAyOjQ0LTA0OjAwJyxcclxuICAgICAgICAgICAgICBwcm9tb3RlZF9hdDogJzIwMTgtMDEtMjBUMDU6NTk6NDgtMDU6MDAnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiAzMjY0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogNDg5NixcclxuICAgICAgICAgICAgICBjb2xvcjogJyNGMUYyRjAnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRG9nIGRheSBvdXQnLFxyXG4gICAgICAgICAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3Nob3J0LWNvYXRlZCBicm93biBkb2cnLFxyXG4gICAgICAgICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgICAgIHJhdzpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMScsXHJcbiAgICAgICAgICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJyxcclxuICAgICAgICAgICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4J1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcvZG93bmxvYWQnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3RHQlJRdzUyVGh3L2Rvd25sb2FkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgICAgICAgICAgbGlrZXM6IDMwMyxcclxuICAgICAgICAgICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAndG9HeWhCVnQyTTQnLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjJUMjE6Mzg6MTQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0ZyZWRyaWsgXFx1MDBkNmhsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0ZyZWRyaWsnLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnXFx1MDBkNmhsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBiaW86ICdmcmVkcmlrb2hsYW5kZXJAZ21haWwuY29tXFxyXFxuXFxyXFxuJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnRWwgU3RvY2tob2xtbywgU3dlZGVuJyxcclxuICAgICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL0BmcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgICBwaG90b3M6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvcGhvdG9zJyxcclxuICAgICAgICAgICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2xpa2VzJyxcclxuICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9mb2xsb3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvZm9sbG93ZXJzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9NjQmdz02NCcsXHJcbiAgICAgICAgICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS0xNTMwODY0OTM5MDQ5LWJjYzgyYjZjNDFjMj9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogJ2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMTAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9saWtlczogMzcsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9waG90b3M6IDE1MSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdGVkX3RvczogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2xhbmRpbmdfcGFnZScsXHJcbiAgICAgICAgICB0aXRsZTogJ2FuaW1hbCcsXHJcbiAgICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgYW5jZXN0cnk6IHtcclxuICAgICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnaW1hZ2VzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnSW1hZ2VzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdhbmltYWxzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnQW5pbWFscydcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQW5pbWFscyBJbWFnZXMgJiBQaWN0dXJlcycsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnRG93bmxvYWQgZnJlZSBhbmltYWxzIGltYWdlcycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdQYXNzaW9uYXRlIHBob3RvZ3JhcGhlcnMgaGF2ZSBjYXB0dXJlZCB0aGUgbW9zdCBnb3JnZW91cyBhbmltYWxzIGluIHRoZSB3b3JsZCBpbiB0aGVpciBuYXR1cmFsIGhhYml0YXRzIGFuZCBzaGFyZWQgdGhlbSB3aXRoIFVuc3BsYXNoLiBOb3cgeW91IGNhbiB1c2UgdGhlc2UgcGhvdG9zIGhvd2V2ZXIgeW91IHdpc2gsIGZvciBmcmVlIScsXHJcbiAgICAgICAgICAgIG1ldGFfdGl0bGU6XHJcbiAgICAgICAgICAgICAgJ0Jlc3QgMjArIEFuaW1hbHMgUGljdHVyZXMgW0hEXSB8IERvd25sb2FkIEZyZWUgSW1hZ2VzIG9uIFVuc3BsYXNoJyxcclxuICAgICAgICAgICAgbWV0YV9kZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBhbmltYWxzIHBpY3R1cmVzLiBEb3dubG9hZCBIRCBhbmltYWxzIHBob3RvcyBmb3IgZnJlZSBvbiBVbnNwbGFzaC4nLFxyXG4gICAgICAgICAgICBjb3Zlcl9waG90bzoge1xyXG4gICAgICAgICAgICAgIGlkOiAnWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE3LTA0LTE4VDEzOjAwOjA0LTA0OjAwJyxcclxuICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMVQwMTowMzo1OS0wNDowMCcsXHJcbiAgICAgICAgICAgICAgcHJvbW90ZWRfYXQ6ICcyMDE3LTA0LTE5VDEzOjU0OjU1LTA0OjAwJyxcclxuICAgICAgICAgICAgICB3aWR0aDogNTE4NCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDM0NTYsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMTIwODAzJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAgICdJIG1ldCB0aGlzIGR1ZGUgb24gc2FmYXJpIGluIEtydWdlciBOYXRpb25hbCBwYXJrIGluIG5vcnRoZXJuIFNvdXRoIEFmcmljYS4gVGhlIGdpcmFmZmVzIHdlcmUgZWFzaWx5IGluIG15IGZhdm9yaXRlIGNyZWF0dXJlcyB0byB3aXRuZXNzLiBUaGV5IHNlZW1lZCBhbG1vc3QgcHJlaGlzdG9yaWMgdGhlIHRoZSB3YXkgdGhlIGdyYWNlZCB0aGUgQWZyaWNhbiBwbGFpbi4nLFxyXG4gICAgICAgICAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ3NlbGVjdGl2ZSBmb2N1cyBwaG90b2dyYXBoeSBvZiBnaXJhZmZlJyxcclxuICAgICAgICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgICAgICByYXc6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEnLFxyXG4gICAgICAgICAgICAgICAgZnVsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTg1JmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9c3JnYicsXHJcbiAgICAgICAgICAgICAgICByZWd1bGFyOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCcsXHJcbiAgICAgICAgICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0yMDAmZml0PW1heCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBL2Rvd25sb2FkJyxcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9Zb3pOZUhNOE1hQS9kb3dubG9hZCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICAgIGxpa2VzOiA3NjgsXHJcbiAgICAgICAgICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ0o2Y2c5VEE4LWU4JyxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDE5LTExLTMwVDAyOjU4OjMxLTA1OjAwJyxcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnSnVkYWggTGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0p1ZGFoJyxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogJ0xlZ2dlJyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwb3J0Zm9saW9fdXJsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYmlvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGp1ZGFobGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgICBwaG90b3M6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9waG90b3MnLFxyXG4gICAgICAgICAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2xpa2VzJyxcclxuICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9wb3J0Zm9saW8nLFxyXG4gICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2VyczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvZm9sbG93ZXJzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MzImdz0zMicsXHJcbiAgICAgICAgICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLWZiLTE0OTI1MzI5MjItMDAxZjY1ZTM5MzQzLmpwZz9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWZhY2VzJmNzPXRpbnlzcmdiJmZpdD1jcm9wJmg9MTI4Jnc9MTI4J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAwLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfbGlrZXM6IDQsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9waG90b3M6IDEsXHJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZF90b3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnc2VhcmNoJyxcclxuICAgICAgICAgIHRpdGxlOiAncGV0J1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdEemlaSVlPR0FIYycsXHJcbiAgICAgIGNyZWF0ZWRfYXQ6ICcyMDE4LTAxLTMxVDEzOjMxOjM2LTA1OjAwJyxcclxuICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDQtMTRUMDE6MDE6MTgtMDQ6MDAnLFxyXG4gICAgICBwcm9tb3RlZF9hdDogJzIwMTgtMDItMDFUMDQ6MDI6NTgtMDU6MDAnLFxyXG4gICAgICB3aWR0aDogMjY4MyxcclxuICAgICAgaGVpZ2h0OiAzNDY5LFxyXG4gICAgICBjb2xvcjogJyNFQTMwMUYnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ0RvZ2d5IHdpdGggc3R5bGUuIChpbnN0YWdyYW0uY29tL3Rvc2hpLmRvZy8pJyxcclxuICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnYmxhY2sgcHVnIHdlYXJpbmcgc3RyaXBlZCBhcHBhcmVsJyxcclxuICAgICAgdXJsczoge1xyXG4gICAgICAgIHJhdzpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNzQyMzQ0MDQyOC1hNWEwMGFkNDkzZTg/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgZnVsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNzQyMzQ0MDQyOC1hNWEwMGFkNDkzZTg/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2ImaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNzQyMzQ0MDQyOC1hNWEwMGFkNDkzZTg/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE3NDIzNDQwNDI4LWE1YTAwYWQ0OTNlOD9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz00MDAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICB0aHVtYjpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNzQyMzQ0MDQyOC1hNWEwMGFkNDkzZTg/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCdcclxuICAgICAgfSxcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBzZWxmOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcy9EemlaSVlPR0FIYycsXHJcbiAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy9EemlaSVlPR0FIYycsXHJcbiAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvRHppWklZT0dBSGMvZG93bmxvYWQnLFxyXG4gICAgICAgIGRvd25sb2FkX2xvY2F0aW9uOlxyXG4gICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvRHppWklZT0dBSGMvZG93bmxvYWQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICBsaWtlczogOTE0LFxyXG4gICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgY3VycmVudF91c2VyX2NvbGxlY3Rpb25zOiBbXSxcclxuICAgICAgdXNlcjoge1xyXG4gICAgICAgIGlkOiAnbUEwOFFRelFmOFknLFxyXG4gICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTA0LTE4VDA5OjUzOjAwLTA0OjAwJyxcclxuICAgICAgICB1c2VybmFtZTogJ2NoYXJsZXNkZWx1dmlvJyxcclxuICAgICAgICBuYW1lOiAnQ2hhcmxlcyBEZWx1dmlvJyxcclxuICAgICAgICBmaXJzdF9uYW1lOiAnQ2hhcmxlcycsXHJcbiAgICAgICAgbGFzdF9uYW1lOiAnRGVsdXZpbycsXHJcbiAgICAgICAgdHdpdHRlcl91c2VybmFtZTogJ2NoYXJsZXNkZWx1dmlvJyxcclxuICAgICAgICBwb3J0Zm9saW9fdXJsOiAnaHR0cDovL2NoYXJsZXNkZWx1dmlvLmNvbScsXHJcbiAgICAgICAgYmlvOiAnR3JhcGhpYyBkZXNpZ25lciBhdCBVbnNwbGFzaCBcXHVkODNjXFx1ZGRmNVxcdWQ4M2NcXHVkZGVkJyxcclxuICAgICAgICBsb2NhdGlvbjogJ01vbnRyZWFsJyxcclxuICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9jaGFybGVzZGVsdXZpbycsXHJcbiAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGNoYXJsZXNkZWx1dmlvJyxcclxuICAgICAgICAgIHBob3RvczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9jaGFybGVzZGVsdXZpby9waG90b3MnLFxyXG4gICAgICAgICAgbGlrZXM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvY2hhcmxlc2RlbHV2aW8vbGlrZXMnLFxyXG4gICAgICAgICAgcG9ydGZvbGlvOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NoYXJsZXNkZWx1dmlvL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICBmb2xsb3dpbmc6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvY2hhcmxlc2RlbHV2aW8vZm9sbG93aW5nJyxcclxuICAgICAgICAgIGZvbGxvd2VyczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9jaGFybGVzZGVsdXZpby9mb2xsb3dlcnMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MTU2OTQ2NjA5NTYtOTEzM2IyZjUzZTNiP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MTU2OTQ2NjA5NTYtOTEzM2IyZjUzZTNiP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUxNTY5NDY2MDk1Ni05MTMzYjJmNTNlM2I/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogbnVsbCxcclxuICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMTMxLFxyXG4gICAgICAgIHRvdGFsX2xpa2VzOiA0NjUwLFxyXG4gICAgICAgIHRvdGFsX3Bob3RvczogNjMwLFxyXG4gICAgICAgIGFjY2VwdGVkX3RvczogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB0YWdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2xhbmRpbmdfcGFnZScsXHJcbiAgICAgICAgICB0aXRsZTogJ2RvZycsXHJcbiAgICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgYW5jZXN0cnk6IHtcclxuICAgICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnaW1hZ2VzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnSW1hZ2VzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdhbmltYWxzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnQW5pbWFscydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnZG9nJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnRG9nJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6ICdEb2cgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgZG9nIGltYWdlcycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgIFwiTWFuJ3MgYmVzdCBmcmllbmQgaXMgc29tZXRoaW5nIHRvIGJlaG9sZCBpbiBhbGwgZm9ybXM6IGdvcmdlb3VzIEdvbGRlbiBSZXRyaWV2ZXJzLCB0aW55IHlhcHBpbmcgY2hpaHVhaHVhcywgZmVhcnNvbWUgcGl0YnVsbHMuIFVuc3BsYXNoJ3MgY29tbXVuaXR5IG9mIGluY3JlZGlibGUgcGhvdG9ncmFwaGVycyBoYXMgaGVscGVkIHVzIGN1cmF0ZSBhbiBhbWF6aW5nIHNlbGVjdGlvbiBvZiBkb2cgaW1hZ2VzIHRoYXQgeW91IGNhbiBhY2Nlc3MgYW5kIHVzZSBmcmVlIG9mIGNoYXJnZS5cIixcclxuICAgICAgICAgICAgbWV0YV90aXRsZTogJ0RvZyBQaWN0dXJlcyB8IERvd25sb2FkIEZyZWUgSW1hZ2VzIG9uIFVuc3BsYXNoJyxcclxuICAgICAgICAgICAgbWV0YV9kZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBkb2cgcGljdHVyZXMuIERvd25sb2FkIEhEIGRvZyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxOC0wMS0xOVQwOToyMDowOC0wNTowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDI6NDQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxOC0wMS0yMFQwNTo1OTo0OC0wNTowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDMyNjQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiA0ODk2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnI0YxRjJGMCcsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEb2cgZGF5IG91dCcsXHJcbiAgICAgICAgICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnc2hvcnQtY29hdGVkIGJyb3duIGRvZycsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogMzAzLFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICd0b0d5aEJWdDJNNCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMlQyMTozODoxNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnRnJlZHJpayBcXHUwMGQ2aGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAnRnJlZHJpaycsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdcXHUwMGQ2aGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogJ2ZyZWRyaWtvaGxhbmRlckBnbWFpbC5jb21cXHJcXG5cXHJcXG4nLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICdFbCBTdG9ja2hvbG1vLCBTd2VkZW4nLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIHBob3RvczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9waG90b3MnLFxyXG4gICAgICAgICAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvbGlrZXMnLFxyXG4gICAgICAgICAgICAgICAgICBwb3J0Zm9saW86XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2VyczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9mb2xsb3dlcnMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAxMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiAzNyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX3Bob3RvczogMTUxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnYW5pbWFsJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6ICdBbmltYWxzIEltYWdlcyAmIFBpY3R1cmVzJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdEb3dubG9hZCBmcmVlIGFuaW1hbHMgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ1Bhc3Npb25hdGUgcGhvdG9ncmFwaGVycyBoYXZlIGNhcHR1cmVkIHRoZSBtb3N0IGdvcmdlb3VzIGFuaW1hbHMgaW4gdGhlIHdvcmxkIGluIHRoZWlyIG5hdHVyYWwgaGFiaXRhdHMgYW5kIHNoYXJlZCB0aGVtIHdpdGggVW5zcGxhc2guIE5vdyB5b3UgY2FuIHVzZSB0aGVzZSBwaG90b3MgaG93ZXZlciB5b3Ugd2lzaCwgZm9yIGZyZWUhJyxcclxuICAgICAgICAgICAgbWV0YV90aXRsZTpcclxuICAgICAgICAgICAgICAnQmVzdCAyMCsgQW5pbWFscyBQaWN0dXJlcyBbSERdIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGFuaW1hbHMgcGljdHVyZXMuIERvd25sb2FkIEhEIGFuaW1hbHMgcGhvdG9zIGZvciBmcmVlIG9uIFVuc3BsYXNoLicsXHJcbiAgICAgICAgICAgIGNvdmVyX3Bob3RvOiB7XHJcbiAgICAgICAgICAgICAgaWQ6ICdZb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZF9hdDogJzIwMTctMDQtMThUMTM6MDA6MDQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIxVDAxOjAzOjU5LTA0OjAwJyxcclxuICAgICAgICAgICAgICBwcm9tb3RlZF9hdDogJzIwMTctMDQtMTlUMTM6NTQ6NTUtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiA1MTg0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogMzQ1NixcclxuICAgICAgICAgICAgICBjb2xvcjogJyMxMjA4MDMnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICAgJ0kgbWV0IHRoaXMgZHVkZSBvbiBzYWZhcmkgaW4gS3J1Z2VyIE5hdGlvbmFsIHBhcmsgaW4gbm9ydGhlcm4gU291dGggQWZyaWNhLiBUaGUgZ2lyYWZmZXMgd2VyZSBlYXNpbHkgaW4gbXkgZmF2b3JpdGUgY3JlYXR1cmVzIHRvIHdpdG5lc3MuIFRoZXkgc2VlbWVkIGFsbW9zdCBwcmVoaXN0b3JpYyB0aGUgdGhlIHdheSB0aGUgZ3JhY2VkIHRoZSBBZnJpY2FuIHBsYWluLicsXHJcbiAgICAgICAgICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnc2VsZWN0aXZlIGZvY3VzIHBob3RvZ3JhcGh5IG9mIGdpcmFmZmUnLFxyXG4gICAgICAgICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgICAgIHJhdzpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMScsXHJcbiAgICAgICAgICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJyxcclxuICAgICAgICAgICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4J1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBL2Rvd25sb2FkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgICAgICAgICAgbGlrZXM6IDc2OCxcclxuICAgICAgICAgICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnSjZjZzlUQTgtZTgnLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMTktMTEtMzBUMDI6NTg6MzEtMDU6MDAnLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdKdWRhaCBMZWdnZScsXHJcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAnSnVkYWgnLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnTGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBiaW86IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICAgIHBob3RvczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvbGlrZXMnLFxyXG4gICAgICAgICAgICAgICAgICBwb3J0Zm9saW86XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dlcnMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9saWtlczogNCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX3Bob3RvczogMSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdGVkX3RvczogZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdzZWFyY2gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdwZXQnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJzJzNk9SYUpZNmdJJyxcclxuICAgICAgY3JlYXRlZF9hdDogJzIwMTctMTEtMTVUMTU6MTk6NTgtMDU6MDAnLFxyXG4gICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wNC0xNFQwMTowNDozNC0wNDowMCcsXHJcbiAgICAgIHByb21vdGVkX2F0OiBudWxsLFxyXG4gICAgICB3aWR0aDogMTM2MixcclxuICAgICAgaGVpZ2h0OiAyNDIxLFxyXG4gICAgICBjb2xvcjogJyNGOEY3RjYnLFxyXG4gICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAnV2VsbFxcdTIwMjYgSSBqdXN0IGdhdmUgdGhlIGZsb3dlciB0byBteSBkb2cgYW5kIGhlIGRpZCBpdCA6RCwgaGVcXHUyMDE5cyBhIGdvb2QgYm95IGFuZCBhIGdyZWF0IG1vZGVsLiBCdXQgYXQgdGhlIGVuZCBoZSBhbG1vc3QgYXRlIHRoZSBmbG93ZXIgaGFoYS4gQW5kIHRoYXRcXHUyMDE5cyB0aGUgcGljdHVyZVxcdTIwMjYgdGhlIGZsb3dlciBhbmQgdGhlIGRvZycsXHJcbiAgICAgIGFsdF9kZXNjcmlwdGlvbjogJ2RvZyBob2xkaW5nIGZsb3dlcicsXHJcbiAgICAgIHVybHM6IHtcclxuICAgICAgICByYXc6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTA3NzE0NjMxNDYtZTg5ZTZlODY1NjBlP2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTA3NzE0NjMxNDYtZTg5ZTZlODY1NjBlP2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnLFxyXG4gICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTA3NzE0NjMxNDYtZTg5ZTZlODY1NjBlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTEwODAmZml0PW1heCZpeGlkPWV5SmhjSEJmYVdRaU9qRXlPRE13Tm4wJyxcclxuICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMDc3MTQ2MzE0Ni1lODllNmU4NjU2MGU/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgmaXhpZD1leUpoY0hCZmFXUWlPakV5T0RNd05uMCcsXHJcbiAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTA3NzE0NjMxNDYtZTg5ZTZlODY1NjBlP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4Jml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU9ETXdObjAnXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvMnM2T1JhSlk2Z0knLFxyXG4gICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvMnM2T1JhSlk2Z0knLFxyXG4gICAgICAgIGRvd25sb2FkOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zLzJzNk9SYUpZNmdJL2Rvd25sb2FkJyxcclxuICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zLzJzNk9SYUpZNmdJL2Rvd25sb2FkJ1xyXG4gICAgICB9LFxyXG4gICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgbGlrZXM6IDU4MixcclxuICAgICAgbGlrZWRfYnlfdXNlcjogZmFsc2UsXHJcbiAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgIHVzZXI6IHtcclxuICAgICAgICBpZDogJ3FrTHBEbTFvU1J3JyxcclxuICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0xN1QwNToxMjowNi0wNDowMCcsXHJcbiAgICAgICAgdXNlcm5hbWU6ICdjZWxpbmVfc2F5dXJpJyxcclxuICAgICAgICBuYW1lOiAnQ2VsaW5lIFNheXVyaSBUYWdhbWknLFxyXG4gICAgICAgIGZpcnN0X25hbWU6ICdDZWxpbmUnLFxyXG4gICAgICAgIGxhc3RfbmFtZTogJ1NheXVyaSBUYWdhbWknLFxyXG4gICAgICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICBiaW86IG51bGwsXHJcbiAgICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvY2VsaW5lX3NheXVyaScsXHJcbiAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGNlbGluZV9zYXl1cmknLFxyXG4gICAgICAgICAgcGhvdG9zOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NlbGluZV9zYXl1cmkvcGhvdG9zJyxcclxuICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NlbGluZV9zYXl1cmkvbGlrZXMnLFxyXG4gICAgICAgICAgcG9ydGZvbGlvOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2NlbGluZV9zYXl1cmkvcG9ydGZvbGlvJyxcclxuICAgICAgICAgIGZvbGxvd2luZzogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9jZWxpbmVfc2F5dXJpL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICBmb2xsb3dlcnM6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvY2VsaW5lX3NheXVyaS9mb2xsb3dlcnMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9maWxlX2ltYWdlOiB7XHJcbiAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MTc1MjQwMDA5MzYtNzAzMDJiMTA4ZmQ1P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgIG1lZGl1bTpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MTc1MjQwMDA5MzYtNzAzMDJiMTA4ZmQ1P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgIGxhcmdlOlxyXG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUxNzUyNDAwMDkzNi03MDMwMmIxMDhmZDU/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTEyOCZ3PTEyOCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbV91c2VybmFtZTogJ2NlbGluZS5zLnQgJyxcclxuICAgICAgICB0b3RhbF9jb2xsZWN0aW9uczogMCxcclxuICAgICAgICB0b3RhbF9saWtlczogMSxcclxuICAgICAgICB0b3RhbF9waG90b3M6IDAsXHJcbiAgICAgICAgYWNjZXB0ZWRfdG9zOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICB0YWdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2xhbmRpbmdfcGFnZScsXHJcbiAgICAgICAgICB0aXRsZTogJ2RvZycsXHJcbiAgICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgYW5jZXN0cnk6IHtcclxuICAgICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnaW1hZ2VzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnSW1hZ2VzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdhbmltYWxzJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnQW5pbWFscydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICBzbHVnOiAnZG9nJyxcclxuICAgICAgICAgICAgICAgIHByZXR0eV9zbHVnOiAnRG9nJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6ICdEb2cgSW1hZ2VzICYgUGljdHVyZXMnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0Rvd25sb2FkIGZyZWUgZG9nIGltYWdlcycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgIFwiTWFuJ3MgYmVzdCBmcmllbmQgaXMgc29tZXRoaW5nIHRvIGJlaG9sZCBpbiBhbGwgZm9ybXM6IGdvcmdlb3VzIEdvbGRlbiBSZXRyaWV2ZXJzLCB0aW55IHlhcHBpbmcgY2hpaHVhaHVhcywgZmVhcnNvbWUgcGl0YnVsbHMuIFVuc3BsYXNoJ3MgY29tbXVuaXR5IG9mIGluY3JlZGlibGUgcGhvdG9ncmFwaGVycyBoYXMgaGVscGVkIHVzIGN1cmF0ZSBhbiBhbWF6aW5nIHNlbGVjdGlvbiBvZiBkb2cgaW1hZ2VzIHRoYXQgeW91IGNhbiBhY2Nlc3MgYW5kIHVzZSBmcmVlIG9mIGNoYXJnZS5cIixcclxuICAgICAgICAgICAgbWV0YV90aXRsZTogJ0RvZyBQaWN0dXJlcyB8IERvd25sb2FkIEZyZWUgSW1hZ2VzIG9uIFVuc3BsYXNoJyxcclxuICAgICAgICAgICAgbWV0YV9kZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgICAnQ2hvb3NlIGZyb20gaHVuZHJlZHMgb2YgZnJlZSBkb2cgcGljdHVyZXMuIERvd25sb2FkIEhEIGRvZyBwaG90b3MgZm9yIGZyZWUgb24gVW5zcGxhc2guJyxcclxuICAgICAgICAgICAgY292ZXJfcGhvdG86IHtcclxuICAgICAgICAgICAgICBpZDogJ3RHQlJRdzUyVGh3JyxcclxuICAgICAgICAgICAgICBjcmVhdGVkX2F0OiAnMjAxOC0wMS0xOVQwOToyMDowOC0wNTowMCcsXHJcbiAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMjAtMDMtMjFUMDE6MDI6NDQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHByb21vdGVkX2F0OiAnMjAxOC0wMS0yMFQwNTo1OTo0OC0wNTowMCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IDMyNjQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiA0ODk2LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnI0YxRjJGMCcsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEb2cgZGF5IG91dCcsXHJcbiAgICAgICAgICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnc2hvcnQtY29hdGVkIGJyb3duIGRvZycsXHJcbiAgICAgICAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICAgICAgcmF3OlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTYzNzE1MzU3MDctNTEyYTFlODNiYjlhP2l4bGliPXJiLTEuMi4xJyxcclxuICAgICAgICAgICAgICAgIGZ1bGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04NSZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXNyZ2InLFxyXG4gICAgICAgICAgICAgICAgcmVndWxhcjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE2MzcxNTM1NzA3LTUxMmExZTgzYmI5YT9peGxpYj1yYi0xLjIuMSZxPTgwJmZtPWpwZyZjcm9wPWVudHJvcHkmY3M9dGlueXNyZ2Imdz0xMDgwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgc21hbGw6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9NDAwJmZpdD1tYXgnLFxyXG4gICAgICAgICAgICAgICAgdGh1bWI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNjM3MTUzNTcwNy01MTJhMWU4M2JiOWE/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MjAwJmZpdD1tYXgnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsaW5rczoge1xyXG4gICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcnLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRodycsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy90R0JSUXc1MlRody9kb3dubG9hZCcsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZF9sb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvdEdCUlF3NTJUaHcvZG93bmxvYWQnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICAgICAgICBsaWtlczogMzAzLFxyXG4gICAgICAgICAgICAgIGxpa2VkX2J5X3VzZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRfdXNlcl9jb2xsZWN0aW9uczogW10sXHJcbiAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICd0b0d5aEJWdDJNNCcsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiAnMjAyMC0wMy0yMlQyMTozODoxNC0wNDowMCcsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJ2ZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnRnJlZHJpayBcXHUwMGQ2aGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAnRnJlZHJpaycsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6ICdcXHUwMGQ2aGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG9ydGZvbGlvX3VybDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGJpbzogJ2ZyZWRyaWtvaGxhbmRlckBnbWFpbC5jb21cXHJcXG5cXHJcXG4nLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICdFbCBTdG9ja2hvbG1vLCBTd2VkZW4nLFxyXG4gICAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZjogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXInLFxyXG4gICAgICAgICAgICAgICAgICBodG1sOiAnaHR0cHM6Ly91bnNwbGFzaC5jb20vQGZyZWRyaWtvaGxhbmRlcicsXHJcbiAgICAgICAgICAgICAgICAgIHBob3RvczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9waG90b3MnLFxyXG4gICAgICAgICAgICAgICAgICBsaWtlczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvbGlrZXMnLFxyXG4gICAgICAgICAgICAgICAgICBwb3J0Zm9saW86XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9mcmVkcmlrb2hsYW5kZXIvcG9ydGZvbGlvJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvZnJlZHJpa29obGFuZGVyL2ZvbGxvd2luZycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2VyczpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2ZyZWRyaWtvaGxhbmRlci9mb2xsb3dlcnMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtMTUzMDg2NDkzOTA0OS1iY2M4MmI2YzQxYzI/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTMyJnc9MzInLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpdW06XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD02NCZ3PTY0JyxcclxuICAgICAgICAgICAgICAgICAgbGFyZ2U6XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9wcm9maWxlLTE1MzA4NjQ5MzkwNDktYmNjODJiNmM0MWMyP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiAnZnJlZHJpa29obGFuZGVyJyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2NvbGxlY3Rpb25zOiAxMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX2xpa2VzOiAzNyxcclxuICAgICAgICAgICAgICAgIHRvdGFsX3Bob3RvczogMTUxLFxyXG4gICAgICAgICAgICAgICAgYWNjZXB0ZWRfdG9zOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbGFuZGluZ19wYWdlJyxcclxuICAgICAgICAgIHRpdGxlOiAnYW5pbWFsJyxcclxuICAgICAgICAgIHNvdXJjZToge1xyXG4gICAgICAgICAgICBhbmNlc3RyeToge1xyXG4gICAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNsdWc6ICdpbWFnZXMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdJbWFnZXMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgICAgICAgc2x1ZzogJ2FuaW1hbHMnLFxyXG4gICAgICAgICAgICAgICAgcHJldHR5X3NsdWc6ICdBbmltYWxzJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6ICdBbmltYWxzIEltYWdlcyAmIFBpY3R1cmVzJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdEb3dubG9hZCBmcmVlIGFuaW1hbHMgaW1hZ2VzJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgJ1Bhc3Npb25hdGUgcGhvdG9ncmFwaGVycyBoYXZlIGNhcHR1cmVkIHRoZSBtb3N0IGdvcmdlb3VzIGFuaW1hbHMgaW4gdGhlIHdvcmxkIGluIHRoZWlyIG5hdHVyYWwgaGFiaXRhdHMgYW5kIHNoYXJlZCB0aGVtIHdpdGggVW5zcGxhc2guIE5vdyB5b3UgY2FuIHVzZSB0aGVzZSBwaG90b3MgaG93ZXZlciB5b3Ugd2lzaCwgZm9yIGZyZWUhJyxcclxuICAgICAgICAgICAgbWV0YV90aXRsZTpcclxuICAgICAgICAgICAgICAnQmVzdCAyMCsgQW5pbWFscyBQaWN0dXJlcyBbSERdIHwgRG93bmxvYWQgRnJlZSBJbWFnZXMgb24gVW5zcGxhc2gnLFxyXG4gICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICdDaG9vc2UgZnJvbSBodW5kcmVkcyBvZiBmcmVlIGFuaW1hbHMgcGljdHVyZXMuIERvd25sb2FkIEhEIGFuaW1hbHMgcGhvdG9zIGZvciBmcmVlIG9uIFVuc3BsYXNoLicsXHJcbiAgICAgICAgICAgIGNvdmVyX3Bob3RvOiB7XHJcbiAgICAgICAgICAgICAgaWQ6ICdZb3pOZUhNOE1hQScsXHJcbiAgICAgICAgICAgICAgY3JlYXRlZF9hdDogJzIwMTctMDQtMThUMTM6MDA6MDQtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6ICcyMDIwLTAzLTIxVDAxOjAzOjU5LTA0OjAwJyxcclxuICAgICAgICAgICAgICBwcm9tb3RlZF9hdDogJzIwMTctMDQtMTlUMTM6NTQ6NTUtMDQ6MDAnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiA1MTg0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogMzQ1NixcclxuICAgICAgICAgICAgICBjb2xvcjogJyMxMjA4MDMnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAgICAgJ0kgbWV0IHRoaXMgZHVkZSBvbiBzYWZhcmkgaW4gS3J1Z2VyIE5hdGlvbmFsIHBhcmsgaW4gbm9ydGhlcm4gU291dGggQWZyaWNhLiBUaGUgZ2lyYWZmZXMgd2VyZSBlYXNpbHkgaW4gbXkgZmF2b3JpdGUgY3JlYXR1cmVzIHRvIHdpdG5lc3MuIFRoZXkgc2VlbWVkIGFsbW9zdCBwcmVoaXN0b3JpYyB0aGUgdGhlIHdheSB0aGUgZ3JhY2VkIHRoZSBBZnJpY2FuIHBsYWluLicsXHJcbiAgICAgICAgICAgICAgYWx0X2Rlc2NyaXB0aW9uOiAnc2VsZWN0aXZlIGZvY3VzIHBob3RvZ3JhcGh5IG9mIGdpcmFmZmUnLFxyXG4gICAgICAgICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgICAgIHJhdzpcclxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDkyNTM0NTEzMDA2LTM3NzE1ZjMzNmEzOT9peGxpYj1yYi0xLjIuMScsXHJcbiAgICAgICAgICAgICAgICBmdWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODUmZm09anBnJmNyb3A9ZW50cm9weSZjcz1zcmdiJyxcclxuICAgICAgICAgICAgICAgIHJlZ3VsYXI6XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MjUzNDUxMzAwNi0zNzcxNWYzMzZhMzk/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1lbnRyb3B5JmNzPXRpbnlzcmdiJnc9MTA4MCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHNtYWxsOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTQwMCZmaXQ9bWF4JyxcclxuICAgICAgICAgICAgICAgIHRodW1iOlxyXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTI1MzQ1MTMwMDYtMzc3MTVmMzM2YTM5P2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZW50cm9weSZjcz10aW55c3JnYiZ3PTIwMCZmaXQ9bWF4J1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlua3M6IHtcclxuICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBJyxcclxuICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWW96TmVITThNYUEvZG93bmxvYWQnLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRfbG9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL1lvek5lSE04TWFBL2Rvd25sb2FkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXHJcbiAgICAgICAgICAgICAgbGlrZXM6IDc2OCxcclxuICAgICAgICAgICAgICBsaWtlZF9ieV91c2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjdXJyZW50X3VzZXJfY29sbGVjdGlvbnM6IFtdLFxyXG4gICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnSjZjZzlUQTgtZTgnLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogJzIwMTktMTEtMzBUMDI6NTg6MzEtMDU6MDAnLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6ICdqdWRhaGxlZ2dlJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdKdWRhaCBMZWdnZScsXHJcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAnSnVkYWgnLFxyXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnTGVnZ2UnLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcl91c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcnRmb2xpb191cmw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBiaW86IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGY6ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICAgIGh0bWw6ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AanVkYWhsZWdnZScsXHJcbiAgICAgICAgICAgICAgICAgIHBob3RvczogJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL3Bob3RvcycsXHJcbiAgICAgICAgICAgICAgICAgIGxpa2VzOiAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvbGlrZXMnLFxyXG4gICAgICAgICAgICAgICAgICBwb3J0Zm9saW86XHJcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS91c2Vycy9qdWRhaGxlZ2dlL3BvcnRmb2xpbycsXHJcbiAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3VzZXJzL2p1ZGFobGVnZ2UvZm9sbG93aW5nJyxcclxuICAgICAgICAgICAgICAgICAgZm9sbG93ZXJzOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vdXNlcnMvanVkYWhsZWdnZS9mb2xsb3dlcnMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9pbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICBzbWFsbDpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0zMiZ3PTMyJyxcclxuICAgICAgICAgICAgICAgICAgbWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcHJvZmlsZS1mYi0xNDkyNTMyOTIyLTAwMWY2NWUzOTM0My5qcGc/aXhsaWI9cmItMS4yLjEmcT04MCZmbT1qcGcmY3JvcD1mYWNlcyZjcz10aW55c3JnYiZmaXQ9Y3JvcCZoPTY0Jnc9NjQnLFxyXG4gICAgICAgICAgICAgICAgICBsYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Byb2ZpbGUtZmItMTQ5MjUzMjkyMi0wMDFmNjVlMzkzNDMuanBnP2l4bGliPXJiLTEuMi4xJnE9ODAmZm09anBnJmNyb3A9ZmFjZXMmY3M9dGlueXNyZ2ImZml0PWNyb3AmaD0xMjgmdz0xMjgnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zdGFncmFtX3VzZXJuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgdG90YWxfY29sbGVjdGlvbnM6IDAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbF9saWtlczogNCxcclxuICAgICAgICAgICAgICAgIHRvdGFsX3Bob3RvczogMSxcclxuICAgICAgICAgICAgICAgIGFjY2VwdGVkX3RvczogZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdzZWFyY2gnLFxyXG4gICAgICAgICAgdGl0bGU6ICdwZXQnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGhvdG9EYXRhO1xyXG4iLCJpbXBvcnQgcGhvdG9EYXRhIGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCBMb2NhbENhY2hlIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvY2FsQ2FjaGUnO1xyXG5cclxuY2xhc3MgVW5zcGxhc2hTZXJ2aWNlIHtcclxuICBzdGF0aWMgZ2V0RGF0YShwYWdlTnIgPSAxKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXNvbHZlKHBob3RvRGF0YS5yZXN1bHRzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFsbChwYWdlTnIpIHtcclxuICAgIHJldHVybiBVbnNwbGFzaFNlcnZpY2UuZ2V0RGF0YShwYWdlTnIpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNlYXJjaChwYWdlTnIpIHtcclxuICAgIHJldHVybiBVbnNwbGFzaFNlcnZpY2UuZ2V0RGF0YShwYWdlTnIpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZhdm91cml0ZXMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXNvbHZlKExvY2FsQ2FjaGUuZ2V0RGF0YSgpKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVW5zcGxhc2hTZXJ2aWNlO1xyXG4iLCJjb25zdCBMT0NBTFNUT1JBR0VfS0VZID0gJ3Bob3RvQXBwRmF2b3VyaXRlcyc7XHJcblxyXG5jbGFzcyBMb2NhbENhY2hlIHtcclxuICBERUZBVUxUX0RBVEEgPSB7fTtcclxuXHJcbiAgc3RhdGljIGdldERhdGEgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxTVE9SQUdFX0tFWSk7XHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgc2F2ZURhdGEodGhpcy5ERUZBVUxUX0RBVEEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5ERUZBVUxUX0RBVEE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgc2F2ZURhdGEgPSBkYXRhID0+XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gIHN0YXRpYyByZW1vdmVJdGVtID0gaWQgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgZGVsZXRlIGRhdGFbaWRdO1xyXG4gICAgdGhpcy5zYXZlRGF0YShkYXRhKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgYWRkSXRlbSA9IGl0ZW0gPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgZGF0YVtpdGVtLmlkXSA9IGl0ZW07XHJcbiAgICB0aGlzLnNhdmVEYXRhKGRhdGEpO1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBpc0ZhdiA9IGlkID0+IEJvb2xlYW4odGhpcy5nZXREYXRhKClbaWRdKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxDYWNoZTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
import ImageService from '../../mocks/UnsplashService';
import Gallery, { events as galleryEvents } from '../gallery';
import Search, { events as searchEvents } from '../search';
import ImageModal, { events as modalEvents } from '../image-modal';
import {events as favToggleEvents} from '../fav-toggle';

const gallery = new Gallery();
const search = new Search('search');
const imageModal = new ImageModal();

const routes = {
  HOME: 'home',
  SEARCH: 'search',
  FAVOURITES: 'favourites'
};

class PageController {
  pageNr = 1;
  ctx = null;
  title = null;
  subTitle = null;
  loadMoreBtn = null;
  gallery = null;

  constructor(ctx) {
    this.ctx = ctx || document.body;
  }

  async onSearchedTerm(evt) {
    const term = evt.detail;
    gallery.load(await ImageService.search(term));
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

    gallery.loadMore(await ImageService[imageServicePropName](this.pageNr));
  }
  startListening() {

    this.ctx.addEventListener(searchEvents.SEARCHED_TERM_CHANGED, evt =>
      this.onSearchedTerm(evt)
    );

    this.ctx.addEventListener(galleryEvents.LOAD_MORE, () =>
      this.onOnLoadMore()
    );

    this.ctx.addEventListener(galleryEvents.IMAGE_SELECTED, evt => {
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
    })

    window.addEventListener('hashchange', () => this.onHashChange());
    // handling the hash on page load
    this.onHashChange();

    this.ctx.addEventListener(favToggleEvents.IMAGE_FAVED, (evt) => {
      if(this.getHash() == routes.FAVOURITES) {
        const {detail:image} = evt;
        gallery.addItem(image);
      }
    });

    this.ctx.addEventListener(favToggleEvents.IMAGE_UNFAVED, (evt) => {
      if(this.getHash() == routes.FAVOURITES) {      
        const {detail:image} = evt;
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
        search.hide()
        this.renderTitle();
        gallery.load(await ImageService.all());
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
        gallery.load(await ImageService.favourites());
        this.showLoadMoreBtn();
        this.normalGalleryPosition();
        break;
    }
  }

  renderTitle() {
    this.title = document.querySelector('.header__title');
    this.subTitle = document.querySelector('.header__sub-title');
    if(this.getHash() == routes.FAVOURITES) {
      this.title.innerText = 'Favourites';
      this.subTitle.innerText = 'my favourite photos';
    }
    if(this.getHash() == routes.HOME) {
      this.title.innerText = 'Home';
      this.subTitle.innerText = 'latest photos';
    }
    if(this.getHash() == routes.SEARCH) {
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

export default PageController;

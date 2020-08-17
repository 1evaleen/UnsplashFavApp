const events = {
  LOAD_MORE: 'galleryLoadMoreEvent',
  IMAGE_SELECTED: 'galleryImageSelectedEvent'
};

class Gallery {
  ctx = null;
  el = null;
  images = null;
  bemBlock = '';
  imagesContainer = null;

  css = {
    li: () => `${this.bemBlock}__list__item`,
    list: () => `${this.bemBlock}__list`
  };

  constructor(bemBlockSelector = 'gallery', ctx) {
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
        this.ctx.dispatchEvent(
          new CustomEvent(events.LOAD_MORE)
        )
      }

      if (evt.target.dataset.item === 'image') {
        this.ctx.dispatchEvent(
          new CustomEvent(events.IMAGE_SELECTED, {
            detail: this.images[evt.target.dataset.id]
          })
        );
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
    if(node) {
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

    this.images = { ...this.images, ..._images };

    // append the new images
    this.render(_images, false);
  }
}

export { Gallery as default, events };

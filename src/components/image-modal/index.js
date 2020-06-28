import FavToggle from '../fav-toggle';

class ImageModal {
    ctx = null;
    el = null;
    id = '';
    selectors = {
        close: '[data-action-close]',
        download: '[data-action-download]',
        favourite: '#fav-toggle'
    }
    
    // main image data
    _data = null;
    
    downloadBtn = null;
    closeBtn = null;
    
    // fav toggle component parent element
    favIconEl = null;
    
    // the instance of the fav toggle component
    favToggle = null;

    image = null;
    profile = null
    name = null;

    constructor (ctx) {
        this.el = document.querySelector('.modal');
        if (!this.el) {
            throw new Error('Can\'t find element');
        }
        this.ctx = ctx || document.body;
        this.initHeader();
        this.initBody();

        this.favIconEl = document.querySelector(this.selectors.favourite);
        this.favToggle = new FavToggle(this.favIconEl, null, ['modal__action']);

        this.setupEventListeners();
    }

    set data(imageData) {
        if(!imageData) return;
        this._data = imageData;
        this.favToggle.data = imageData;
        this.rehydrate();
    }

    setupEventListeners () {
        this.closeBtn.addEventListener('click', () => {
            this.hide();
            this.ctx.dispatchEvent(new CustomEvent('modalImageClosed'))
        })
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
    }

    rehydrate() {
        const {urls, user} = this._data;
        this.image.style.backgroundImage = `url('${urls.small}')`;
        this.profile.style.backgroundImage = `url('${user.profile_image.small}')`;
        const nameText = document.createTextNode(user.name);
        
        // clear 
        this.name.innerHTML = '';

        // update
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
        this.el.classList.add('hide');
        // if on fav # need to refresh page
    }

    downloadImage () {
        console.log('I clicked download');
    }
}

export default ImageModal;
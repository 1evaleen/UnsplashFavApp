class GalleryView {
    toggleViewBtn = null;
    galleryList = null;
    tileGalleryView = false;

    constructor () {
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

export default GalleryView;
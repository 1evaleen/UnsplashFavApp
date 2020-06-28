
const headers = {
    'Authorization': 'Client-ID Agmf0iach3FKZdUKXw_T7I_BApmKTgliMXnES5tr2Ss'
};
const API = 'https://api.unsplash.com/';
const options = { headers };
let data = {};
let currPage = 1;
let toggleViewBtn = document.querySelector('.toggle-gallery-view');
let tileGalleryView = false;

const modalEl = document.querySelector('.modal');
const modalImg = document.querySelector('.modal__img');
const modalProfilePic = document.querySelector('.modal__footer__photographer-profile-pic');
const modalNameEl = document.querySelector('.modal__footer__photographer-name');
const modalCloseButton = document.querySelector('.modal__header__close-btn');
const modalDownloadBtn = document.querySelector('.modal__header__download');
const favIconEl = document.querySelector('.modal__header__add-remove-favourite');
const gallery = document.querySelector('.gallery');
const galleryList = document.querySelector('.gallery__list');
const seeMoreButton = document.querySelector('.gallery__see-more-btn');
const navSearchBtn = document.querySelector('.footer__nav--search');
const navFavouritesBtn = document.querySelector('.footer__nav--favourites');
const navHomeBtn = document.querySelector('.footer__nav--home');
let searchPage = document.querySelector('.search-page');
let homePage = document.querySelector('.home-page');
let favouritesPage = document.querySelector('.favourites-page');
let headerTitle = document.querySelector('.header__title');
let headerSubTitle = document.querySelector('.header__sub-title');

const favIcon = new FavToggle({
    parent: favIconEl
});
const pageController = new PageController();
pageController.startListening();

// unused sofar
var searchInput = document.querySelector('.search-box');
var searchButton = document.querySelector('.search-button');
var searchGallery = document.querySelector('.search-gallery');
var imgList = document.querySelector('.img-list');
var favGallery = document.querySelector('.fav-gallery');
var favImgList = document.querySelector('.fav-img-list');

// init();
function init() {
    getLatestPhotoData(currPage)
        .then(responseData => responseData.json())
        .then(jsonData => {
            renderPhotos(jsonData);
            saveToMemory(jsonData);
        });
    eventHandlers();
}
function eventHandlers() {
    gallery.addEventListener('click', openModal);
    seeMoreButton.addEventListener('click', loadMorePhotos);
    modalCloseButton.addEventListener('click', closeModal);
    toggleViewBtn.addEventListener('click', toggleGalleryView);
    window.addEventListener('toggleFav', toggleFav);

}
function getLatestPhotoData(pageNumber) {
    const url = API + 'photos?per_page=9&order_by=latest' + '&page=' + pageNumber;
    return fetch(url, options);
}
function getSearchedPhotoData(pageNumber) {
    const searchedTerm = searchInput.value;
    const url = API + 'search/photos?per_page=9&query=' + searchedTerm + '&page=' + pageNumber;

    return fetch(url, options);
}
function saveToMemory(photos) {
    for (var i = 0; i < photos.length; i++) {
        currItem = photos[i]
        data[currItem.id] = currItem;
    }
}
function clearGallery() {
    imgList.innerHTML = '';
    data = {};
}
function buildPhotoEl(data) {
    var newHomePhotoBoxEl = document.createElement('div');
    newHomePhotoBoxEl.style.backgroundImage = `url('${data.urls.small}')`;
    newHomePhotoBoxEl.className = 'gallery__list__item';
    newHomePhotoBoxEl.dataset.urlSmall = data.urls.small;
    newHomePhotoBoxEl.dataset.profilePic = data.user.profile_image.small;
    newHomePhotoBoxEl.dataset.name = data.user.name;
    newHomePhotoBoxEl.dataset.download = data.links.download_location;
    newHomePhotoBoxEl.dataset.id = data.id;
    return newHomePhotoBoxEl;
}
function renderPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
        var photoEl = buildPhotoEl(photos[i]);
        galleryList.appendChild(photoEl);
    }
}
function toggleGalleryView(evt) {
    tileGalleryView = !tileGalleryView;
    if (tileGalleryView) {
        toggleViewBtn.style.backgroundImage = "url('./assets/tile.svg')";
        galleryList.classList.add('tile-view');
    } else {
        toggleViewBtn.style.backgroundImage = "url('./assets/list.svg')";
        galleryList.classList.remove('tile-view');
    }
}
function openModal(evt) {
    const el = evt.target;
    const d = el.dataset;

    // settig the current id on the Fav Component
    favIcon.id = d.id;

    // setting the download link
    modalDownloadBtn.href = d.download;

    if (el.classList.contains('gallery__list__item')) {
        modalEl.classList.remove('modal_hide');
        modalImg.style.backgroundImage = `url('${d.urlSmall}')`;
        modalProfilePic.style.backgroundImage = `url('${d.profilePic}')`;
        const nameText = document.createTextNode(d.name);
        modalNameEl.innerHTML = '';
        modalNameEl.appendChild(nameText);
    }
}

function closeModal() {
    modalEl.classList.add('modal_hide');
    // refresh the page
    if (favGallery) {
        // refresh the fav images

        renderFavourites(favs);
    }
}
function toggleFav(evt) {
    const id = evt.detail.id;
    if (isFav(id)) {
        removeItem(id);
        window.dispatchEvent(new CustomEvent('hasBeenUnfaved', { detail: { id: id } }))
    } else {
        addItem(data[id]);
        window.dispatchEvent(new CustomEvent('hasBeenFaved', { detail: { id: id } }))
    }
}

function loadMorePhotos(evt) {
    currPage++;
    getLatestPhotoData(currPage);
}

// search page ---------------------------------------

function openSearchPage(evt) {
    let searchPgClone = searchPage.content.cloneNode(true);
    const gallery = searchPgClone.querySelector('.gallery');
    gallery.classList.add('search-page');

    document.body.appendChild(searchPgClone);
    homePage.innerHTML = '';
    headerTitle.innerText = 'Search';
    currPage = 1;
}
// getSearchedPhotoData(pageNumber)
//     .then(responseData => responseData.json())
//     .then(jsonData => {
//         var photos = jsonData.results;
//         renderPhotos(photos);
//         saveToMemory(photos);
// });


function openFavouritesPage() {
    let favPgClone = favouritesPage.content.cloneNode(true);
    const gallery = favPgClone.querySelector('.gallery');
    const list = gallery.querySelector('.gallery__list');

    document.body.appendChild(favPgClone);
    homePage.innerHTML = '';
    headerTitle.innerText = 'Favourites';

    const favs = getData();

    const docFrag = document.createDocumentFragment();

    const html = Object.values(favs).reduce((prev, next) => {
        docFrag.appendChild(buildPhotoEl(next))
        return prev;
    }, docFrag)

    list.appendChild(html);
    console.log(favs, html);
}

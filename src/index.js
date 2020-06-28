import PageController from './components/page-controller';
import GalleryView from './components/gallery-view';

const pageController = new PageController();
pageController.startListening();

const galleryView = new GalleryView();
galleryView.startListening();


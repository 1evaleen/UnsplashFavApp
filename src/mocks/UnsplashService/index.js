import photoData from './data';
import LocalCache from '../../services/LocalCache';

class UnsplashService {
  static getData(pageNr = 1) {
    return new Promise((resolve, reject) => {
      resolve(photoData.results);
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
      resolve(LocalCache.getData());
    });
  }
}

export default UnsplashService;

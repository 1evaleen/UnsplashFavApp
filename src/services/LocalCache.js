const LOCALSTORAGE_KEY = 'photoAppFavourites';

class LocalCache {
  static DEFAULT_DATA = {};

  static getData = () => {
    let data = localStorage.getItem(LOCALSTORAGE_KEY);
    if(typeof data == 'string') {
      data = JSON.parse(data);
    } else {
      data = LocalCache.DEFAULT_DATA;
    }
    LocalCache.saveData(data);
    return data;
  };

  static saveData = data =>
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));

  static removeItem = id => {
    const data = this.getData();
    delete data[id];
    this.saveData(data);
  };

  static addItem = item => {
    const data = this.getData();
    data[item.id] = item;
    this.saveData(data);
  };

  static isFav = id => Boolean(this.getData()[id]);
}

export default LocalCache;

const LOCALSTORAGE_KEY = 'photoAppFavourites';

class LocalCache {
  DEFAULT_DATA = {};

  static getData = () => {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!data) {
      saveData(this.DEFAULT_DATA);
      return this.DEFAULT_DATA;
    }
    return JSON.parse(data);
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

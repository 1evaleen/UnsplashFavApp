class UnsplashService {
  API = 'https://api.unsplash.com';
  options = {
    headers: {
      Authorization: 'Client-ID Agmf0iach3FKZdUKXw_T7I_BApmKTgliMXnES5tr2Ss'
    }
  };

  static all(page = 1, pageSize = 9, orderBy = 'latest') {
    const url = `${this
      .API}/photos?per_page=${pageSize}&order_by=${orderBy}&page=${page}`;
    return fetch(url, this.options);
  }

  static search(page = 1, searchedTerm, pageSize = 9) {
    const url = `${this
      .API}/search/photos?per_page=${pageSize}&query=${searchedTerm}&page=${page}`;
    return fetch(url, this.options);
  }

  static favourites() {
    return getData();
  }
}

export default UnsplashService;

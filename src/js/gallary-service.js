import axios from 'axios';

const API_KEY = '35091014-169cc5cb569a490d18041ebe8';
const BASE_URL = 'https://pixabay.com/api/';
const PAGE_COUNT = 40;

export default class GallaryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = PAGE_COUNT;
  }

  async fetchImages() {
    return await axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      )
      .then(responce => {
        this.page += 1;
        return responce.data;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

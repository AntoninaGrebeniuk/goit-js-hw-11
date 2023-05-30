import axios from 'axios';

const API_KEY = '35091014-169cc5cb569a490d18041ebe8';
const BASE_URL = 'https://pixabay.com/api/';
const PAGE_COUNT = 40;

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = PAGE_COUNT;
  }

  async fetchImages() {
    const responce = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    const data = await responce.data;
    this.page += 1;
    return data;
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

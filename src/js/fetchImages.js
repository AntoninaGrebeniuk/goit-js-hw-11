import axios from 'axios';

const API_KEY = '35091014-169cc5cb569a490d18041ebe8';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImage(searchQuery) {
  return await axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=6&page=1`
    )
    .then(responce => responce.data);
}

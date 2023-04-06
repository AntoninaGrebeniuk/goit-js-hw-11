import axios from 'axios';

const API_KEY = '35091014-169cc5cb569a490d18041ebe8';
const BASE_URL = 'https://pixabay.com/api/';

// ! ================
// export function fetchImage() {
//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=sea&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//   });
// }

export async function fetchImage(searchQuery) {
  return await axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`
    )
    .then(responce => responce.data);
}

// try {
// } catch (error) {
//   console.error(error);
// }

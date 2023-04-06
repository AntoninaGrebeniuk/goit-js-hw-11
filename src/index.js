// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImage } from './js/fetchImages';
// import { imageCreate } from './js/createCard';

const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input');
const galleryRef = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = input.value.trim();
  console.log('🚀:', searchQuery);

  fetchImage(searchQuery)
    .then(data => {
      renderImageGallery(data.hits);
    })
    .catch(onFetchError)
    .finally(() => searchForm.reset());
}

function onFetchError(error) {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      position: 'center-top',
    }
  );
}

function renderImageGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a class="gallery__item" href=${largeImageURL}>
          <img src=${webformatURL} alt=${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>`
    )
    .join('');

  galleryRef.innerHTML = markup;
}

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchImage } from './js/fetchImages';
// import { imageCreate } from './js/createCard';
import Notiflix from 'notiflix';
import GallaryApiService from './js/gallary-service';

const searchForm = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const gallaryApiService = new GallaryApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

// let searchQuery = '';

function onSearch(e) {
  e.preventDefault();

  gallaryApiService.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();
  gallaryApiService.resetPage();

  if (gallaryApiService.searchQuery === '') {
    Notiflix.Notify.failure(
      "Sorry, the search string can't be empty. Please try again."
    );
    searchForm.reset();
    return;
  }

  //   fetchImage(searchQuery)
  //     .then(data => {
  //       renderImageGallery(data.hits);
  //     })
  //     .catch(onFetchError)
  //     .finally(() => searchForm.reset());
  // }

  gallaryApiService
    .fetchImages()
    .then(data => {
      if (data.totalHits === 0) {
        onFetchError();
      } else {
        clearGalleryMarkup();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        renderImageGallery(data.hits);
        simpleLightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
        }).refresh();
      }
    })
    .catch(onFetchError())
    .finally(() => searchForm.reset());
}

function onFetchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onLoadMore(e) {
  gallaryApiService.fetchImages().then(data => {
    renderImageGallery(data.hits);
    simpleLightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    }).refresh();
  });
}

function clearGalleryMarkup() {
  galleryRef.innerHTML = '';
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

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

// new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
// });

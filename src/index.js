import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import GalleryApiService from './js/gallery-service';
import LoadMoreBtn from './js/load-more-btn';

const searchForm = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const endText = document.querySelector('.end-text');

const galleryApiService = new GalleryApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

let simpleLightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  galleryApiService.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();
  galleryApiService.resetPage();
  clearGalleryMarkup();
  // searchForm.reset();
  loadMoreBtn.hide();
  endText.classList.add('is-hidden');

  if (galleryApiService.searchQuery === '') {
    Notiflix.Notify.failure(
      "Sorry, the search string can't be empty. Please try again."
    );
    searchForm.reset();
    return;
  }

  const data = await galleryApiService.fetchImages();

  try {
    if (data.totalHits === 0) {
      clearGalleryMarkup();
      loadMoreBtn.hide();
      onFetchError();
    } else {
      endText.classList.add('is-hidden');
      clearGalleryMarkup();

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      renderImageGallery(data.hits);
      simpleLightbox.refresh();
      loadMoreBtn.show();
    }

    if (data.totalHits < galleryApiService.perPage) {
      loadMoreBtn.hide();
      endText.classList.remove('is-hidden');
      endOfSearch();
      return;
    } else {
      loadMoreBtn.show();
    }
  } catch (err) {
    onFetchError(err);
  } finally {
    searchForm.reset();
  }
}

async function onLoadMore() {
  const data = await galleryApiService.fetchImages();
  let totalImages = galleryApiService.perPage * (galleryApiService.page - 1);

  if (data.totalHits <= totalImages) {
    endOfSearch();
    renderImageGallery(data.hits);
    simpleLightbox.refresh();
    loadMoreBtn.hide();

    endText.classList.remove('is-hidden');
  } else {
    loadMoreBtn.disable();
    renderImageGallery(data.hits);

    simpleLightbox.refresh();
    loadMoreBtn.enable();
  }
}

function clearGalleryMarkup() {
  galleryRef.innerHTML = '';
}

function onFetchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function endOfSearch() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
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

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

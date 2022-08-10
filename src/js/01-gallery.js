import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const gallery = document.querySelector('.gallery');

gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

const lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captionsData: 'alt',
  captionPosition: 'top',
  captionDelay: 250,
});

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(item => {
      const { preview, original, description } = item;
      return `
        <a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}"/>
        </a>`;
    })
    .join('');
}

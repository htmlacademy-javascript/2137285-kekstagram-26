import { renderModal } from './modal.js';
import { getData } from './api.js';
import { showFilters } from './filters.js';
import { debounce } from './util.js';

const renderPhotoElements = (photos) => {
  document.querySelectorAll('.pictures .picture').forEach((el) => el.remove());
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesBlock = document.querySelector('.pictures');
  const photoFragment = document.createDocumentFragment();
  photos.forEach(({ id, description, comments, likes, url }) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    renderModal(photoElement, description, comments, likes, url);
    photoFragment.appendChild(photoElement, id, description, comments, likes, url);
  });
  picturesBlock.appendChild(photoFragment);
};

const updateMiniatures = () => {
  getData((photos) => {
    renderPhotoElements(photos);
    showFilters(photos, debounce(renderPhotoElements));
  });
};

export { updateMiniatures, renderPhotoElements };

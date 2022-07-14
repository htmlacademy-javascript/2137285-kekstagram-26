import { renderModal } from './modal.js';
import {getData} from './api.js';
import {showFilters} from './filters.js';


//Скрипт формирующий миниатюры фотографий других пользователей
function updateMiniatures() {
  getData((arrayPhoto) => {
    renderPhotoElements(arrayPhoto);
    showFilters(arrayPhoto);
  });
}


function renderPhotoElements(arrayPhoto){
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesBlock = document.querySelector('.pictures');
  const arrayPhotoFragment = document.createDocumentFragment();
  arrayPhoto.forEach(({ id, description, comments, likes, url }) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    renderModal(photoElement, description, comments, likes, url);
    arrayPhotoFragment.appendChild(photoElement, id, description, comments, likes, url);
  });
  picturesBlock.appendChild(arrayPhotoFragment);
}

export { updateMiniatures, renderPhotoElements };

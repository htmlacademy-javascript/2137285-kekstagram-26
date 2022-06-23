import { generateArrayPhoto } from './data.js';
import { fullSizeMode } from './fullSizeMode.js';

//Скрипт формирующий миниатюры фотографий других пользователей
function updateMiniatures() {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesBlock = document.querySelector('.pictures');

  const arrayPhoto = generateArrayPhoto(25);

  const arrayPhotoFragment = document.createDocumentFragment();

  arrayPhoto.forEach(({ id, description, comments, likes, url }) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fullSizeMode(photoElement, id, description, comments, likes, url);
    arrayPhotoFragment.appendChild(photoElement, id, description, comments, likes, url);
  });

  picturesBlock.appendChild(arrayPhotoFragment);
}


export { updateMiniatures };

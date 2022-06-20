import {generateArrayPhoto} from './data.js';
function updateMiniatures(){
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesBlock = document.querySelector('.pictures');

  const arrayPhoto = generateArrayPhoto(25);

  const arrayPhotoFragment = document.createDocumentFragment();

  arrayPhoto.forEach(({comments,likes, url}) => {
    const photoElement= pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    arrayPhotoFragment.appendChild(photoElement);
  });

  picturesBlock.appendChild(arrayPhotoFragment);
}

export {updateMiniatures};

const bigPicture = document.querySelector('.big-picture');

function onPictureKeydown(evt){
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.activeElement.blur();
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown',  onPictureKeydown);
    bigPicture.querySelector('#picture-cancel').removeEventListener('click',onCloseClick);
  }
}

function onCloseClick(){
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown',  onPictureKeydown);
  bigPicture.querySelector('#picture-cancel').removeEventListener('click',onCloseClick);
}

//Скрипт для отображения фотографий в полноразмерном режиме
function renderModal(photoElement, description, comments, likes, url) {
  photoElement.addEventListener('click', () => {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;
    makeComment(comments);
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown',  onPictureKeydown);
    bigPicture.querySelector('#picture-cancel').addEventListener('click',onCloseClick);
  });
}

//Скрипт добавляет сгенерированные комментарии
function makeComment(comments) {
  const existComment = document.querySelector('.social__comments');
  existComment.querySelectorAll('li').forEach((n) => n.remove());
  comments.forEach((comment) => {
    const commentContainer = document.createElement('li');
    commentContainer.classList.add('social__comment');
    const commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
    commentContainer.appendChild(commentImg);
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentContainer.appendChild(commentText);
    existComment.appendChild(commentContainer);
  });
}

export { renderModal };

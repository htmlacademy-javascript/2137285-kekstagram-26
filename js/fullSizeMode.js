//Скрипт для отображения фотографий в полноразмерном режиме
function fullSizeMode(photoElement, id, description, comments, likes, url) {
  const bigPicture = document.querySelector('.big-picture');
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
  });

  document.addEventListener('keydown',  (evt)=>{
    if (evt.key === 'Escape') {
      document.querySelector('.big-picture').classList.add('hidden');
      document.activeElement.blur();
      document.querySelector('body').classList.remove('modal-open');
    }
  });

  document.querySelector('.big-picture').querySelector('#picture-cancel').addEventListener('click', () => {
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

}

//Скрипт добавляет сгенерированные комментарии
function makeComment(comments) {
  const existComment = document.querySelector('.social__comments');
  existComment.querySelectorAll('*').forEach((n) => n.remove());
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

export { fullSizeMode };

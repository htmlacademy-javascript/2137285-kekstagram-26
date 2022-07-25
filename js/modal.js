const commentIndex = 4;
const commentLength = 5;
const bigPicture = document.querySelector('.big-picture');
const commentLoader = bigPicture.querySelector('.comments-loader');

const onLoadCommentsClick = () => {
  const comments = document.querySelector('.social__comments');
  comments.querySelectorAll('.hidden').forEach((el,index) => {
    if(index < commentLength){
      el.classList.remove('hidden');
    }
  });
  const countComments = comments.children.length - comments.querySelectorAll('.hidden').length;
  bigPicture.querySelector('.social__comment-count').textContent=`${countComments} из ${comments.children.length} коментариев`;
  if(comments.querySelectorAll('.hidden').length===0){
    commentLoader.classList.add('hidden');
  }
};

const makeComment = (comments) => {
  const existComment = document.querySelector('.social__comments');
  existComment.querySelectorAll('li').forEach((el) => el.remove());
  comments.forEach((comment,index) => {
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
    if(index > commentIndex){
      commentContainer.classList.add('hidden');
    }
  });
  commentLoader.addEventListener('click',onLoadCommentsClick);
};

const  onCloseModalClick = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  bigPicture.querySelector('#picture-cancel').removeEventListener('click', onCloseModalClick);
};

const onPictureKeydown = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.activeElement.blur();
    document.querySelector('body').classList.remove('modal-open');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    bigPicture.querySelector('#picture-cancel').removeEventListener('click',onCloseModalClick);
  }
};

const renderModal = (photoElement, description, comments, likes, url) => {
  photoElement.addEventListener('click', () => {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    const countComments = (comments.length < commentLength) ? comments.length : '5';
    bigPicture.querySelector('.social__comment-count').textContent=`${countComments} из ${comments.length} коментариев`;
    bigPicture.querySelector('.social__caption').textContent = description;
    makeComment(comments);
    if(document.querySelector('.social__comments').querySelectorAll('.hidden').length === 0){
      commentLoader.classList.add('hidden');
    }
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown',  onPictureKeydown, {once : true});
    bigPicture.querySelector('#picture-cancel').addEventListener('click',onCloseModalClick, {once : true});
  });
};

export { renderModal };

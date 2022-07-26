const inputFile = document.querySelector('#upload-file');

const makeDafaultProp = () => {
  document.querySelector('#effect-none').checked = true;
  const form = document.querySelector('.img-upload__form');
  const inputHashTag = form.querySelector('.text__hashtags');
  const inputComment = form.querySelector('.text__description');
  inputHashTag.value = null;
  inputComment.value = null;
};

const onCloseMessageClick = (status) => {
  if(status === 'success'){
    inputFile.value = null;
    makeDafaultProp();
  } else {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  }
  document.querySelector(`.${status}`).remove();
};

const onMessageKeydownClick = (status, evt) => {
  if (evt.key === 'Escape') {
    if(status === 'success'){
      makeDafaultProp();
    } else {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
    document.querySelector(`.${status}`).remove();
  }
};

const onHandleClick = (status, evt) => {
  if (document.querySelector(`.${status}__inner`) && !document.querySelector(`.${status}__inner`).contains(evt.target)) {
    if(status === 'success'){
      inputFile.value = null;
      makeDafaultProp();
    } else {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
    document.querySelector(`.${status}`).remove();
  }
};

const generateMessageElement = (statusMessage) => {
  const templateElement = document.querySelector(`#${statusMessage}`).content.querySelector(`.${statusMessage}`);
  const messageElement = templateElement.cloneNode(true);
  messageElement.querySelector(`.${statusMessage}__button`).addEventListener('click',  onCloseMessageClick.bind(this, statusMessage), {once : true});
  document.addEventListener('keydown',  onMessageKeydownClick.bind(this, statusMessage), {once : true});
  document.addEventListener('click',  onHandleClick.bind(this, statusMessage), {once : true});
  document.body.append(messageElement);
};

export { generateMessageElement };

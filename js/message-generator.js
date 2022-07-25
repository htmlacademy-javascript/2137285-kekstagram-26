let template = '';
const inputFile = document.querySelector('#upload-file');

const makeDafaultProp = () => {
  document.querySelector('#effect-none').checked = true;
  const form = document.querySelector('.img-upload__form');
  const inputHashTag = form.querySelector('.text__hashtags');
  const inputComment = form.querySelector('.text__description');
  inputHashTag.value = null;
  inputComment.value = null;
};

const onCloseMessageClick = () => {
  if(template === 'success'){
    inputFile.value = null;
    makeDafaultProp();
  } else {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  }
  document.querySelector(`.${template}`).remove();
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
  if (!document.querySelector(`.${status}__inner`).contains(evt.target)) {
    if(status === 'success'){
      inputFile.value = null;
      makeDafaultProp();
    } else {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
    document.querySelector(`.${status}`).remove();
  }
};

const generateMessageElement = (templateMessageElement) => {
  const templateElement = document.querySelector(`#${templateMessageElement}`).content.querySelector(`.${templateMessageElement}`);
  const messageElement = templateElement.cloneNode(true);
  template = templateMessageElement;
  messageElement.querySelector(`.${templateMessageElement}__button`).addEventListener('click',  onCloseMessageClick, {once : true});
  document.addEventListener('keydown',  onMessageKeydownClick.bind(this, templateMessageElement), {once : true});
  document.addEventListener('click',  onHandleClick.bind(this, templateMessageElement), {once : true});
  document.body.append(messageElement);
};

export { generateMessageElement };

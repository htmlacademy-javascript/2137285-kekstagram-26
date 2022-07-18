let template = '';
const inputFile = document.querySelector('#upload-file');

function generateMessageElement (templateMessageElement){
  const templateElement = document.querySelector(`#${templateMessageElement}`).content.querySelector(`.${templateMessageElement}`);
  const messageElement = templateElement.cloneNode(true);
  template = templateMessageElement;
  messageElement.querySelector(`.${templateMessageElement}__button`).addEventListener('click',  onCloseMessageClick);
  document.addEventListener('keydown',  onMessageKeydownclick);
  document.addEventListener('click',  onHandleclick);
  document.body.append(messageElement);
}

function onCloseMessageClick(){
  if(template === 'success'){
    inputFile.value = null;
    makeDafaultProp();
  } else {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  }
  removeListeners();
}

function onMessageKeydownclick(evt){
  if (evt.key === 'Escape') {
    if(template === 'success'){
      makeDafaultProp();
    } else {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
    removeListeners();
  }
}

function onHandleclick(evt){
  if (!document.querySelector(`.${template}__inner`).contains(evt.target)) {
    if(template === 'success'){
      inputFile.value = null;
      makeDafaultProp();
    } else {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
    removeListeners();
  }
}

function makeDafaultProp(){
  document.querySelector('#effect-none').checked = true;
  const form = document.querySelector('.img-upload__form');
  const inputHashTag = form.querySelector('.text__hashtags');
  const inputComment = form.querySelector('.text__description');
  inputHashTag.value = null;
  inputComment.value = null;
}

function removeListeners () {
  document.querySelector(`.${template}__button`).removeEventListener('click',  onCloseMessageClick);
  document.removeEventListener('keydown',  onMessageKeydownclick);
  document.removeEventListener('click',  onHandleclick);
  document.querySelector(`.${template}`).remove();
}


export { generateMessageElement };

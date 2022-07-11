let template = '';
function generateMessageElement (templateMessageElement){
  const templateElement = document.querySelector(`#${templateMessageElement}`).content.querySelector(`.${templateMessageElement}`);
  const messageElement = templateElement.cloneNode(true);
  template = templateMessageElement;
  messageElement.querySelector(`.${templateMessageElement}__button`).addEventListener('click',  onCloseMessageClick);
  document.addEventListener('keydown',  onMessageKeydownclick);
  document.addEventListener('click',  onHandleclick);
  document.body.append(messageElement);
}


const inputFile = document.querySelector('#upload-file');
function onCloseMessageClick(){
  if(template === 'success'){
    inputFile.value = null;
    makeDafaultProp();
  } else {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  }
  document.querySelector(`.${template}__button`).removeEventListener('click',  onCloseMessageClick);
  document.removeEventListener('keydown',  onMessageKeydownclick);
  document.removeEventListener('click',  onHandleclick);
  document.querySelector(`.${template}`).remove();
}

function onMessageKeydownclick(evt){
  if (evt.key === 'Escape') {
    if(template === 'success'){
      makeDafaultProp();
    } else {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
    document.querySelector(`.${template}__button`).removeEventListener('click',  onCloseMessageClick);
    document.removeEventListener('keydown',  onMessageKeydownclick);
    document.removeEventListener('click',  onHandleclick);
    document.querySelector(`.${template}`).remove();
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
    document.querySelector(`.${template}__button`).removeEventListener('click',  onCloseMessageClick);
    document.removeEventListener('keydown',  onMessageKeydownclick);
    document.removeEventListener('click',  onHandleclick);
    document.querySelector(`.${template}`).remove();
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

export {generateMessageElement};

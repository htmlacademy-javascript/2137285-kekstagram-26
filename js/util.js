function getRandomNumber(min, max) {
  return max >= 0 && min >= 0
    ? Math.round(Math.random() * (max - min) + min)
    : null;
}


function controlLenghtString(str, maxlength = 140) {
  return str.length <= maxlength;
}

function showErrorMessage(text){
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  toast.textContent = text;
  setTimeout(() => {
    toast.classList.remove('show');
  },3000);
}

let template = '';
function generateMessageElement (templateMessageElement){
  const templateElement = document.querySelector(`#${templateMessageElement}`).content.querySelector(`.${templateMessageElement}`);
  const messageElement = templateElement.cloneNode(true);
  template = templateMessageElement;
  messageElement.querySelector(`.${templateMessageElement}__button`).addEventListener('click',  onCloseMessageClick);
  document.addEventListener('keydown',  onMessageKeydownclick);
  document.body.append(messageElement);
}

function onCloseMessageClick(){
  document.querySelector(`.${template}__button`).removeEventListener('click',  onCloseMessageClick);
  document.removeEventListener('keydown',  onMessageKeydownclick);
  document.querySelector(`.${template}`).remove();
}

function onMessageKeydownclick(evt){
  if (evt.key === 'Escape') {
    document.querySelector(`.${template}__button`).removeEventListener('click',  onCloseMessageClick);
    document.removeEventListener('keydown',  onMessageKeydownclick);
    document.querySelector(`.${template}`).remove();
  }
}


export {getRandomNumber, controlLenghtString, showErrorMessage,generateMessageElement};

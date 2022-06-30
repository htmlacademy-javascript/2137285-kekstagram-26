const inputFile = document.querySelector('#upload-file');
const cansel = document.querySelector('#upload-cancel');
function onLoadPhoto(){
  inputFile.addEventListener('change', onAddPictureClick);
  cansel.addEventListener('click', onCanselClick);
  document.addEventListener('keydown',  onLoadPictureKeydown);
}

function onAddPictureClick(event) {
  document.querySelector('.img-upload__overlay .img-upload__preview img').src = URL.createObjectURL(event.target.files[0]);
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function onCanselClick(){
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value=null;
}

function onLoadPictureKeydown(evt){
  if (evt.key === 'Escape' && (document.activeElement !== document.querySelector('.text__hashtags') && document.activeElement !== document.querySelector('.text__description'))) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
    inputFile.value=null;
  }
}

export { onLoadPhoto };


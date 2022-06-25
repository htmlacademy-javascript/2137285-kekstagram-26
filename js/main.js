import {
  updateMiniatures
} from './miniature.js';

updateMiniatures();

const inputFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
inputFile.addEventListener('change', onAddPictureClick);

function onAddPictureClick(event) {
  document.querySelector('.img-upload__overlay .img-upload__preview img').src = URL.createObjectURL(event.target.files[0]);
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

}


const pristine = new Pristine(form);
const inputHashTag = form.querySelector('.text__hashtags');
pristine.addValidator(inputHashTag, validateHashtag, 'Формат хэш тега неверный');
form.addEventListener('submit', onFileSubmit);

function onFileSubmit(evt) {
  evt.preventDefault();
  pristine.validate();
}

function validateHashtag(value) {
  const regex = new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/);
  if(regex.test(value)) {
    return true;
  }
  else{
    return false;
  }
}

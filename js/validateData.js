import { sendData } from './api.js';
import { generateMessageElement } from './messageGenerator.js';

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
let pristine;
let errorMessage = '';

function validateData(){
  pristine = new Pristine(form,{
    classTo: 'img-upload__field-wrapper',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div'
  });
  const inputHashTag = form.querySelector('.text__hashtags');
  pristine.addValidator(inputHashTag, validateHashtag, getHashTagErrorMessage);
  form.addEventListener('submit', onFileSubmit);
  function onFileSubmit(evt) {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      sendData(
        () => {
          document.querySelector('.img-upload__overlay').classList.add('hidden');
          generateMessageElement('success');
          unblockSubmitButton();
        },
        () => {
          generateMessageElement('error');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  }
}

function validateHashtag(value) {
  const isValid = value.split(' ').filter(Boolean).map((item, _, arr) => {
    const upperArray = arr.map((el)=>el.toUpperCase());
    if(arr.length > 5) {
      errorMessage = 'Хэш-тегов не может быть более 5';
      return false;}

    if(!item.startsWith('#')) {
      errorMessage = 'Хэш-тег должен начинаться с #';
      return false;}

    if(!(new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/).test(item))) {
      errorMessage = 'Cтрока после решётки должна состоять из букв или чисел, длиной не больше 20 символов';
      return false;}

    if([...new Set(upperArray)].length !== upperArray.length){
      errorMessage = 'Хэш-теги должны быть уникальными, удалите дубли';
      return false;
    }
    return true;
  }).every(Boolean);

  submitButton.disabled = !isValid;

  return isValid;
}

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function getHashTagErrorMessage () {
  return errorMessage;
}

export { validateData, pristine, unblockSubmitButton };

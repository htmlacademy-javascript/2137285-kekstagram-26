import { sendData } from './api.js';
import { generateMessageElement } from './util.js';

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');


//Скрипт валидации формы ввода хештега библиотекой Pristine
function validateData(){
  const pristine = new Pristine(form,{
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
          document.querySelector('.img-upload__overlay').classList.add('hidden');
          generateMessageElement('error');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  }
}

let errorMessages = '';
function validateHashtag(value) {
  const isValid = value.split(' ').filter(Boolean).map((item, _, arr) => {
    const upperArray = arr.map((el)=>el.toUpperCase());
    if(arr.length > 5) {
      errorMessages = 'Хештегов не может быть больше 5';
      return false;}

    if(!item.startsWith('#')) {
      errorMessages = 'Хештег должен начинаться с #';
      return false;}

    if(!(new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/).test(item))) {
      errorMessages = 'Cтрока после решётки должна состоять из букв или чисел';
      return false;}

    if([...new Set(upperArray)].length !== upperArray.length){
      errorMessages = 'Хэш-теги должны быть уникальными, удалите дубли';
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
  return errorMessages;
}

export {validateData};

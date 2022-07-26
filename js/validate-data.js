import { sendData } from './api.js';
import { generateMessageElement } from './message-generator.js';

const maxCountHashTag = 5;
const maxLengthHashTag = 19;
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
let pristine;
let errorMessage = '';

const validateHashtag = (field) => {
  const isValid = field.split(' ').filter(Boolean).map((item, _, hashTags) => {
    const upperHashTags = hashTags.map((el)=>el.toUpperCase());
    if(hashTags.length > maxCountHashTag) {
      errorMessage = 'Хэш-тегов не может быть более 5';
      return false;}

    if(!item.startsWith('#')) {
      errorMessage = 'Хэш-тег должен начинаться с #';
      return false;}

    if(!(new RegExp(`^#[A-Za-zА-Яа-яЁё0-9]{1,${maxLengthHashTag}}$`).test(item))) {
      errorMessage = 'Cтрока после решётки должна состоять из букв или чисел, длиной не больше 20 символов';
      return false;}

    if([...new Set(upperHashTags)].length !== upperHashTags.length){
      errorMessage = 'Хэш-теги должны быть уникальными, удалите дубли';
      return false;
    }
    return true;
  }).every(Boolean);
  submitButton.disabled = !isValid;

  return isValid;
};


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const getHashTagErrorMessage = () => errorMessage;

const validateData = () => {
  pristine = new Pristine(form,{
    classTo: 'img-upload__field-wrapper',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div'
  });
  const inputHashTag = form.querySelector('.text__hashtags');
  pristine.addValidator(inputHashTag, validateHashtag, getHashTagErrorMessage);
  const onFileSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate(inputHashTag);
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
  };
  form.addEventListener('submit', onFileSubmit);
};

export { validateData, pristine, unblockSubmitButton };

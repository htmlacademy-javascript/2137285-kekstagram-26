const form = document.querySelector('.img-upload__form');
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
    const isValid = pristine.validate();
    if(!isValid){
      evt.preventDefault();
    }
  }
}

let errorMessages = '';
function validateHashtag(value) {
  return value.split(' ').filter(Boolean).map((item, _, arr) => {
    if(arr.length > 5) {
      errorMessages = 'Хештегов не может быть больше 5';
      return false;}

    if(!item.startsWith('#')) {
      errorMessages = 'Хештег должен начинаться с #';
      return false;}

    if(!(new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/).test(item))) {
      errorMessages = 'Cтрока после решётки должна состоять из букв или чисел';
      return false;}

    if([...new Set(arr.map((el)=>el.toUpperCase()))].length !== arr.map((el)=>el.toUpperCase()).length){
      errorMessages = 'Хэш-теги нечувствительны к регистру, удалите дубли';
      return false;
    }

    return true;

  }).every(Boolean);
}


function getHashTagErrorMessage () {
  return errorMessages;
}

export {validateData};

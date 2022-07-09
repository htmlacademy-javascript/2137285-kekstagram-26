import { showErrorMessage } from './util.js';

function getData (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) =>{
      if(response.ok){
        return response.json();
      }else{
        showErrorMessage('Ошибка сервера');
      }
    })
    .catch(() => {
      showErrorMessage('Не удалось получить данные с сервера');
    })
    .then((arrayPhotoData) => {
      onSuccess(arrayPhotoData);
    });
};

function sendData (onSuccess, onFail, body){
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export { getData,sendData };
function showErrorMessage(messageText){
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  toast.textContent = messageText;
  setTimeout(() => {
    toast.classList.remove('show');
  },3000);
}

function getRandomPhotoClick (arrayPhoto) {
  return arrayPhoto.slice().sort(() => 0.5 - Math.random()).slice(0, 10);// Источник - https://overcoder.net/q/64943/%D0%BA%D0%B0%D0%BA-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-n-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE-%D0%B8%D0%B7-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0
}

function getDiscussedPhotoClick (arrayPhoto) {
  return arrayPhoto.slice().sort((a, b) => b.comments.length - a.comments.length);
}

// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { showErrorMessage, debounce, getRandomPhotoClick, getDiscussedPhotoClick};

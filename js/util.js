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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  console.log('debounce',timeoutDelay);
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


export {getRandomNumber, controlLenghtString, showErrorMessage, debounce};

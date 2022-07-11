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


export {getRandomNumber, controlLenghtString, showErrorMessage};

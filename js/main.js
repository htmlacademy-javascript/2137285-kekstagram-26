function getRandomNumber(min, max) {
  return max >= 0 && min >= 0
    ? Math.round(Math.random() * (max - min) + min)
    : null;
}

getRandomNumber(7, 0);


function controlLenghtString(str, maxlength = 140) {
  return str.length <= maxlength;
}
controlLenghtString('test string', 5);

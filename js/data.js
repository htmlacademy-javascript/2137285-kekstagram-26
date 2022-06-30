import {getRandomNumber,controlLenghtString} from './util.js';
import {COMMENTS,DESCRIPTION,SURNAMES} from './const.js';

controlLenghtString('тест');

const existId = [];//Массив хранит все используемые Id

//Функция для нахождения уникального значения Id
function queryId(min, max){
  let flag = true;
  let randomNumber;
  do{
    randomNumber = getRandomNumber(min,max);
    if (!existId.includes(randomNumber)) {//Если значение Id уникально записываем в массив и выходим из цикла
      existId.push(randomNumber);
      flag = false;
    }
  }while(flag);
  return randomNumber;
}

//Функция формирующая массив комментариев
const generateArrayComment = function(count){
  function crateComment(){
    return {
      id: queryId(26,1000),
      avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
      message: generateMessageString(getRandomNumber(1,2)),
      name: SURNAMES[getRandomNumber(0,SURNAMES.length)],
    };
  }
  return Array.from({length: count}, crateComment);
};

//Функция формирующая комментарий в виде произвольного числа строк из массива COMMENTS
function generateMessageString(count){
  let messageString = '';
  const uniqComment = [];
  for(let i = 1; i<=count; i++){
    const commentId = getRandomNumber(0,COMMENTS.length-1);
    if(!uniqComment.includes(commentId)){
      messageString += COMMENTS[commentId];
      messageString += (i < count) ? '\n': '';
    }else
    {i--;}
  }
  return messageString;
}

//Функция создающая одну объект фотографии с адресом, файлом и комментарием
const generatePhoto = function(){
  const uniqId = queryId(1,25);
  return {
    id : uniqId,
    url : `photos/${uniqId}.jpg`,
    description: DESCRIPTION[getRandomNumber(0,10)],
    likes: getRandomNumber(15,200),
    comments: generateArrayComment(getRandomNumber(1,16))//module8-task2 Было 5
  };
};

//Набиваем объекты фотографий в массив
function generateArrayPhoto(count){
  const arrayPhoto = [];
  for(let i=0; i<count; i++){
    arrayPhoto.push(generatePhoto());
  }
  return arrayPhoto;
}

export {generateArrayPhoto};

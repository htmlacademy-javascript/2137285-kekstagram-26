function getRandomNumber(min, max) {
  return max >= 0 && min >= 0
    ? Math.round(Math.random() * (max - min) + min)
    : null;
}


function controlLenghtString(str, maxlength = 140) {
  return str.length <= maxlength;
}
controlLenghtString('test string', 5);


const MESSAGE_EXAMPLE=`Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`;

const ARRAY_COMMENTS = MESSAGE_EXAMPLE.split('\n');

const SURNAMES = [
  'Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];


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

//Функция формирующая комментарий в виде произвольного числа строк из массива ARRAY_COMMENTS
function generateMessageString(count){
  let messageString = '';
  const uniqComment = [];
  for(let i = 1; i<=count; i++){
    const commentId = getRandomNumber(0,ARRAY_COMMENTS.length-1);
    if(!uniqComment.includes(commentId)){
      messageString += ARRAY_COMMENTS[commentId];
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
    description: `Это описание фотографии под номером ${uniqId}`,
    likes: getRandomNumber(15,200),
    comments: generateArrayComment(getRandomNumber(1,5))
  };
};

//Набиваем объекты фотографий в массив
function generatearrayPhoto(count){
  const arrayPhoto = [];
  for(let i=0; i<count; i++){
    arrayPhoto.push(generatePhoto());
  }
  return arrayPhoto;
}

generatearrayPhoto(25);

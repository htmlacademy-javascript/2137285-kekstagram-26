const inputFile = document.querySelector('#upload-file');
const canselElement = document.querySelector('#upload-cancel');
const scaleElements = document.querySelector('.img-upload__scale');
const previewImg = document.querySelector('.img-upload__preview');
const scaleControl = document.querySelector('.scale__control--value');
const effectElements = document.querySelector('.effects__list');
const sliderElement = document.getElementById('slider');

function onLoadPhoto(){
  inputFile.addEventListener('change', onAddPictureClick);
  canselElement.addEventListener('click', onCanselClick);
  document.addEventListener('keydown',  onLoadPictureKeydown);
  scaleElements.addEventListener('click',  onScalClick);
  effectElements.addEventListener('click',  onEffectClick);
}

function onAddPictureClick(event) {
  scaleControl.value = '100%';
  previewImg.getElementsByTagName('img')[0].style.transform = 'scale(1)';
  document.querySelector('.img-upload__overlay .img-upload__preview img').src = URL.createObjectURL(event.target.files[0]);
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function onCanselClick(){
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value=null;
}

function onLoadPictureKeydown(evt){
  if (evt.key === 'Escape' && (document.activeElement !== document.querySelector('.text__hashtags') && document.activeElement !== document.querySelector('.text__description'))) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
    inputFile.value=null;
  }
}

//Изменение масштаба изображения
function onScalClick(event){
  const scaleElement = event.target.classList;
  switch(true){
    case scaleElement.contains('scale__control--smaller'):
      if(parseInt(scaleControl.value, 10 ) > 25) {
        scaleControl.value = `${(parseInt(scaleControl.value, 10 ) - 25)}%`;
        previewImg.getElementsByTagName('img')[0].style.transform = `scale(${parseInt(scaleControl.value, 10 )/100})`;
      }
      break;
    case scaleElement.contains('scale__control--bigger'):
      if(parseInt(scaleControl.value, 10 ) < 100) {
        scaleControl.value = `${(parseInt(scaleControl.value, 10 ) + 25)}%`;
        previewImg.getElementsByTagName('img')[0].style.transform = `scale(${parseInt(scaleControl.value, 10 )/100})`;
      }
      break;
    default:
      break;
  }
}


function onEffectClick(event){
  const effectElement = event.target.classList;
  switch(true){
    case effectElement.contains('effects__preview--none'):
      previewImg.getElementsByTagName('img')[0].className = '';
      break;
    case effectElement.contains('effects__preview--chrome'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--chrome';
      break;
    case effectElement.contains('effects__preview--sepia'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--sepia';
      break;
    case effectElement.contains('effects__preview--marvin'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--marvin';
      break;
    case effectElement.contains('effects__preview--phobos'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--phobos';
      break;
    case effectElement.contains('effects__preview--heat'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--heat';
      break;

  }
}

noUiSlider.create(sliderElement, {
  range: {
    'min': 0,
    'max': 100,
  },
  start: [20,80],
});


export { onLoadPhoto };


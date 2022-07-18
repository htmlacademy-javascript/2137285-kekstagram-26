import { pristine, unblockSubmitButton } from './validateData.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const inputFile = document.querySelector('#upload-file');
const canselElement = document.querySelector('#upload-cancel');
const scaleElements = document.querySelector('.img-upload__scale');
const previewImg = document.querySelector('.img-upload__preview');
const scaleControl = document.querySelector('.scale__control--value');
const effectElements = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const form = document.querySelector('.img-upload__form');

function onLoadPhoto(){
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  inputFile.addEventListener('change', onAddPictureClick);
  canselElement.addEventListener('click', onCanselClick);
  document.addEventListener('keydown',  onLoadPictureKeydown);
  scaleElements.addEventListener('click',  onScalClick);
  effectElements.addEventListener('click',  onEffectClick);
}

function onAddPictureClick(evt) {
  scaleControl.value = '100%';
  previewImg.getElementsByTagName('img')[0].style.transform = 'scale(1)';
  const matches = FILE_TYPES.some((el) => evt.target.files[0].name.toLowerCase().endsWith(el));
  if(matches){
    document.querySelector('.img-upload__overlay .img-upload__preview img').src = URL.createObjectURL(evt.target.files[0]);
    effectElements.querySelectorAll('.effects__preview').forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(evt.target.files[0])})`;
    });
  }
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetEffects();
  form.querySelector('.text__hashtags').value = '';
  form.querySelector('.text__description').value = '';
}

function onCanselClick(){
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value = null;
}

function onLoadPictureKeydown(evt){
  if (evt.key === 'Escape' && (document.activeElement !== document.querySelector('.text__hashtags') && document.activeElement !== document.querySelector('.text__description'))) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
    inputFile.value = null;
  }
}

//Изменение масштаба изображения
function onScalClick(evt){
  const scaleElement = evt.target.classList;
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

//Добавление эффекта к загруженной фотографии
function onEffectClick(evt){
  const effectElement = evt.target.classList;
  switch(true){
    case effectElement.contains('effects__preview--none'):
      previewImg.getElementsByTagName('img')[0].className = '';
      resetEffects();
      break;
    case effectElement.contains('effects__preview--chrome'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--chrome';
      updateUISlider(0, 1, 0.1, 'grayscale');
      break;
    case effectElement.contains('effects__preview--sepia'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--sepia';
      updateUISlider(0, 1, 0.1, 'sepia');
      break;
    case effectElement.contains('effects__preview--marvin'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--marvin';
      updateUISlider(0, 100, 1, 'invert');
      break;
    case effectElement.contains('effects__preview--phobos'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--phobos';
      updateUISlider(0, 3, 0.1, 'blur');
      break;
    case effectElement.contains('effects__preview--heat'):
      previewImg.getElementsByTagName('img')[0].className = 'effects__preview--heat';
      updateUISlider(1, 3, 0.1, 'brightness');
      break;

  }
}

//Изменение слайдера под текущий эффект
function updateUISlider (min, max, step, effect){
  resetEffects();
  if(effect !== 'none'){
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    noUiSlider.create(sliderElement, {
      range: {
        min,
        max
      },
      step,
      start:max,
      direction: 'rtl',
      connect: 'upper'
    });
    sliderElement.noUiSlider.on('update', () => {
      let measure = '';
      switch(effect){
        case 'invert': measure = '%';
          break;
        case 'blur': measure = 'px';
          break;
        default:
          break;
      }
      document.querySelector('.img-upload__preview img').style.filter = `${effect}(${sliderElement.noUiSlider.get()}${measure})`;
      effectValueElement.value = `${effect}(${sliderElement.noUiSlider.get()}${measure})`;
    });
  }
}

function resetEffects(){
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.querySelector('.img-upload__preview img').style.filter = 'none';
  document.querySelector('.effects__list #effect-none').checked = true;
  pristine.reset();
  unblockSubmitButton();
  if(sliderElement.noUiSlider !== undefined){
    sliderElement.noUiSlider.destroy();
  }
}


export { onLoadPhoto };


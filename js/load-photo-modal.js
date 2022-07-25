import { pristine, unblockSubmitButton } from './validate-data.js';
import { showErrorMessage } from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const inputFile = document.querySelector('#upload-file');
const canselElement = document.querySelector('#upload-cancel');
const scaleElements = document.querySelector('.img-upload__scale');
const previewImg = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const effectElements = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const form = document.querySelector('.img-upload__form');
const minSlider = 25;
const maxSlider = 100;
const stepSlider = 25;
const numberSystem = 10;
const percent = 100;
const effectMinCommonFilter = 0;
const effectMinHeatFilter = 1;
const effectMaxCommonFilter = 1;
const effectMaxInvertFilter = 100;
const effectMaxPhobosFilter = 3;
const effectStepCommonFilter = 0.1;
const effectStepInvertFilter = 1;

const resetEffects = () => {
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.querySelector('.img-upload__preview img').style.filter = 'none';
  document.querySelector('.effects__list #effect-none').checked = true;
  pristine.reset();
  unblockSubmitButton();
  if(sliderElement.noUiSlider !== undefined){
    sliderElement.noUiSlider.destroy();
  }
};

const onAddPictureClick = (evt) => {
  scaleControl.value = '100%';
  previewImg.style.transform = 'scale(1)';
  const matches = FILE_TYPES.some((el) => evt.target.files[0].name.toLowerCase().endsWith(el));
  if(matches){
    document.querySelector('.img-upload__overlay .img-upload__preview img').src = URL.createObjectURL(evt.target.files[0]);
    effectElements.querySelectorAll('.effects__preview').forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(evt.target.files[0])})`;
    });
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.body.classList.add('modal-open');
    resetEffects();
    form.querySelector('.text__hashtags').value = '';
    form.querySelector('.text__description').value = '';
  } else {
    showErrorMessage('Не поддерживаемый формат файла');
  }
};

const onCanselClick = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value = null;
};

const onLoadPictureKeydown = (evt) => {
  if (evt.key === 'Escape' && (document.activeElement !== document.querySelector('.text__hashtags') && document.activeElement !== document.querySelector('.text__description'))) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
    inputFile.value = null;
  }
};

const onScalClick = (evt) => {
  const scaleElement = evt.target.classList;
  switch(true){
    case scaleElement.contains('scale__control--smaller'):
      if(parseInt(scaleControl.value, numberSystem ) > minSlider) {
        scaleControl.value = `${(parseInt(scaleControl.value, numberSystem ) - stepSlider)}%`;
        previewImg.style.transform = `scale(${parseInt(scaleControl.value, numberSystem )/percent})`;
      }
      break;
    case scaleElement.contains('scale__control--bigger'):
      if(parseInt(scaleControl.value, numberSystem ) < maxSlider) {
        scaleControl.value = `${(parseInt(scaleControl.value, numberSystem ) + stepSlider)}%`;
        previewImg.style.transform = `scale(${parseInt(scaleControl.value, numberSystem )/percent})`;
      }
      break;
    default:
      break;
  }
};

const updateUISlider = (min, max, step, effect) => {
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
      connect: 'lower'
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
};

const onEffectClick = (evt) => {
  const effectElement = evt.target.classList;
  switch(true){
    case effectElement.contains('effects__preview--none'):
      previewImg.className = '';
      resetEffects();
      break;
    case effectElement.contains('effects__preview--chrome'):
      previewImg.className = 'effects__preview--chrome';
      updateUISlider(effectMinCommonFilter, effectMaxCommonFilter, effectStepCommonFilter, 'grayscale');
      break;
    case effectElement.contains('effects__preview--sepia'):
      previewImg.className = 'effects__preview--sepia';
      updateUISlider(effectMinCommonFilter, effectMaxCommonFilter, effectStepCommonFilter, 'sepia');
      break;
    case effectElement.contains('effects__preview--marvin'):
      previewImg.className = 'effects__preview--marvin';
      updateUISlider(effectMinCommonFilter, effectMaxInvertFilter, effectStepInvertFilter, 'invert');
      break;
    case effectElement.contains('effects__preview--phobos'):
      previewImg.className = 'effects__preview--phobos';
      updateUISlider(effectMinCommonFilter, effectMaxPhobosFilter, effectStepCommonFilter, 'blur');
      break;
    case effectElement.contains('effects__preview--heat'):
      previewImg.className = 'effects__preview--heat';
      updateUISlider(effectMinHeatFilter, effectMaxPhobosFilter, effectStepCommonFilter, 'brightness');
      break;

  }
};

const onLoadPhoto = () => {
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  inputFile.addEventListener('change', onAddPictureClick);
  canselElement.addEventListener('click', onCanselClick);
  document.addEventListener('keydown',  onLoadPictureKeydown);
  scaleElements.addEventListener('click',  onScalClick);
  effectElements.addEventListener('click',  onEffectClick);
};

export { onLoadPhoto };


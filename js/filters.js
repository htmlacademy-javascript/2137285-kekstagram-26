
import { renderPhotoElements } from './miniature.js';
import { debounce } from './util.js';

const EXIST_FILTER = ['filter-default', 'filter-random', 'filter-discussed'];
const filterElement = document.querySelector('.img-filters__form');
function showFilters(arrayPhoto){
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterClick.bind(this, arrayPhoto));
}


function onFilterClick(arrayPhoto, evt){
  EXIST_FILTER.forEach((element)=>{
    document.querySelector(`[id="${element}"]`).classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
  document.querySelectorAll('.pictures .picture').forEach((el) => el.remove());
  if(evt.target.id === 'filter-random'){
    return debounce(renderPhotoElements(getRandomPhotoClick(arrayPhoto)),500);
  }
  if(evt.target.id === 'filter-discussed'){
    return debounce(renderPhotoElements(getDiscussedPhotoClick(this.arrayPhoto)),500);
  }
  renderPhotoElements(arrayPhoto);

}


function getRandomPhotoClick (arrayPhoto) {
  return arrayPhoto.slice().sort(() => 0.5 - Math.random()).slice(0, 10);//Алгоритм взял с https://overcoder.net/q/64943/%D0%BA%D0%B0%D0%BA-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-n-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE-%D0%B8%D0%B7-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0
}

function getDiscussedPhotoClick (arrayPhoto) {
  return arrayPhoto.slice().sort((a, b) => b.comments.length - a.comments.length);
}

export { showFilters};

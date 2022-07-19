
import { getRandomPhotoClick, getDiscussedPhotoClick} from './util.js';

const EXIST_FILTERS = ['filter-default', 'filter-random', 'filter-discussed'];
const filterElement = document.querySelector('.img-filters__form');

function showFilters(arrayPhoto, debounceRenderPhotoElements){
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterClick.bind(this, arrayPhoto, debounceRenderPhotoElements));
}

function onFilterClick(arrayPhoto, debounceRenderPhotoElements, evt){
  EXIST_FILTERS.forEach((element)=>{
    document.querySelector(`[id="${element}"]`).classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
  if(evt.target.id === 'filter-random'){
    return debounceRenderPhotoElements(getRandomPhotoClick(arrayPhoto));
  }
  if(evt.target.id === 'filter-discussed'){
    return debounceRenderPhotoElements(getDiscussedPhotoClick(arrayPhoto));
  }
  debounceRenderPhotoElements(arrayPhoto);
}

export { showFilters};

import {SlideAnimationObserver} from './classes/slide-in.js';
import {ImgSlideshow} from './classes/img-slideshow.js'

const slide_show_imagens_lado = new ImgSlideshow(3, 'imgslides_index', 'imgslides_index', [`images/index_lado/lado_img_`,'.png']);

const slideInFromLeft = new SlideAnimationObserver('hiddenL', 'showL');
const slideInFromRight = new SlideAnimationObserver('hiddenR', 'showR');
const slideInFromTop = new SlideAnimationObserver('hidden2', 'show2');
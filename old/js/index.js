import {SlideAnimationObserver} from './classes/slide-in.js';
import {ImgSlideshow} from './classes/img-slideshow.js'

const slide_show_imagens_lado = new ImgSlideshow(3, 'imgslides_index', 'imgslides_index', [`images/index_lado/lado_img_`,'.png']);

const slideInFromLeft = new SlideAnimationObserver('hiddenL', 'showL');
const slideInFromRight = new SlideAnimationObserver('hiddenR', 'showR');
const slideInFromTop = new SlideAnimationObserver('hidden2', 'show2');

let ticking = false;

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const element = document.querySelector('.textoCentro');
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const visiblePercent = (windowHeight - rect.top) / windowHeight;
            let opacity;
            
            if (visiblePercent <= 0 || visiblePercent >= 0.7) {
                opacity = 0;
            } else if (visiblePercent > 0.4) {
                opacity = 1 - ((visiblePercent - 0.4) / 0.3);
            } else {
                opacity = visiblePercent / 0.4;
            }
            
            opacity = Math.max(0, Math.min(0.3, opacity));
            element.style.opacity = opacity;
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();
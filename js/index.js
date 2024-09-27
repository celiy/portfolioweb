import {SlideAnimationObserver} from './classes/slide-in.js';
import {eng_translations} from './translations/eng.js';

const slideInFromLeft = new SlideAnimationObserver('hiddenL', 'showL');
const slideInFromRight = new SlideAnimationObserver('hiddenR', 'showR');
const slideInFromTop = new SlideAnimationObserver('hidden2', 'show2');

//Esta parte faz a tradução do site para o idioma inglês
const ids = [];
for (const element of document.querySelectorAll('*[id]')) {
    const id = element.id;
    if (!isNaN(parseInt(id))) {
        ids.push(id);
    }
}

for (const id of ids) {
    const element = document.getElementById(id);
    element.innerHTML = eng_translations[id];
}
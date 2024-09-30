import {eng_translations} from './translations/eng.js';


async function draw_navbar(){
    const ulmenu = document.getElementById('ulmenu');

    ulmenu.innerHTML = `
    <li><a id="111" class="js-active" href="sobre.html">Sobre</a></li>
    <li><a id="222" class="js-active" href="projetos.html">Projetos</a></li>
    <li><a id="333" class="js-active" href="contato.html">Contato</a></li>
    <li><a id="444" class="js-active" href="index.html">Home</a></li>
    <li><a class="translation" href="" onclick="changeLanguage()">PT-BR</a></li>`;

} draw_navbar().then(() => {
    const active = document.querySelectorAll('.js-active');
    const translation = document.querySelector('.translation');
    translation.href = window.location.href;

    for (const item of active) {
        if (item.href === window.location.href) {
            item.classList.add('active');
        }
    }
});

//Esta parte faz a tradução do site para o idioma inglês
const currentLang = localStorage.getItem('lang') || 'ptbr';
localStorage.setItem('lang', currentLang);

const translation_element = document.querySelector('.translation');
const ids = [];

if (currentLang === 'eng') {
  const elements = document.querySelectorAll('*[id]');
  elements.forEach((element) => {
    const id = element.id;
    if (!isNaN(parseInt(id))) {
      ids.push(id);
    }
  });

  ids.forEach((id) => {
    const element = document.getElementById(id);
    element.innerHTML = eng_translations[id];
  });
}

window.changeLanguage = function() {
    if (currentLang === 'ptbr') {
      localStorage.setItem('lang', 'eng');
    } else {
      localStorage.setItem('lang', 'ptbr');
    }
    window.location.reload();
    console.log(localStorage.getItem('lang'));
}

if (currentLang === 'eng') {
    translation_element.innerText = 'ENG';
} else {
    translation_element.innerText = 'PT-BR';
}
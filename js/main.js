import {eng_translations} from './translations/eng.js';

async function draw_navbar(){
    const ulmenu = document.getElementById('ulmenu');

    ulmenu.innerHTML = `
    <li><a id="111" class="js-active" href="sobre.html">Sobre</a></li>
    <li><a id="222" class="js-active" href="projetos.html">Projetos</a></li>
    <li><a id="333" class="js-active" href="contato.html">Contato</a></li>
    <li><a id="444" class="js-active" href="index.html">Home</a></li>`;

} draw_navbar().then(() => {
    const active = document.querySelectorAll('.js-active');

    for (const item of active) {
        if (item.href === window.location.href) {
            item.classList.add('active');
        }
    }
});

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
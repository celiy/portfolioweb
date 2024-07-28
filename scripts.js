//Iniciar animação inicial da pagina
function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        element.style.opacity = 1;
    });
}
window.onload = fadeInElements;

//Iniciar animação dos elementos na segunda pagina
const startAnimation = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("slide-in-from-right", entry.isIntersecting);
    });
};
const observer = new IntersectionObserver(startAnimation);
const options = { root: null, rootMargin: '0px', threshold: 1 };

const elements = document.querySelectorAll('.caixaRounded');
elements.forEach(el => {
    observer.observe(el, options);
});
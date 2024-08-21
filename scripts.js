//Iniciar animação inicial da pagina
function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        element.style.opacity = 1;
    });
}
window.onload = fadeInElements;

//Iniciar animação dos widgets no index.html
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

//Iniciar animação das imagens de fundo1
window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.imagemfundo1');

    const parallaxEffect = (scrollY) => {
        images.forEach(image => {
            image.style.transform = `translateY(${scrollY * 0.15}px)`;
        });
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        parallaxEffect(scrollY);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', handleScroll);
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        });
    });

    images.forEach(image => {
        observer.observe(image);
    });
});

//Iniciar animação de desfoque
window.addEventListener('load', function() {
    const blurDiv = document.querySelector('.blur-div');
    blurDiv.style.filter = 'blur(0px)';
    blurDiv.style.webkitFilter = 'blur(0px)';
});
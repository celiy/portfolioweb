//Animação de slide da esquerda pro centro//
const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});
const hiddenElements1 = document.querySelectorAll('.hidden');
hiddenElements1.forEach((el) => observer1.observe(el));

//Animação de slide de cima pro centro//
const observer2 = new IntersectionObserver((entries2) => {
    entries2.forEach((entry2) =>{
        if (entry2.isIntersecting){
            entry2.target.classList.add('show2');
        } else {
            entry2.target.classList.remove('show2');
        }
    });
});
const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el2) => observer2.observe(el2));

//Slide show do portfolio na pagina sobre//
const elemouse = document.getElementById('imgslides');
let mousehover = false;
let intervalo_switch;
let imgcounter = 1;
const noi = 5; //numero maximo de imagens em images/sobre_portfolio

function esperarSegundos(segundos) {
    return new Promise(resolve => setTimeout(resolve, segundos * 1000));
}

async function slideShow(force_bool){
    const image = document.getElementById('imgslides');
    if (image){
        //Detecta se o mouse está em cima do slideshow
        elemouse.addEventListener('mouseover', () => {
            mousehover = true;
        });
        elemouse.addEventListener('mouseout', () => {
            mousehover = false;
        });
        
        if (!mousehover || force_bool){
            image.classList.add('disappear')
            await esperarSegundos(0.3);
            image.src = `images/sobre_portfolio/projeto_${imgcounter}.jpg`;
            image.classList.remove('disappear')
        }
    }
} slideShow();

function checkImgcounter(counter){
    if (counter > noi){
        counter = 1;
    } else if (counter < 1){
        counter = 5;
    }
    return counter;
}

//O código abaixo faz o seguinte: o intervalo de trocar de slide é atribuido a uma variavel (intervalo_switch),
//e então a função de troca de slides acontece, mas se a função que recebe um click para trocar de slides for chamada,
//o intervalo de chamar a função para trocar de slide automaticamente é resetado.

//Troca de slide auto
function slideSwitcher(){
    imgcounter++;
    imgcounter = checkImgcounter(imgcounter);
    slideShow();
}

//force_bool existe para forçar a troca de slide
function switchSlide(bool, force_bool){
    clearInterval(intervalo_switch)
    intervalo_switch = setInterval(slideSwitcher, 4000);

    if (bool){
        imgcounter++;
    } else {
        imgcounter--;
    }
    
    imgcounter = checkImgcounter(imgcounter);
    slideShow(force_bool);
}

intervalo_switch = setInterval(slideSwitcher, 4000);

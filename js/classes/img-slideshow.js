//Esta classe é um slideshow de imagens que roda automaticamente e pode ser interagido com botões ou clicks/toques
//na imagem. A classe recebe o número máximo de imagens do slideshow, o elemento que contém o container das imagens,
//o nome das imagens, formato das imagens eo elemento que contém o botão de anterior e o elemento 
//que contém o botão de proximo.

export class ImgSlideshow {
    constructor(a_noi, a_elemouse, a_elemouse_image, a_src_images) {
        this.noi = a_noi; //numero máximo de imagens no slideshow

        //elemouse e image tem a classe do container que tem a as imagens do slideshow
        this.elemouse = document.getElementById(a_elemouse);
        this.image = document.getElementById(a_elemouse_image);

        this.src_images = a_src_images;
        this.mousehover = false;
        this.intervalo_switch = null;
        this.imgcounter = 1;
        this.setupEvents();
        this.slideShow();
        this.intervalo_switch = setInterval(() => this.slideSwitcher(), 4000);
    }

    //esta função faz a troca de imagens baseado no click do botão e click na imagem
    setupEvents() {
        //pega o botão de próximo e anterior
        const nextBtn = document.querySelector(".rbtn");
        const prevBtn = document.querySelector(".lbtn");

        //evento de click dos botões
        nextBtn.addEventListener("click", () => this.switchSlide(true));
        prevBtn.addEventListener("click", () => this.switchSlide(false));

        //evento de click na imagem
        this.image.addEventListener("click", () => this.switchSlide(true, true));
    }

    esperarSegundos(segundos) {
        return new Promise((resolve) => setTimeout(resolve, segundos * 1000));
    }

    async slideShow(force_bool = false) {
        // Detecta se o mouse está em cima do slideshow
        if (this.image) {
            this.elemouse.addEventListener("mouseover", () => {
                this.mousehover = true;
            });
            this.elemouse.addEventListener("mouseout", () => {
                this.mousehover = false;
            });

            if (!this.mousehover || force_bool) {
                this.image.classList.add("disappear");
                await this.esperarSegundos(0.3);
                this.image.src =
                    this.src_images[0] + this.imgcounter + this.src_images[1];
                this.image.classList.remove("disappear");
            }
        }
    }

    checkImgcounter(counter) {
        if (counter > this.noi) {
            counter = 1;
        } else if (counter < 1) {
            counter = this.noi;
        }
        return counter;
    }

    //Troca de slide auto
    slideSwitcher() {
        this.imgcounter++;
        this.imgcounter = this.checkImgcounter(this.imgcounter);
        this.slideShow();
    }

    //force_bool existe para forçar a troca de slide
    switchSlide(bool, force_bool = false) {
        clearInterval(this.intervalo_switch);
        this.intervalo_switch = setInterval(() => this.slideSwitcher(), 4000);

        if (bool) {
            this.imgcounter++;
        } else {
            this.imgcounter--;
        }

        this.imgcounter = this.checkImgcounter(this.imgcounter);
        this.slideShow(force_bool);
    }
}

//Regras:
//As imagens do slideshow tem que ter o mesmo nome a seguir do número da sua ordem. Exemplo:
//imagemex_1.jpg, imagemex_2.jpg ...
//O objeto deve ser criado com: (numero maximo de imagens, container das imagens, container das imagens, ['local/imagens','formato']);

//Exemplo de objeto:
//const obj_slide_show = new ImgSlideshow(5, 'imgslides', 'imgslides', [`images/sobre_portfolio/projeto_`,'.jpg']);

//Exemplo de HTML:
//<section>      <--- Seção onde tem o slideshow
//    <article>  <--- Parte que segura o container das imagens
//        <div>  <--- Container das imagens
//            <img class="appear" id="imgslides" src="images/projeto_1.png">
//        </div>
//    </article>
//    <div>      <-- Container dos botões
//        <button class="lbtn"> Antes </button><button class="rbtn"> Depois </button>
//    </div>
//</section>
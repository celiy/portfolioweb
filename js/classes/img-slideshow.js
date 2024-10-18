//Esta classe é um slideshow de imagens que roda automaticamente e pode ser interagido com botões ou clicks/toques
//na imagem. A classe recebe o número máximo de imagens do slideshow, o elemento que contém o container das imagens,
//o nome das imagens, formato das imagens eo elemento que contém o botão de anterior e o elemento 
//que contém o botão de proximo.

export class ImgSlideshow {
    constructor(a_noi, a_elemouse, a_elemouse_image, a_src_images) {
        this.noi = a_noi;
        this.elemouse = document.getElementById(a_elemouse);
        this.image = document.getElementById(a_elemouse_image);
        this.src_images = a_src_images;
        this.mousehover = false;
        this.intervalo_switch = null;
        this.imgcounter = 1;
        
        //Objeto para armazenar as imagens pre-loaded
        this.preloadedImages = new Map();
        
        this.preloadAllImages();
        this.setupEvents();
        this.slideShow();
        this.intervalo_switch = setInterval(() => this.slideSwitcher(), 4000);
    }

    setupEvents() {
        try {
            //pega o botão de próximo e anterior
            const nextBtn = document.querySelector(".rbtn");
            const prevBtn = document.querySelector(".lbtn");

            //evento de click dos botões
            nextBtn.addEventListener("click", () => this.switchSlide(true));
            prevBtn.addEventListener("click", () => this.switchSlide(false));

            //evento de click na imagem
            this.image.addEventListener("click", () => this.switchSlide(true, true));
        } catch (error) {
            console.log(error);
            console.log("Por causa do erro, botões de troca de imagem não podem ser implementados.");
        }
    }

    esperarSegundos(segundos) {
        return new Promise((resolve) => setTimeout(resolve, segundos * 1000));
    }

    preloadAllImages() {
        for (let i = 1; i <= this.noi; i++) {
            const imageUrl = this.src_images[0] + i + this.src_images[1];
            this.preloadImage(imageUrl, i);
        }
    }

    preloadImage(url, index) {
        return new Promise((resolve, reject) => {
            if (this.preloadedImages.has(index)) {
                resolve(this.preloadedImages.get(index));
            } else {
                const img = new Image();
                img.src = url;
                
                img.onload = () => {
                    console.log(`Imagem ${index} pré-carregada: ${url}`);
                    this.preloadedImages.set(index, img);
                    resolve(img);
                };
                
                img.onerror = () => {
                    console.error(`Erro ao carregar imagem ${index}: ${url}`);
                    reject(new Error(`Falha ao carregar imagem ${index}`));
                };
            }
        });
    }

    async preloadAllImages() {
        const loadPromises = [];
        for (let i = 1; i <= this.noi; i++) {
            const imageUrl = this.src_images[0] + i + this.src_images[1];
            loadPromises.push(this.preloadImage(imageUrl, i));
        }
        try {
            await Promise.all(loadPromises);
            console.log('Todas as imagens foram pré-carregadas');
        } catch (error) {
            console.error('Erro ao pré-carregar algumas imagens:', error);
        }
    }

    getNextImageIndex() {
        let nextIndex = this.imgcounter + 1;
        return this.checkImgcounter(nextIndex);
    }

    async slideShow(force_bool = false) {
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

                try {
                    // Espera a imagem atual carregar
                    const currentImageUrl = this.src_images[0] + this.imgcounter + this.src_images[1];
                    const loadedImage = await this.preloadImage(currentImageUrl, this.imgcounter);
                    this.image.src = loadedImage.src;

                    // Pré-carrega a próxima imagem
                    const nextIndex = this.getNextImageIndex();
                    const nextImageUrl = this.src_images[0] + nextIndex + this.src_images[1];
                    this.preloadImage(nextImageUrl, nextIndex); // Não precisamos esperar esta carregar

                    this.image.classList.remove("disappear");
                } catch (error) {
                    console.error('Erro ao carregar imagem:', error);
                    // Fallback para carregamento normal se houver erro
                    this.image.src = this.src_images[0] + this.imgcounter + this.src_images[1];
                    this.image.classList.remove("disappear");
                }
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

    async slideSwitcher() {
        this.imgcounter++;
        this.imgcounter = this.checkImgcounter(this.imgcounter);
        await this.slideShow();
    }

    async switchSlide(bool, force_bool = false) {
        clearInterval(this.intervalo_switch);
        this.intervalo_switch = setInterval(() => this.slideSwitcher(), 4000);

        if (bool) {
            this.imgcounter++;
        } else {
            this.imgcounter--;
        }

        this.imgcounter = this.checkImgcounter(this.imgcounter);
        await this.slideShow(force_bool);
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
//        <button class="lbtn"> Antes </button>
//        <button class="rbtn"> Depois </button>
//    </div>
//</section>
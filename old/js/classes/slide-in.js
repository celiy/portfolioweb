//animação de slide-in quando o elemento aparece na tela, dado a classe hidden e show
export class SlideAnimationObserver {
    constructor(hidden_class, show_class) {
        this.hidden = hidden_class;
        this.show = show_class;
        this.observer = new IntersectionObserver((entries) =>
            this.handleIntersect(entries)
        );

        this.observeElements();
    }

    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(this.show);
            } else {
                entry.target.classList.remove(this.show);
            }
        });
    }

    observeElements() {
        const hiddenElements = document.querySelectorAll(`.${this.hidden}`);
        hiddenElements.forEach((el) => this.observer.observe(el));
    }
}

//exemplo das classes hidden e show:
//
// .hidden{
//     opacity: 0;
//     filter: blur(5px);
//     transform: translateX(-100%);
//     transition: all 1s;
// }
// .show{
//     filter: blur(0px);
//     transform: translateX(0%);
//     opacity: 1;
// } 

// .hidden2{
//     opacity: 0;
//     filter: blur(5px);
//     transform: translateY(-100%);
//     transition: all 1s;
// }
// .show2{
//     filter: blur(0px);
//     transform: translateY(0%);
//     opacity: 1;
// }

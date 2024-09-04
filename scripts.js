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
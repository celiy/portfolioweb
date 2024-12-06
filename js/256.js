//JOGO 256
const validNums = [2, 4, 8, 16]
let gameinv     = []
let gametiles   = [] 
let score       = null
let selectedNum = 0;
let lastSelected;

function getRandomNum(){
    return validNums[Math.floor(Math.random() * validNums.length)]
}

document.addEventListener('DOMContentLoaded', () => {
    //pega IDS das tiles do jogo
    for (let n=1;n<10;n++){
        gametiles.push(document.getElementById(`0${n}`));
    }
    const gi1   = document.getElementById('010'); gi1.innerHTML = "<p>2</p>";
    const gi2   = document.getElementById('011');
    const gi3   = document.getElementById('012');
    gameinv     = [gi1, gi2, gi3];
    score = document.querySelector('.score');

    for (let n = 0; n < 3; n++){
        gametiles[n].innerHTML = "<p>2</p>";
    }
    for (let n = 0; n < 2; n++){
        gameinv[n+1].innerHTML = `<p>${getRandomNum()}</p>`;
    }
});

function setScore(num){
    score.innerHTML = "Pontos: "+((parseInt(score.textContent.split(':')[1])+num).toString());
}

function setRandomInv(){
    for (let n = 0; n < 3; n++){
        gameinv[n].innerHTML = `<p>${getRandomNum()}</p>`;
    }
}

function addNumInGame(){
    for (let n = 0; n < 9; n++){
        if (!gametiles[n].textContent){
            gametiles[n].innerHTML = "<p>2</p>";
            lastSelected.innerHTML = ""
            return
        }
    }
}

function renderSelected(type, num){ //causa erros, para concertar
    try{
        if (type == "RnA"){
            for (let n=0; n < 10 ;n++){
                if (num==gametiles[n].id){
                    gametiles[n].classList.remove("unselected");
                    gametiles[n].classList.add("selected");
                    return
                }
            }
        } 
        if (type == "R"){
            for (let n=0;n<10;n++){
                try{
                    gametiles[n].classList.remove("selected");
                    gametiles[n].classList.add("unselected");
                    
                } catch (err){}
            }
            for (let n=0;n<3;n++){
                try{
                    gameinv[n].classList.remove("selected");
                    gameinv[n].classList.add("unselected");
                } catch (err){} 
            }
        } 
        if (type == "GIRnA"){
            for (let n=0;n<3;n++){
                if (num==gameinv[n].id){
                    gameinv[n].classList.remove("unselected");
                    gameinv[n].classList.add("selected");
                    return
                }
            }
        }
    } catch (err){}
}

window.addNum = function(num){
    for (let n=0; n<gametiles.length; n++){
        if (num == gametiles[n].id){
            if (parseInt(gametiles[n].textContent) === selectedNum){
                if (lastSelected.id != gametiles[n].id){ //adiciona
                    const addedNum = parseInt(gametiles[n].textContent) + selectedNum;
                    setScore(addedNum);
                    gametiles[n].innerHTML = `<p>${addedNum}</p>`;
                    setRandomInv();
                    addNumInGame();
                    selectedNum = 0;
                    lastSelected = false;
                    renderSelected("R");
                    
                    return
                }
            } 
            if (selectedNum === 0 || lastSelected.id != gametiles[n].id){ //seleciona
                lastSelected = gametiles[n];
                selectedNum = parseInt(gametiles[n].textContent);
                renderSelected("RnA", gametiles[n].id);

                return
            }
            renderSelected("R");
            return
        }
        renderSelected("R");
    }
}

window.selectNum = function(num){
    for (let n=0; n<3; n++){
        if (num == gameinv[n].id){ //seleciona
            lastSelected = false
            selectedNum = parseInt(gameinv[n].textContent);
            renderSelected("R");
            renderSelected("GIRnA", gameinv[n].id);

            return
        }
    }
}
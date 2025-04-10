
/* Incrementation du nombre d'épée au click */
let sword = document.querySelector('.sword_nbr');
let swordNbr = Math.round(parseFloat(sword.innerHTML));
let smithBtn = document.querySelector('.smith_button');

function incrementSmith() {
    smithBtn.addEventListener('click', () => {
        sword.innerHTML = ++swordNbr;
    });

};
incrementSmith();

/* achat d'un autoclicker */


let clickerSpS = 0;

function buyClicker(){

let clickerCost = document.querySelector('.clicker_cost');
let parsedClickerCost = parseFloat(clickerCost.innerHTML);
let clicker = document.querySelector('.shop_content');
let clickerLevel = document.querySelector('.clicker_lvl');
let parsedClickerLevel = parseFloat(clickerLevel.innerHTML);
let clickerIncrease = document.querySelector('.clicker_increase');
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML);

    clicker.addEventListener('click', () => {
    if (swordNbr >= parsedClickerCost) {
       swordNbr-= parsedClickerCost;
       swordNbr = Math.floor(swordNbr);
       sword.innerHTML = swordNbr;
       clickerLevel.innerHTML ++;
       clickerIncrease.innerHTML = ++ parsedClickerIncrease;
       clickerCost.innerHTML = Math.round(parsedClickerCost *= 1.5);
       clickerSpS = clickerIncrease.innerHTML - 1;
       }
 });  
}

buyClicker();
/* lancement de l'autoclicker */

function autoclicker () {
    swordNbr += clickerSpS;
    swordNbr = Math.floor(swordNbr);
sword.innerHTML = swordNbr;
}
setInterval(autoclicker,1000);

autoclicker();

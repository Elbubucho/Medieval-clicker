
/* Incrementation du nombre d'épée au click */
let swordNbr = document.querySelector('.sword_nbr');
let smithBtn = document.querySelector('.smith_button');

function incrementSmith() {
    smithBtn.addEventListener('click', () => {
        swordNbr.innerHTML = parseFloat(swordNbr.innerHTML) + 1;
    });

};
incrementSmith();


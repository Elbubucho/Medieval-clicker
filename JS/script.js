
let sword = document.querySelector('.sword_nbr');
let swordNbr = Math.round(parseFloat(sword.innerHTML));
let smithBtn = document.querySelector('.smith_button');
let swordPerClick = 0;
let wholeSpS = 0;

/* Incrementation du nombre d'épée au click en fonction des objets achetés et MAJ du nbr affiché */
function incrementSmith() {
    smithBtn.addEventListener('click', () => {
        swordNbr += swordPerClick;
        sword.innerHTML = ++swordNbr;
    });

};
incrementSmith();
/* MAJ de l'affichage generé passivement */



/* achat des objets */
let shopItems = {
    clicker : {
        cost:10,
        level:0,
        costMultiplier:1.3,
        spsIncrement:1,
        type:'morePerSeconde',
        element: document.querySelector('.shop_content.cursor'),
        costElement:document.querySelector('.clicker_cost'),
        levelElement:document.querySelector('.clicker_lvl'),
        increaseElement:document.querySelector('.clicker_increase'),
    },

    blacksmith : {
        cost:150,
        level:0,
        costMultiplier:1.6,
        spsIncrement:5,
        type:'morePerSeconde',
        element: document.querySelector('.shop_content.blacksmith'),
        costElement:document.querySelector('.blacksmith_cost'),
        levelElement:document.querySelector('.blacksmith_lvl'),
        increaseElement:document.querySelector('.blacksmith_increase'),
    
    },
    hammer : {
        cost:100,
        level:0,
        costMultiplier:1.6,
        spsIncrement:3,
        type:'morePerClick',
        element: document.querySelector('.shop_content.hammer'),
        costElement:document.querySelector('.hammer_cost'),
        levelElement:document.querySelector('.hammer_lvl'),
        increaseElement:document.querySelector('.hammer_increase'),
    },
    oven: {
        cost:7000,
        level:0,
        costMultiplier:2,
        spsIncrement:50,
        type:'morePerClick',
        element: document.querySelector('.shop_content.oven'),
        costElement:document.querySelector('.oven_cost'),
        levelElement:document.querySelector('.oven_lvl'),
        increaseElement:document.querySelector('.oven_increase'),

    }
};

function buyItems(){
    let shopContent = document.querySelectorAll('.shop_content');
    shopContent.forEach(shopContent => {
        shopContent.addEventListener('click', () => {

         let itemData = shopContent.dataset.item;

         let shopItemsCost =  shopItems[itemData].costElement.innerHTML;

            if(swordNbr >= shopItemsCost) {

                    let shopItemsCostElement = parseFloat(shopItems[itemData].costElement.innerHTML);
                    let shopItemsLevelElement = parseFloat(shopItems[itemData].levelElement.innerHTML);
                    let shopIncreaseElement = parseFloat(shopItems[itemData].increaseElement.innerHTML);
                    let shopCostElement = parseFloat(shopItems[itemData].costElement.innerHTML);

                    swordNbr -=shopItemsCostElement;
                    swordNbr = Math.floor(swordNbr);
                    sword.innerHTML = swordNbr;

                    shopItemsLevelElement ++;
                    shopItems[itemData].levelElement.innerHTML = shopItemsLevelElement;

                    shopIncreaseElement += shopItems[itemData].spsIncrement;
                    shopItems[itemData].increaseElement.innerHTML = shopIncreaseElement;

                    shopCostElement *= shopItems[itemData].costMultiplier;
                    shopItems[itemData].costElement.innerHTML = Math.floor(shopCostElement);

                if( shopItems[itemData].type === 'morePerSeconde'){
                    wholeSpS += shopItems[itemData].spsIncrement;
                }
                else{
                    swordPerClick+= shopItems[itemData].spsIncrement;
                }

                function swordPerSeconde() {
                    let returnSpS = document.querySelector('.sps_counter');
                    let parsedReturnSpS = parseFloat(returnSpS.innerHTML);
                
                        if (wholeSpS >= 1) {
                            parsedReturnSpS = wholeSpS;
                            returnSpS.innerHTML = parsedReturnSpS;
                        }
                };
                swordPerSeconde();
                
            }
        });
    });
}

buyItems();

/* lancement de l'autoclicker en fonction des objets achetés*/

function autoclicker () {
    swordNbr += wholeSpS;
    swordNbr = Math.floor(swordNbr);
    sword.innerHTML = swordNbr;
}
setInterval(autoclicker,1000);
autoclicker();

function greyitems(){
    let shopContent = document.querySelectorAll('.shop_content');
     shopContent.forEach(shopContent => {
        let itemData = shopContent.dataset.item;
        let shopItemsCost =  parseFloat(shopItems[itemData].costElement.innerHTML);
        if (swordNbr < shopItemsCost){
            shopContent.classList.add('not_enough_money');
        }
        else {
            shopContent.classList.remove('not_enough_money');
        }
    });
}
greyitems();
setInterval(greyitems,100);
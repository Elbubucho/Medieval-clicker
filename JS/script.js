// Element principaux du DOM

const sword = document.querySelector('.sword_nbr');
const smithBtn = document.querySelector('.smith_button');
const returnSpS = document.querySelector('.sps_counter');
const flyingSword = document.querySelector('.flying_sword');
const gridCenter = document.querySelector('.grid_center');
const allShopContent = document.querySelectorAll('.shop_content');

// variable de jeu

let swordNbr = Math.round(parseFloat(sword.innerHTML));
let swordPerClick = 0;
let wholeSpS = 0;
let parsedReturnSpS = parseFloat(returnSpS.innerHTML);

// Incrementation du nombre d'épée au click

smithBtn.addEventListener('click', (event) => {
    animatedSwordFromButtonClick(event);
    swordNbr += swordPerClick;
sword.innerHTML = ++swordNbr;
});


/* Save Load */

function save() {
    localStorage.clear();    
    allShopContent.forEach(shopContent => {
        let itemData = shopContent.dataset.item;
        let shopItem = shopItems[itemData];
        const saveObj = JSON.stringify({
            parsedLevel: parseFloat(shopItem.levelElement.innerHTML),
            parsedCost: parseFloat(shopItem.costElement.innerHTML),
            parsedIncrease: parseFloat(shopItem.increaseElement.innerHTML),
        });

        localStorage.setItem(itemData, saveObj)
    });
    localStorage.setItem('swordPerClick', JSON.stringify(swordPerClick));
    localStorage.setItem('wholeSpS', JSON.stringify(wholeSpS));
    localStorage.setItem('swordNbr', JSON.stringify(swordNbr));
    localStorage.setItem('parsedReturnSpS', JSON.stringify(parsedReturnSpS));


}

function load() {
    allShopContent.forEach(shopContent => {
        let itemData = shopContent.dataset.item;
        let shopItem = shopItems[itemData];

        const savedObj = JSON.parse(localStorage.getItem(itemData))
        shopItem.costElement.innerHTML = savedObj.parsedCost
        shopItem.levelElement.innerHTML = savedObj.parsedLevel
        shopItem.increaseElement.innerHTML = savedObj.parsedIncrease

    })
    swordPerClick = JSON.parse(localStorage.getItem('swordPerClick'))
    wholeSpS = JSON.parse(localStorage.getItem('wholeSpS'))
    swordNbr = JSON.parse(localStorage.getItem('swordNbr'))
    parsedReturnSpS = JSON.parse(localStorage.getItem('parsedReturnSpS'))
    returnSpS.innerHTML = parsedReturnSpS;
    CustomHammerCursor();
    startBsAnimation();
}

// Objet contenant les items du shop

let shopItems = {
    clicker: {
        costMultiplier: 1.35,
        spsIncrement: 1,
        type: 'morePerSeconde',
        element: document.querySelector('.shop_content.cursor'),
        costElement: document.querySelector('.clicker_cost'),
        levelElement: document.querySelector('.clicker_lvl'),
        increaseElement: document.querySelector('.clicker_increase'),
    },

    blacksmith: {
        costMultiplier: 1.4,
        spsIncrement: 5,
        type: 'morePerSeconde',
        element: document.querySelector('.shop_content.blacksmith'),
        costElement: document.querySelector('.blacksmith_cost'),
        levelElement: document.querySelector('.blacksmith_lvl'),
        increaseElement: document.querySelector('.blacksmith_increase'),

    },
    hammer: {
        costMultiplier: 1.4,
        spsIncrement: 3,
        type: 'morePerClick',
        element: document.querySelector('.shop_content.hammer'),
        costElement: document.querySelector('.hammer_cost'),
        levelElement: document.querySelector('.hammer_lvl'),
        increaseElement: document.querySelector('.hammer_increase'),
    },
    oven: {
        costMultiplier: 1.6,
        spsIncrement: 50,
        type: 'morePerClick',
        element: document.querySelector('.shop_content.oven'),
        costElement: document.querySelector('.oven_cost'),
        levelElement: document.querySelector('.oven_lvl'),
        increaseElement: document.querySelector('.oven_increase'),

    }
};

// affichage du gain par seconde

function displaySwordPerSeconde() {
    parsedReturnSpS = wholeSpS;
    returnSpS.innerHTML = parsedReturnSpS;
};

// mise à jour des bonus 

function updateIncrementor(itemData) {
    if (shopItems[itemData].type === 'morePerSeconde') {
        wholeSpS += shopItems[itemData].spsIncrement;
    }
    else {
        swordPerClick += shopItems[itemData].spsIncrement;
    }
};
// mis à jour du nombre d'épées

function updateSwordNbr(swordsNbr, shopItemCost) {
    swordsNbr -= shopItemCost;
    swordNbr = Math.floor(swordNbr);
    sword.innerHTML = swordNbr;
}
// vérification du cout

function canBuy(itemData){
   return swordNbr >= parseFloat(shopItems[itemData].costElement.innerHTML);
}
// maj du coup des items

function updateCost(itemData) {
    let shopCostElement = parseFloat(shopItems[itemData].costElement.innerHTML);
    shopCostElement *= shopItems[itemData].costMultiplier;
    shopItems[itemData].costElement.innerHTML = Math.floor(shopCostElement);
}

// maj de la valeur qu'apporte les items 

function increaseItemBonus(itemData){
    let shopIncreaseElement = parseFloat(shopItems[itemData].increaseElement.innerHTML);
    shopIncreaseElement += shopItems[itemData].spsIncrement;
    shopItems[itemData].increaseElement.innerHTML = shopIncreaseElement;
}

//maj du niveau des items

function updateLevel(itemData){
    let shopItemsLevelElement = parseFloat(shopItems[itemData].levelElement.innerHTML);
    shopItemsLevelElement++;
    shopItems[itemData].levelElement.innerHTML = shopItemsLevelElement;
}

function buyItems() {
allShopContent.forEach(shopContent => {
    shopContent.addEventListener('click', () => {

        const itemData = shopContent.dataset.item;
        if (canBuy(itemData)) {
            const shopItemsCostElement = parseFloat(shopItems[itemData].costElement.innerHTML);
            updateSwordNbr(swordNbr,shopItemsCostElement);
            increaseItemBonus(itemData);
            updateCost(itemData);
            updateLevel(itemData);
            CustomHammerCursor();
            startBsAnimation();
            updateIncrementor(itemData);
            displaySwordPerSeconde();
            autoclicker();
        }
    });
});
};

buyItems();

// lancement de l'autoclicker 

function autoclicker() {
    swordNbr += wholeSpS;
    swordNbr = Math.floor(swordNbr);
    sword.innerHTML = swordNbr;
}
setInterval(autoclicker, 1000);


// griser les objets qu'on ne peut acheter

function greyitems() {
    let shopContent = document.querySelectorAll('.shop_content');
    shopContent.forEach(shopContent => {
        let itemData = shopContent.dataset.item;
        let shopItemsCost = parseFloat(shopItems[itemData].costElement.innerHTML);
        if (swordNbr < shopItemsCost) {
            shopContent.classList.add('not_enough_money');
        }
        else {
            shopContent.classList.remove('not_enough_money');
        }
    });
}
greyitems();
setInterval(greyitems, 100);

// Animaition des épées volantes

const swordTiming = {
    duration: 2000,
    iterations: 1,
};

function getRandomPosition(element) {
    const elementRect = element.getBoundingClientRect();
    const x = Math.random() * (elementRect.width - flyingSword.offsetWidth);
    const y = Math.random() * (elementRect.height - flyingSword.offsetHeight);
    return { x, y };
}

function getMousePosition(event, element) {
    const elementRect = element.getBoundingClientRect();
    const relativeX = event.clientX - elementRect.left;
    const relativeY = event.clientY - elementRect.top;
    return { relativeX, relativeY };
}

function animatedSwordFromButtonClick(event) {
    let flyingClone = flyingSword.cloneNode(true);
    gridCenter.appendChild(flyingClone);
    flyingClone.classList.add("display_animation");

    const { relativeX, relativeY } = getMousePosition(event, gridCenter);
    const { x, y } = getRandomPosition(gridCenter);

    const swordAnimation = [
        { transform: `translate(${relativeX}px, ${relativeY}px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x}px, ${y}px) rotate(360deg)`, opacity: 0 },
    ];

    const animation = flyingClone.animate(swordAnimation, swordTiming);
    animation.onfinish = () => {
        flyingClone.classList.remove("display_animation");
    }
}

// curseur personnalisé

function CustomHammerCursor() {
    if (parseFloat(shopItems.hammer.levelElement.innerHTML) > 0) {
        const customCursor = document.querySelector('.custom_cursor');
        document.body.classList.add('no_cursor');

        const cursorAnimation = [
            { transform: 'translate(-50%, -50%) rotate(0deg)' },
            { transform: 'translate(-50%, -50%) rotate(70deg)' },
        ];
        const cursorTiming = {
            duration: 200,
            iterations: 1,
        };

        document.addEventListener('mousemove', (e) => {
            customCursor.style.top = `${e.clientY}px`;
            customCursor.style.left = `${e.clientX}px`;
        });
        document.addEventListener('click', () => {
            customCursor.animate(cursorAnimation, cursorTiming);
        });
    }
}



// animation forgeron


const canvas = this.document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let gameFrame = 0;

class BlackSmith {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.image = document.getElementById('bs_spritesheet');
        this.spriteWidth = 400;
        this.spriteHeight = 400;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.scale = 0.7;
        this.x = this.canvasWidth / 2 - this.width * this.scale;
        this.y = this.canvasHeight / 2 - this.height * this.scale;
        this.minFrame = 0;
        this.maxFrame = 19;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
    }
    draw(context) {                                  //méthode d'instance pour dessiner la première image dans le canvas
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
    update() {                                      // méthode d'instance pour mettre a jour chaque frame (va parcourir la spritsheet)
        if (gameFrame % 2 === 0) {
            if (this.frame === this.maxFrame) {

            }
            if (this.frame < this.maxFrame) this.frame++;
            else this.frame = this.minFrame;
            this.frameX = this.frame % 4;               //permet de parcouri la ligne
            this.frameY = Math.floor(this.frame / 4);   // permet de parcourir les colones(pas besoin ici mais)
        }
    }
}

//initialisation d'un forgeron

const forgeron = new BlackSmith(canvas.width, canvas.height);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    forgeron.draw(ctx);
    forgeron.update();
    gameFrame++;
    requestAnimationFrame(animate);
}

let isWorking = false

function startBsAnimation() {
    if (parseFloat(shopItems.blacksmith.levelElement.innerHTML) > 0) {
        if (isWorking === false) {
            isWorking = true;
            animate();
        }
    }
}
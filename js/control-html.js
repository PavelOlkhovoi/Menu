let navbarList = document.querySelector('#navbar__list');
let burger = document.querySelector('.burger');
let burgerList = document.querySelector('.burger__list');
let burgerItem = document.getElementsByClassName('burger-link');
let overlay = document.querySelector('.overlay');
let items = document.getElementsByClassName('navbar__item');
let links = document.getElementsByClassName('navbar__links');


window.addEventListener('resize', buildActualMenu);

burgerList.addEventListener('click', controlBurger);

// Show and hide the button for additional menu 
burger.addEventListener('click', function(){
   overlay.classList.toggle('overlay-active');
});

// Show and hide additional menu
overlay.addEventListener('click', function(){
    overlay.classList.toggle('overlay-active');
 });
 
//Processing clicks in the hidden menu
function controlBurger(e){

    e.preventDefault();
    //This function clears double links in Menu
    clearClones();
    if(e.target.tagName.toLowerCase() === 'div' || e.target.tagName.toLowerCase() === 'ul'){
        overlay.classList.toggle('overlay-active');
        return false;
    }


    // Preparing and launching the scrolling function from Burger links
    if(e.target.tagName.toLowerCase() === 'a') {
        let relatedSectionId = e.target.dataset.target;
        let relatedSection = document.querySelector(`section[data-nav="Section ${relatedSectionId}"]`);
        scrollParams(getTopOffset(relatedSection));
    }

    // Pass item from Burger to Main ul
    e.target.classList.add('active');
    let parentOfTheLink = e.target.closest('li');
    let clone = parentOfTheLink.cloneNode(true);
    clone.classList.add('link-from-burger');

    // This link will be added to "Main Menu"
    navbarList.insertAdjacentElement('afterbegin', clone);
    
    // set active class for new appearing link
    let newLink = clone.querySelector('.navbar__links');

    toggleActiveClass(newLink);
    buildActualMenu();
}

// The function controls the distribution of space by click
function placeOfMenu(linkElem){
    clearClones();
    if(linkElem.tagName.toLowerCase() === 'a'){
        let itemLink = linkElem.closest('li');
        let clone = itemLink.cloneNode(true);
        clone.classList.add('clone');
        itemLink.classList.add('temporary-disable');
        navbarList.insertAdjacentElement('afterbegin', clone);
    }

}

// Clearing temporary duplicate links
function clearClones(){
    // Remove a clone in "Main Menu"
    for(let item of items){
        if(item.classList.contains('clone')){
            navbarList.removeChild(item);
        }

        if(item.classList.contains('link-from-burger')){
            navbarList.removeChild(item);
            item.style.backgroundColor = "green";
        }
    }


   clearDisabledLink();

}

// Clearing temporary classes from links
function clearDisabledLink(){
    for(let item of items){
        if(item.classList.contains('temporary-disable')){
            item.classList.remove('temporary-disable');
        }
    }
}

// Toggle an active Link
function toggleActiveClass(element){
    for(let item of links){
        if(item !== element) {
            item.classList.remove('active');
        }
    }
    element.classList.add('active');

}

// Builds Main menu
// Controls the size of menu. Maximum size is 2 stroke.
function buildActualMenu(){
    // Get the width of "Menu container"
    let coverW = parseInt(getComputedStyle(navbarList).width);
    let cowerDouble = coverW * 2;
    let currentSum = 0;
    let countIteration = 0;
    let freeSpaceStart = 0;

    for(let item of items) {
        let widthLink = getRealWidthsOfElement(item);

        countIteration++;

        if(cowerDouble > currentSum + widthLink){
            currentSum += widthLink;
            freeSpaceStart = cowerDouble - currentSum;

            // Sometimes I get too large or small menu than I expected 
            // Hier, I tried to find a solution how to fix some inaccuracies. But without success.

            // if(currentSum > ConvolverNode - 200){
            // if(freeSpaceStart < widthLink) {
            //     item.style.backgroundColor = "blue";
            // }else {
            //     burgerNotActive();
            //     thisLinkGoToBurger(item);
            // }

        }else {
            burgerNotActive();
            thisLinkGoToBurger(item);
        }

    }

}

// The link moves from the main menu to the hidden one
function thisLinkGoToBurger(item){
    burger.classList.add('burger-active');
    item.classList.add('burger-link');
    burgerList.insertAdjacentElement('afterbegin', item);
}

// Hides the additional menu icon
function burgerNotActive(){
    burger.classList.remove('burger-active');
}



let navbarList = document.querySelector('#navbar__list');
let navbarListWidth = parseInt(window.getComputedStyle(navbarList).width);
let navItems = document.getElementsByClassName('navbar__item');
let items = document.getElementsByClassName('navbar__item');

// buildActualMenu();

window.addEventListener('resize', buildActualMenu);

// Builds Main menu
// Controls the size of menu. Maximum size is 2 stroke.
function buildActualMenu(){
    clearActualMenu();
    let burgerNavItems = []; 
    let cover = document.querySelector('#navbar__list');
    let coverW = getComputedStyle(cover).width;
    // let items = document.getElementsByClassName('navbar__item');
    let currentSum = 0;


    for(let item of items) {
        currentSum += getRealWidthsOfElement(item);
        if(parseInt(coverW) * 2 - 200 < currentSum){
            item.classList.add('togtest');
            console.log('push');
            burgerNavItems.push(item.textContent);
        }
    }

    console.log(burgerNavItems);

}

// Technical helper to clear classes of buildActualMenu function 
function clearActualMenu(){
    let items = document.getElementsByClassName('navbar__item');
    for(let item of items){
        item.classList.remove('togtest');
    }
}



// function getArrayWidthsOfInternalElement(element){
//     let pureArray = [];
//     let elementComputedStyle = window.getComputedStyle(element);

//     pureArray.push(elementComputedStyle.width);
//     pureArray.push(elementComputedStyle.marginRight);
//     pureArray.push(elementComputedStyle.marginLeft);
//     pureArray.push(elementComputedStyle.borderLeftWidth);
//     pureArray.push(elementComputedStyle.borderRightWidth);

//     return pureArray;
// }

// Function includes margins Top and Bottom 
// function getArrayHeightsOfInternalElement(element){
//     let pureArray = [];
//     let elementComputedStyle = window.getComputedStyle(element);

//     pureArray.push(elementComputedStyle.height);
//     pureArray.push(elementComputedStyle.marginTop);
//     pureArray.push(elementComputedStyle.marginBottom);

//     return pureArray;
// }

// /*TODO - Move to new Js file -- Computed*/

// function getRealSize(...computedElements){
//     let sum = 0;
//     for(let element of computedElements){
//         sum += parseInt(element);
//     }

//     return sum;
// }

// function getSumOflSizes(sumArr){
//     let sum = 0;
//     for(let i = 0; i < sumArr.length; i++){
//         for(let element of sumArr[i]){
//             sum += parseInt(element);
//         }
    
//     }
//     return sum;
// }

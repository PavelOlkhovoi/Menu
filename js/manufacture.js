document.addEventListener('DOMContentLoaded', function(){

let sectionAll = document.getElementsByTagName('section');
let [title, nounForItem] = titleRendom(); 
let mainTag = document.querySelector('main');
let dataNavCounter = 3;

for (let i = 0; i < 12; i++) {
    let renderSection = generateFakeSection();
    mainTag.insertAdjacentElement('beforeend', renderSection);
}


renderNav();
buildActualMenu();

function renderNav(){
    let docFragment = document.createDocumentFragment();
    let counterSection = 1;

for (let section of sectionAll){
    let item = manufactureHTML('li', 'navbar__item');
    let textForLink = section.getAttribute('data-name');
    let link = manufactureHTML('a', 'navbar__links', textForLink, 'target', `${counterSection}`);
    let liElement = mergeTags(item, link);
    docFragment.appendChild(item);
    counterSection === sectionAll.length + 1 ? counterSection = 1 : counterSection++;
}
    document.querySelector('#navbar__list').appendChild(docFragment);
}

// Use "data-name" attribute for correct work
function generateFakeSection(){
    // get title and value for "data-name"
    let [title, dataNameValue] = titleRendom();
    let paragraphs = paragraphRendom();

    let newDataCaunter = dataNavCounter + 1;

    let section = manufactureHTML('section', 'fake-section', null, "name", dataNameValue);
    let sectionContainer = manufactureHTML('div', 'landing__container');

    section.setAttribute(`data-nav`, `Section ${newDataCaunter}`);
    dataNavCounter++;

    mergeTags(section, sectionContainer);
    sectionContainer.insertAdjacentHTML('beforeend', `<h2>${title}</h2>`);

    for(let item of paragraphs){
        sectionContainer.insertAdjacentHTML('beforeend', `<p>${item}</p>`);
    }

    return section;
}
    
// Create an HTML tag with class
function manufactureHTML(tagName, className, text = null, customData = null, dataValue = null){
    let typeOfTag = document.createElement(tagName);
    let linkCheck = tagName === 'a' ? typeOfTag.href="#" : null;
    typeOfTag.classList.add(className);
    let textCheck = text === null ? null : typeOfTag.textContent = text;
    if(customData!== null && dataValue !== null) {
        typeOfTag.setAttribute(`data-${customData}`, dataValue);
    }

    return typeOfTag;
}

function mergeTags(parentElement, childElement, positionInsertion = 'beforeEnd'){
    parentElement.insertAdjacentElement(positionInsertion, childElement);
    return parentElement;
}

});
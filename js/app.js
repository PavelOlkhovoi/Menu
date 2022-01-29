document.addEventListener('DOMContentLoaded', function(){
  
  let navbarList = document.querySelector('#navbar__list');
  let burger = document.querySelector('.burger');
  let burgerList = document.querySelector('.burger__list');
  let burgerItem = document.getElementsByClassName('burger-link');
  let overlay = document.querySelector('.overlay');
  let items = document.getElementsByClassName('navbar__item');
  let links = document.getElementsByClassName('navbar__links');
  let sectionAll = document.getElementsByTagName('section');
  let [title, nounForItem] = titleRendom(); 
  let mainTag = document.querySelector('main');
  //Amount of original sections (with real contents)
  let dataNavCounter = 3;

  // Generate testing sections
  for (let i = 0; i < 12; i++) {
    let renderSection = generateFakeSection();
    mainTag.insertAdjacentElement('beforeend', renderSection);
  }

  // Insert links in header menu
  renderNav();

  // Cheking size of menu and generate additional menu
  buildActualMenu();

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
   
  // Scroll site from menu to section
   navbarList.addEventListener('click', ScrollToParent);


  // Control active sections by scrolling
   window.addEventListener('scroll', function() {
    let coverSection = document.querySelector('main');
    
    for(let section of sectionAll){
    let sectionTopOffset = section.offsetTop;
        

    if(window.pageYOffset >= sectionTopOffset - 200) {
      let targetLink = document.querySelector(`a[data-target="${section.dataset.nav}"]`);
      section.classList.add('section-active');
      targetLink.style.color = 'gold';
      if(targetLink.parentNode.classList.contains('burger-link')){
        burger.style.backgroundColor = 'gold';
        placeOfMenu(targetLink);
      }else {
        burger.style.backgroundColor = 'transparent';
        placeOfMenu(targetLink);
      }

      for(let link of links){
        if(link.dataset.target !== section.dataset.nav && link.parentNode.classList.contains('burger-link')){
            link.style.color = 'white';

        }else if (link.dataset.target !== section.dataset.nav){
          link.style.color = 'black';
        }
      }
      
    }else{
      section.classList.remove('section-active');
    }
    }
  });
  
  
  
  // Processing clicks in the hidden menu
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
        let relatedSection = document.querySelector(`section[data-nav="${relatedSectionId}"]`);
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
    // TODO ---- CLEAN HERE
    if(linkElem.tagName.toLowerCase() === 'a' && linkElem.dataset.target != 1){
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
  
  // Build actual menu
  function buildActualMenu(){
    // Get the width of "Menu container"
    let coverH = parseInt(getComputedStyle(navbarList).height);
    let cowerDouble = coverH * 2;
    let oneLinkH = items[0].getBoundingClientRect().height;
    let currentSum = 0;
    let countIteration = 0;
    let freeSpaceStart = 0;
  
    for (let i = items.length; i > 0; i--) {
        let coverH = parseInt(getComputedStyle(navbarList).height);
  
        if(coverH > 80){
            thisLinkGoToBurger(items[i-1]);
        }else{
            
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
  
  
  
  
  // Generates random functions
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
  
    section.setAttribute(`data-nav`, newDataCaunter);
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
  
  
  
  
   // Scroll functions
  function ScrollToParent(e){
    e.preventDefault();
    let relatedSectionId = e.target.dataset.target;
    if(e.target.tagName.toLowerCase() === 'a') {
      let relatedSection = document.querySelector(`section[data-nav="${relatedSectionId}"]`);
      scrollParams(getTopOffset(relatedSection));
    }
  
    toggleActiveClass(e.target);
    placeOfMenu(e.target);
  }
  
  
  function scrollParams(offsetTop){
    let currentScrollPosition = document.documentElement.scrollTop;
    window.scrollBy({
      top: offsetTop - 40 - window.pageYOffset,
      left: 0,
      behavior: 'smooth'
    });
  
  }
  
  
  
  
  // Math f-s
  function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  
  function getTopOffset(element){
    return element.offsetTop;
  }
  
  function titleRendom(){
    let adjectives =  [
        'new', 'basic', 'boring', 'cheap', 'confident', 'conscious', 'efficient', 'expensive', 'fair', 'full', 'hot',
        'illegal', 'independent', 'leading', 'loose', 'necessary', 'old', 'opposite', 'rare', 'remarkable', 'sensible',
        'suitable', 'tight'
    ];
  
    let nouns = [
        'action', 'authority', 'business', 'car', 'city', 'community', 'decision', 'development', 'education', 'end', 'face',
        'fact', 'family', 'father', 'game', 'group', 'house', 'idea', 'industry', 'information', 'language', 'law', 'level',
        'manager', 'market', 'mind', 'opportunity', 'period', 'power', 'problem', 'problem', 'relationship', 'result', 'road',
        'service', 'society', 'street', 'term', 'view', 'word', 'work'
    ]; 
    // Set a random number of adjectives
    let phraseAdjLength = random(1, 3);
    // It helps to avoid repetition
    let uniqWords = new Set();
    // Get a random number of nouns
    let randomNoun = nouns[random(0, nouns.length - 1)];
    // Sets the number of words for the menu item
    let shortOrBigNoun = random(0, 1);
    // Get the menu item
    let nounForItem = '';
    // Get final title for a section
    let phrase = '';
    let iteration = 1;
    
  
    // Create first part of sentences by adjective 
    for (let i = 0; i < phraseAdjLength; i++) {
        let randomIndex = random(0, adjectives.length - 1);
        let adjective = adjectives[randomIndex];
        uniqWords.add(adjective);
    }
  
    // Add noun and complete the title
    uniqWords.add(randomNoun);
  
    // Additional manipulation
    for(let word of uniqWords){
        if(iteration == 1) {
            // Make the first word with a capital letter 
            phrase += `${capitalizeFirstLetter(word)} `;
            // Create variants for links in the menu
            nounForItem = shortOrBigNoun == 1 ? `${capitalizeFirstLetter(word)} ${randomNoun}` : capitalizeFirstLetter(randomNoun);
        }else{
            // Create the final stringн7 for further manipulations
            phrase += `${word} `;
        }
        iteration++;
    }
  
    iteration = 1;
    return [phrase, nounForItem];
  }
  
  function paragraphRendom(){
    let fakeParagrah = [
        'Cupcake ipsum dolor sit amet. Liquorice sesame snaps muffin pastry chocolate cake. Oat cake dessert shortbread chocolate bar donut jelly-o. Marzipan jelly wafer donut cookie fruitcake lemon drops.',
        'Chupa chups powder dessert biscuit topping chocolate bar croissant. Dragée chocolate cake muffin I love sweet roll chocolate bar cake bonbon. Muffin jelly tiramisu chupa chups bear claw.',
        'Sesame snaps jujubes macaroon croissant oat cake brownie fruitcake fruitcake chocolate. Apple pie jelly cheesecake powder cotton candy sesame snaps chocolate bar. Marshmallow soufflé icing tiramisu halvah jelly.',
        'Gummies candy canes cookie dessert tiramisu sweet chocolate bar. Gummi bears pastry sweet pudding sesame snaps gummies shortbread cupcake icing. Chocolate cake pudding tart chocolate cake cake sugar plum pastry.',
        'Cupcake ipsum dolor sit amet. Fruitcake cake sweet cookie candy canes. Pudding I love sweet jujubes cupcake candy canes danish toffee. Fruitcake apple pie marshmallow tiramisu fruitcake carrot cake I love gummi bears sweet. Shortbread oat cake chocolate pudding cotton candy. Pastry jelly beans gingerbread tootsie roll cupcake bear claw jelly. Chupa chups croissant brownie candy pie.',
        'I love cookie bear claw marshmallow I love marshmallow carrot cake lollipop. I love croissant muffin I love pie gummies. I love cake cookie candy canes I love cheesecake sweet roll brownie. Oat cake jujubes cake sweet roll jelly powder pastry. Dessert fruitcake gummi bears cake croissant carrot cake cupcake. Gummi bears oat cake oat cake apple pie chocolate cupcake topping. Liquorice jelly candy canes pie sweet roll I love toffee. Marshmallow chupa chups cupcake pastry marshmallow I love. Cake I love sweet halvah candy canes pastry dragée.',
        'Topping cupcake I love shortbread cake. Macaroon bear claw liquorice cake I love donut. Topping carrot cake cupcake topping donut icing. Halvah jelly donut I love bear claw jelly beans I love fruitcake cake. Carrot cake gingerbread oat cake biscuit bear claw icing. Macaroon jelly beans marshmallow powder jelly beans icing shortbread cheesecake I love.',
        'Ice cream gummi bears donut muffin dragée I love. Lollipop gummies liquorice sesame snaps I love pie dessert. Croissant marshmallow chupa chups sweet roll jelly beans. Biscuit pastry bear claw tiramisu cake candy canes jelly chocolate bar. Liquorice sweet I love I love I love oat cake chocolate bar shortbread ice cream. Cake candy canes macaroon toffee bonbon topping.',
        'Gummi bears chupa chups shortbread I love gummi bears jujubes danish jelly. Cheesecake muffin jelly-o marshmallow fruitcake. Sweet pudding candy canes icing topping oat cake cotton candy liquorice. Pudding jujubes chupa chups icing powder donut. I love gingerbread candy I love tart. Muffin carrot cake powder bear claw tart.'
    ];
    let uniqueText = new Set();
    let rendomSize = random(2, 4);
    for(let i = 0; i < rendomSize; i++){
        uniqueText.add(fakeParagrah[random(0, fakeParagrah.length-1)]);
    }
    return uniqueText;
  }
  
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
 
});





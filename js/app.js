let testSection = document.getElementsByTagName('section');
let testNav = document.querySelectorAll('.navbar__item');


navbarList.addEventListener('click', ScrollToParent);



function ScrollToParent(e){
  e.preventDefault();
  let relatedSectionId = e.target.dataset.target;
  if(e.target.tagName.toLowerCase() === 'a') {
    let relatedSection = document.querySelector(`section[data-nav="Section ${relatedSectionId}"]`);
    scrollParams(getTopOffset(relatedSection));
  }
}


function scrollParams(offsetTop){
  let currentScrollPosition = document.documentElement.scrollTop;
  window.scrollBy({
    top: offsetTop - 40 - window.pageYOffset,
    left: 0,
    behavior: 'smooth'
  });

}

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



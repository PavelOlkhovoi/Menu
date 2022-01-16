const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRealWidthsOfElement(element){
    let width = 0;
    let elementComputedStyle = window.getComputedStyle(element);


    width += element.getBoundingClientRect().width;
    width += parseInt(elementComputedStyle.marginRight);
    width += parseInt(elementComputedStyle.marginLeft);
    width += parseInt(elementComputedStyle.borderLeftWidth);
    width += parseInt(elementComputedStyle.borderRightWidth);
    return width;
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

/*
 * Create a list that holds all of your cards
 */
window.onload = function() {
  createCards();
};

let cardList = ['fa-diamond','fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube' ];

//variables
const deck = document.querySelector(".deck");



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//console.log(cardList);

const restartButton = document.querySelector('.restart');

function createCards() {
  deck.innerHTML = '';
  shuffle(cardList);
  console.log(cardList);

  for(let i = 0; i < cardList.length; i++){

    let el = document.createElement("li");
    let innerEl = document.createElement("li");
    innerEl.classList.add('fa', cardList[i]);
    el.appendChild(innerEl);
    el.classList.add('card');
    deck.appendChild(el);
    /*
    start with the html

    <li class="card"></li>
    add inner html of '<li class="fa ' + cardList[i] + '">'
    */
    console.log(cardList[i]);
  }
}

restartButton.addEventListener('click', createCards);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)DONE
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];

function lockCardsOpen(card){
  //add permanate open position meaning add match css
  alert(card);
  card.classList.add('match');
};

function addCardToOpenList(card) {
  //add card to array
  openCards.push(card);
  //alert(openCards);
  //if array is now two  and cards match, run a function to lock the cards in position, empty list

  //if array is now two but cards do not match run a function to remove cards from list hide cards symbol
};

//turns over the card
//needs to get the icon class
function addOpenShow(el){
  el.classList.add('open', 'show');

}


/*
deck.addEventListener('click', function(event){
  //open and show class
  event.target.classList.add('open', 'show');
  console.log("hey");
})
*/

/*
function compareCards(){
  if(openCards[0] === openCards[1]){
    alert('they are a match');
    //lock cards open
    lockCardsOpen();
    openCards = [];
  } else {
    alert('They do not match');
    //turn the cards over
    openCards = [];
  }
  //lockCardsOpen

  //if the two cards are differnt then turn them over
  //turncardsover
};

*/

/*
deck.addEventListener('click', function(event){

  const el = event.target;
  //open and show class to card
  addOpenShow(el);
  let cardIdentity = el.firstElementChild.classList.item(1);
  //alert(cardIdentity);
  addCardToOpenList(cardIdentity);
  //alert(openCards);
  if(openCards.length > 1){

//TRY STORING THE TWO CARDS CLICKED IN VARIABLES

    //if cards match then lock them open and empty the array
    if(openCards[0] === openCards[1]){
      alert('it is a match!');
      openCards = [];
      //lock them open
    } else {
      alert("no match");

      //turn them over
      el.classList.remove('open', 'show');
      openCards = [];
    }

    //if cards do not match then turn them over, empty the array
  }


})
*/


deck.addEventListener('click', function(event){

  const el = event.target;
  //open and show class to card
  addOpenShow(el);
  let cardIdentity = el.firstElementChild.classList.item(1);
  //alert(cardIdentity);
  addCardToOpenList(cardIdentity);
  //alert(openCards);
  if(openCards.length > 1){

//TRY STORING THE TWO CARDS CLICKED IN VARIABLES

    //if cards match then lock them open and empty the array
    if(openCards[0] === openCards[1]){
      alert('it is a match!');
      openCards = [];
      //lock them open
    } else {
      alert("no match");

      //turn them over
      el.classList.remove('open', 'show');
      openCards = [];
    }

    //if cards do not match then turn them over, empty the array
  }


})
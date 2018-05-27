/*
 * Create a list that holds all of your cards
 */

 /*
YO ME THIS IS WHAT YOU STILL HAVE TO DO AS OF 5 30 ON SUNDAY
CREATE A Timer
CREATE A MODAL POPUP
CREATE A STAR RATING THING
 */
window.onload = function() {
  createCards();
  //startTimer();
};

let cardList = ['fa-diamond','fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube' ];

//variables
const deck = document.querySelector(".deck");


const startButton = document.getElementById('startButton');
let openCards = [];
let score = 0;
let moves = document.querySelector('.moves');
let ref_int;
const restartButton = document.querySelector('.restart');
let timerRunning = false;

function ifWin(){
if (score === 8){
  bringUpModal();
  stopTimer();

}
}
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


function createCards() {

  deck.innerHTML = '';
  shuffle(cardList);
  console.log(cardList);

  moves.innerText = 0;
  for(let i = 0; i < cardList.length; i++){

    let el = document.createElement("li");
    let innerEl = document.createElement("li");
    innerEl.classList.add('fa', cardList[i]);
    el.appendChild(innerEl);
    el.classList.add('card');
    deck.appendChild(el);
    //ref_int = setInterval(timer, 1000);
    console.log(cardList[i]);
  }
}

function noMatch(){
  console.log("running noMatch");
  console.log(openCards);
  for(let i = 0; i < openCards.length; i++){
 openCards[i].classList.remove('open', 'show');

}

  openCards = [];

}


//EVENTS
deck.addEventListener('click', function(event){
if(event.target.classList.contains('card')){


  //puts the event targget in a var
  const el = event.target;
  //puts the card clicked on in the open list array
  openCards.push(el);
  console.log(openCards);
  moves.innerText++;
  //flips the card over!
  el.classList.add('open', 'show');
}

//I THINK THIS IS WHERE THE BUG IS >>>>>
/*
if(openCards.length > 1){
  if(openCards[0].firstElementChild.classList.item(1) === openCards[1].firstElementChild.classList.item(1)){
*/
//NEED TO ADD SOMETHING SO THAT YOU CANT CLICK SAME CARD TWICE!
  if(openCards.length > 1){
    if(openCards[0].firstElementChild.classList.item(1) === openCards[1].firstElementChild.classList.item(1)){
      console.log("a match!");
      openCards[0].classList.add('match');
      openCards[1].classList.add('match');


        openCards = [];

      score += 1;
      console.log(score);
      if(score > 7){
        ifWin();
      }

    } else {
      setTimeout(noMatch, 1000);
      //openCards = [];
    }

}
});
  // how to get the symbol > console.log(openCards[0].firstElementChild.classList.item(1));


restartButton.addEventListener('click', createCards);

restartButton.addEventListener('click', function(){
  stopTimer();

});

//TIMER CODE
let secDisplay = document.querySelector('.seconds');
let minDisplay = document.querySelector('.minutes');
secDisplay.innerText = 00;
minDisplay.innerText = 00;

function timer(){
  console.log('gulp');
  if(secDisplay.innerText == 59){
    secDisplay.innerText = 00;
    minDisplay.innerText++;
  }

  secDisplay.innerText++;
}

function startTimer(){

   ref_int = setInterval(timer, 1000);

}

function stopTimer(){
  clearInterval(ref_int);
  timerRunning = false;
}

startButton.addEventListener('click', function(){
  startTimer();
});

restartButton.addEventListener('click', function(){

  clearInterval(ref_int);
  secDisplay.innerText = 00;
  minDisplay.innerText = 00;
});

//MODAL Code

const modal = document.getElementById('myModal');
const modalButton = document.getElementById('modalTest');
const giantX = document.querySelector('.giantX');
const yesButton = document.getElementById('yes-button');
const totalMoves = document.getElementById('total-moves');
const totalStars = document.getElementById('total-stars');
const totalMinutes = document.getElementById('total-minutes');
const totalSeconds = document.getElementById('total-seconds');



modalButton.addEventListener('click', function(){
//  modal.classList.add('modal-visible');
bringUpModal();
});

giantX.addEventListener('click', function(){
  modal.classList.remove('modal-visible');
});

/*
window.addEventListener('click', function(){
    modal.classList.remove('modal-visible');
});
*/
function bringUpModal(){
    totalMoves.innerText = moves.innerText;
    totalMinutes.innerText = minDisplay.innerText;
    totalSeconds.innerText = secDisplay.innerText;
    modal.classList.add('modal-visible');

}

yesButton.addEventListener('click', function(){
  modal.classList.remove('modal-visible');
  createCards();
  clearInterval(ref_int);
  secDisplay.innerText = 00;
  minDisplay.innerText = 00;

});

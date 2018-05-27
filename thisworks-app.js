
window.onload = function() {
  setupGame();

};

let cardList = ['fa-diamond','fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube' ];

//variables
const deck = document.querySelector(".deck");


const starsUl = document.querySelector('.stars');
let openCards = [];
let score = 0;
let starRating = 3;
let moves = document.querySelector('.moves');
let numberofMoves = 0;
let ref_int;
const restartButton = document.querySelector('.restart');
let timerRunning = false;

function resetScoreBoard(){
  moves.innerText = 0;
  numberofMoves = 0;
  starRating = 3;
  score = 0;
  modalStars.innerHTML = " ";
  starsUl.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>"
}

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


function setupGame() {

  deck.innerHTML = '';

  console.log(cardList);

  resetScoreBoard();

  //suffles and creates deck of cards
  shuffle(cardList);
  for(let i = 0; i < cardList.length; i++){

    let el = document.createElement("li");
    let innerEl = document.createElement("li");
    innerEl.classList.add('fa', cardList[i]);
    el.appendChild(innerEl);
    el.classList.add('card');
    deck.appendChild(el);
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

//checks to see if timer is running and starts timer if not
if(timerRunning === false){
  startTimer();
}

if(event.target.classList.contains('card') && !event.target.classList.contains('open') ){


  //puts the event targget in a var
  const el = event.target;
  //puts the card clicked on in the open list array

  openCards.push(el);
  console.log(openCards);
  moves.innerText++;
  numberofMoves = numberofMoves + 1;

  //Star code
  stars();

  //flips the card over!
  el.classList.add('open', 'show');
}


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

    }

}
});


restartButton.addEventListener('click', setupGame);

restartButton.addEventListener('click', function(){
  stopTimer();

});

//TIMER CODE
let secDisplay = document.querySelector('.seconds');
let minDisplay = document.querySelector('.minutes');
secDisplay.innerText = 00;
minDisplay.innerText = 00;

function timer(){

  if(secDisplay.innerText == 59){
    secDisplay.innerText = 00;
    minDisplay.innerText++;
  }

  secDisplay.innerText++;
}

function startTimer(){

  timerRunning = true;
  console.log(timerRunning);
   ref_int = setInterval(timer, 1000);

}

function stopTimer(){
timerRunning = false;
  clearInterval(ref_int);

}

restartButton.addEventListener('click', function(){

  clearInterval(ref_int);
  secDisplay.innerText = 00;
  minDisplay.innerText = 00;
});

//star Code

function stars(){
  if(numberofMoves === 25){
    //remove a star
    starsUl.removeChild(starsUl.firstChild);

    starRating = starRating - 1;
    console.log(starRating);


  } else if (numberofMoves === 35) {
    //removes a star
  starsUl.removeChild(starsUl.firstChild);
    starRating = starRating - 1;
    console.log(starRating);
  }
}

//MODAL Code

const modal = document.getElementById('myModal');
const modalButton = document.getElementById('modalTest');
const giantX = document.querySelector('.giantX');
const yesButton = document.getElementById('yes-button');
const totalMoves = document.getElementById('total-moves');
const totalStars = document.getElementById('total-stars');
const totalMinutes = document.getElementById('total-minutes');
const totalSeconds = document.getElementById('total-seconds');

const modalStars = document.querySelector('.modal-stars');


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
    /*
    let oneStar = document.createElement("li");
    oneStar.innerHTML = "<i class='fa fa-star'></i>";
    for(var i = 0; i < starRating; i++){


      modalStars.appendChild(oneStar);

    }
*/

  if(starRating === 1){
    modalStars.innerHTML = "<li><i class='fa fa-star'></i><li>";
  } else if (starRating === 2) {
    modalStars.innerHTML = "<li><i class='fa fa-star'></i><li><li><i class='fa fa-star'></i><li>";
  } else {
      modalStars.innerHTML = "<li><i class='fa fa-star'></i><li><li><i class='fa fa-star'></i><li><li><i class='fa fa-star'></i><li>";
  }

    modal.classList.add('modal-visible');

}

yesButton.addEventListener('click', function(){
  modal.classList.remove('modal-visible');
  setupGame();
  clearInterval(ref_int);
  secDisplay.innerText = 00;
  minDisplay.innerText = 00;

});

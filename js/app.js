/*
  Udacity Memory Game by Devin Tyler Ross
  May of 2018
  FEND P2 (second project of Udacity's Frontend Nanodegree) #growwithgoogle
  This is an interactive memory game (also called concentration) based on HTML and CSS code provided by Udacity.

*/

/*
************************************************
CORE GAME LOGIC
************************************************
*/


/*
*************************
Variables
*************************
*/

//Array of cards
let cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
    'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'
];


const deck = document.querySelector(".deck");
const starsUl = document.querySelector('.stars');
let openCards = [];
let score = 0;
let starRating = 3;
const moves = document.querySelector('.moves');
let numberofMoves = 0;
let ref_int;
const restartButton = document.querySelector('.restart');
let timerRunning = false;


/*
*************************
Functions
*************************
*/

function resetScoreBoard() {
    moves.innerText = 0;
    numberofMoves = 0;
    starRating = 3;
    score = 0;
    modalStars.innerHTML = " ";
    starsUl.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>"
}

//Checks if score is enough to win, if so then it will bring up the modal and stop the timer
function ifWin() {
        if (score === 8) {
            bringUpModal();
            stopTimer();

        }
    }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Sets up an initial or new game
function setupGame() {
    deck.innerHTML = '';
    console.log(cardList);
    resetScoreBoard();
    //Shuffles and creates deck of cards
    shuffle(cardList);
    for (let i = 0; i < cardList.length; i++) {
        let el = document.createElement("li");
        let innerEl = document.createElement("li");
        innerEl.classList.add('fa', cardList[i]);
        el.appendChild(innerEl);
        el.classList.add('card');
        deck.appendChild(el);
        console.log(cardList[i]);
    }
}

//Checks to see if cards with flipped over cards match
function noMatch() {
    console.log("running noMatch");
    console.log(openCards);
    moves.innerText++;
    numberofMoves = numberofMoves + 1;
    console.log("the number of moves is " + numberofMoves);
    for (let i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove('open', 'show');
    }
    openCards = [];
}

//removes stars from scoreboards if number of moves is too high
function stars() {
    if (numberofMoves === 16 && openCards.length > 1) {
        //remove a star
        starsUl.removeChild(starsUl.firstChild);
        starRating = starRating - 1;
        console.log(starRating);
    } else if (numberofMoves === 20 && openCards.length > 1) {
        //removes a star
        starsUl.removeChild(starsUl.firstChild);
        starRating = starRating - 1;
        console.log(starRating);
    }
}

//Reveals cards by making the symbol visible and adds the event.target to a an array of open cards
//Also uses Stars function to check if starRating needs to be decreased
function flipCard(){
      if (event.target.classList.contains('card') && !event.target.classList.contains('open')) {
          //puts the event target in a variable
          const el = event.target;
          //puts the card clicked on in the open list array
          openCards.push(el);
          //logs array of open cards
          console.log(openCards);
          //flips the card over!
          el.classList.add('open', 'show');
          //checks if stars need to be decreased
          stars();
      }
}

//Checks if the 2 cards in openCards array match and, if they do applies the match class
//Also increases score for matches and runs noMatch function if the cards do not match
function cardMatch(){
  if (openCards.length > 1) {
      //checks if cards match by comparing the second class of each cards first child fa-bomb, fa-cube ect.
      if (openCards[0].firstElementChild.classList.item(1) === openCards[1].firstElementChild.classList.item(1)) {
          console.log("a match!");
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');
          moves.innerText++;
          numberofMoves = numberofMoves + 1;
          openCards = [];
          score += 1;
          console.log(score);
          if (score > 7) {
              ifWin();
          }
      } else {
          setTimeout(noMatch, 1000);
      }
  }
}

/*
*************************
Events
*************************
*/

//sets up the game when the page loads
window.onload = function() {
    setupGame();

};

deck.addEventListener('click', function(event) {

    //checks to see if timer is running and starts timer if not
    if (timerRunning === false) {
        startTimer();
    }
    flipCard();
    cardMatch();
});

//allows restart button to call setupGame function and stopTimer function
restartButton.addEventListener('click', setupGame);

restartButton.addEventListener('click', function() {
    stopTimer();

});

/*
************************************************
CODE TO RUN GAME TIMER
************************************************
*/

/*
*************************
Events
*************************
*/

let secDisplay = document.querySelector('.seconds');
let minDisplay = document.querySelector('.minutes');
secDisplay.innerText = 00;
minDisplay.innerText = 00;

/*
*************************
Functions
*************************
*/

//Basic timer function
function timer() {
    if (secDisplay.innerText == 59) {
        secDisplay.innerText = 00;
        minDisplay.innerText++;
    }
    secDisplay.innerText++;
}

//Starts timer
function startTimer() {
    timerRunning = true;
    ref_int = setInterval(timer, 1000);
}
//Stops timer
function stopTimer() {
    timerRunning = false;
    clearInterval(ref_int);
}

/*
*************************
Events
*************************
*/
restartButton.addEventListener('click', function() {
    clearInterval(ref_int);
    secDisplay.innerText = 00;
    minDisplay.innerText = 00;
});

/*
************************************************
CODE FOR THE MODAL POPUP
************************************************
*/


/*
*************************
Variables
*************************
*/
const modal = document.getElementById('myModal');
const modalButton = document.getElementById('modalTest');
const giantX = document.querySelector('.giantX');
const yesButton = document.getElementById('yes-button');
const totalMoves = document.getElementById('total-moves');
const totalStars = document.getElementById('total-stars');
const totalMinutes = document.getElementById('total-minutes');
const totalSeconds = document.getElementById('total-seconds');
const modalStars = document.querySelector('.modal-stars');

/*
*************************
Functions
*************************
*/

//Makes modal visible and pulls and displays the scoreboard ratings
function bringUpModal() {
    totalMoves.innerText = moves.innerText;
    totalMinutes.innerText = minDisplay.innerText;
    totalSeconds.innerText = secDisplay.innerText;

//checks for star rating and changes innerHTML of the modalStars accordingly
//TODO: write a function that will append stars
    if (starRating === 1) {
        modalStars.innerHTML = "<li><i class='fa fa-star'></i><li>";
    } else if (starRating === 2) {
        modalStars.innerHTML = "<li><i class='fa fa-star'></i><li><li><i class='fa fa-star'></i><li>";
    } else {
        modalStars.innerHTML = "<li><i class='fa fa-star'></i><li><li><i class='fa fa-star'></i><li><li><i class='fa fa-star'></i><li>";
    }
    modal.classList.add('modal-visible');
}

/*
*************************
Events
*************************
*/

giantX.addEventListener('click', function() {
    modal.classList.remove('modal-visible');
});

yesButton.addEventListener('click', function() {
    modal.classList.remove('modal-visible');
    setupGame();
    clearInterval(ref_int);
    secDisplay.innerText = 00;
    minDisplay.innerText = 00;

});

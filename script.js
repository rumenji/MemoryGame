const gameContainer = document.getElementById("game");

const scoreBox = document.querySelector('#bestScore');
const currentScore = document.querySelector('#currentScore');
const gameDiv = document.getElementById('game');
let clicks = 0;
let matchedCards = 0;
let lastFlipped = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

localStorage.setItem('score', JSON.stringify(0))
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  clicks++;
  currentScore.innerText = `Current Score: ${clicks}`;
  openedCards = 0;
  lastColor = "";
  lastCard = ""; 
  for (let card of gameDiv.children) {
    if (card.style.backgroundColor !== "" && card.className !== `${card.style.backgroundColor} matched`){
      openedCards++;
      lastColor = card.style.backgroundColor;
      lastCard = card;
    }
  }
  if (openedCards<2){
    event.target.style.backgroundColor = event.target.className;
    
      if(event.target.className !== lastColor){
        timer = setTimeout(function(){
        event.target.style.backgroundColor = null;
        lastFlipped.style.backgroundColor = null;
        lastColor = event.target.className;
        }, 1000)
      }
      else if (event.target !== lastFlipped){
        event.target.className = `${event.target.className} matched`;
        clearTimeout(timer)
        event.target.removeEventListener("click", handleCardClick);
        lastCard.className = `${lastCard.className} matched`;
        lastCard.removeEventListener("click", handleCardClick);
        matchedCards +=2;
      }
  }
  console.log(matchedCards)
  console.log(COLORS.length)
  if (matchedCards === COLORS.length){
    score = JSON.parse(localStorage.getItem('score'));
    if (score === 0 || score > clicks){
        scoreBox.innerText = `Best Score: ${clicks}`;
        localStorage.setItem('score', JSON.stringify(clicks))
      }
    alert("Good job!");

  }
  lastFlipped = event.target;
  }
  

function bestScore(){
  score = JSON.parse(localStorage.getItem('score'));
  if (score === null){
    scoreBox.innerText = "Best Score: 0";
  }
  else {
    scoreBox.innerText = `Best Score: ${score}`;
  }
}
//restart game
restartGame = document.querySelector('#restartGame');
restartGame.addEventListener('click', function(){
  oldCards = document.querySelector('#game');
  oldCards.innerHTML = '';
  clicks = 0;
  matchedCards = 0;
  currentScore.innerText = `Current Score: ${clicks}`;
  createDivsForColors(shuffledColors);
})
//start game by enabling clicks on game div
startGame = document.querySelector('#startGame');
startGame.addEventListener('click', function(){
  document.getElementById("game").style.pointerEvents = "auto";
});
// when the DOM loads
createDivsForColors(shuffledColors);
bestScore();
let deckID = "";
let player1Score = 0;
let player2Score = 0;
let round = 1;

const dealCardButton = document.querySelector("#deal-card");
const resetButton = document.querySelector("#reset");

const displayRoundResult = document.querySelector("h3");
const displayFinalScore = document.querySelector("h1");
const displayScore = document.querySelector("#score");
const displayRemainingCards = document.querySelector("#remaining-cards");

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    deckID = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

dealCardButton.addEventListener("click", drawTwo);
resetButton.addEventListener("click", resetGame);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // Display the card
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;

      // Get the value of each card and pass throw a function to convert to a number
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);

      // Check who is the winner and increment the score
      if (player1Val > player2Val) {
        displayRoundResult.innerText = "Player 1 Wins";
        displayScore.innerText = `P1: ${(player1Score += 1)} | P2: ${player2Score}`;
      } else if (player1Val < player2Val) {
        displayRoundResult.innerText = "Player 2 Wins";
        displayScore.innerText = `P1: ${player1Score} | P2: ${(player2Score += 1)}`;
      } else {
        displayRoundResult.innerText = "Draw";
      }

      // Display Remaining Cards
      displayRemainingCards.innerText = `Cards Remainig: ${data.remaining}`;

      // Reload the page if no remaining cards to draw
      if (data.remaining === 0) {
        displayFinalScore.innerText =
          "Not enough cards remaining to draw, page wil be reloaded";
        setTimeout(function () {
          location.reload();
        }, 5000);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  round = 1;
  displayFinalScore.innerText = "War Game";
  displayRoundResult.innerText = "";
  displayScore.innerText = "";
  displayRound.innerText = "";
  dealCardButton.classList.toggle("hidden");
}

// local store the deck id to use the same deck always

// if war, draw another card and the winner double the points
// *** probably assign the two values from each player cards in an array and sum them, next multiply the score by 2

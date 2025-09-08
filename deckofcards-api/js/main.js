let deckID = "";
let player1Score = 0;
let player2Score = 0;
let round = 1;

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    deckID = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const displayScore = document.querySelector("#score");

      const displayRound = document.querySelector("#round");

      // Display the card
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;

      // Get the value of each card and pass throw a function to convert to a number
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);

      // Check who is the winner and increment the score
      if (player1Val > player2Val) {
        document.querySelector("h3").innerText = "Player 1 Wins";
        displayScore.innerText = `P1: ${(player1Score += 1)} | P2: ${player2Score}`;
      } else if (player1Val < player2Val) {
        document.querySelector("h3").innerText = "Player 2 Wins";
        displayScore.innerText = `P1: ${player1Score} | P2: ${(player2Score += 1)}`;
      } else {
        document.querySelector("h3").innerText = "Time for War!";
      }

      // Display Round
      displayRound.innerText = `Round: ${round++}`;

      // if 'round' is greater than 9, remove the button and shows the Winner
      if (round > 9) {
        document.querySelector("button").style.display = "none";
        if (player1Score > player2Score) {
          document.querySelector(
            "h1"
          ).innerText = `Player 1 Wins the game | Final Score: P1: ${player1Score} | P2: ${player2Score}`;
        } else if (player1Score < player2Score) {
          document.querySelector(
            "h1"
          ).innerText = `Player 2 Wins the game | Final Score: P1: ${player1Score} | P2: ${player2Score}`;
        }
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

// if war, draw another card and the winner double the points
// reset when game is over
// local store the deck id to use the same deck always

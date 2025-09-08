let deckID = "";
let player1Score = 0;
let player2Score = 0;

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

      // Display the score
      const displayScore = document.querySelector("#score");

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

// 9 rounds
// show score
// if war, draw another card and the winner double the points
// reset when game is over
// local store the deck id to use the same deck always

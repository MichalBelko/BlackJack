"use strict";

document.querySelector("#score--0").textContent = 0;
document.querySelector("#score--1").textContent = 0;

const score0 = document.querySelector("#score--0").textContent;
const score1 = document.querySelector("#score--1").textContent;
const diceEl = document.querySelector(".dice");
const RollBtn = document.querySelector(".btn--roll");
const NewBtn = document.querySelector(".btn--new");
const HoldBtn = document.querySelector(".btn--hold");
const Player1 = document.querySelector(".player--1");
const Player0 = document.querySelector(".player--0");

let currentScore;
let activePlayer;
let scores;
let playing;

function reset() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;

  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  Player0.classList.remove("player--winner");
  Player1.classList.remove("player--winner");
  Player0.classList.add("player--active");
  Player1.classList.remove("player--active");
  diceEl.classList.add("hidden");
}
reset();

diceEl.classList.add("hidden");

function switchPlayer() {
  document.getElementById("current--" + activePlayer).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  Player0.classList.toggle("player--active");
  Player1.classList.toggle("player--active");
}

RollBtn.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove("hidden");
    diceEl.src = "dice-" + dice + ".png";

    if (dice) {
      currentScore += dice;
      document.getElementById(
        "current--" + activePlayer
      ).textContent = currentScore;
      if (currentScore >= 21) {
        switchPlayer();
      }
    }
  }
});

HoldBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById("score--" + activePlayer).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(".player--" + activePlayer)
        .classList.add("player--winner");
      document
        .querySelector(".player--" + activePlayer)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

NewBtn.addEventListener("click", reset);

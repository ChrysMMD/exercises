"use strict"

let loNum = 0;
let hiNum = 100;

let computerGuess;

//Javascript text til H!
let computerGuessText = document.querySelector("h1")

//knapper
document.querySelector("#tooLo").addEventListener("click", tooLo);
document.querySelector("#tooHi").addEventListener("click", tooHi);
document.querySelector("#correct").addEventListener("click", correct);

computerGuesses()
function computerGuesses() {
  computerGuess = Math.round(loNum + (hiNum - loNum) / 2);
  computerGuessText.textContent = computerGuess;
}

function tooLo() {
  console.log(tooLo)
  loNum = computerGuess
  computerGuesses()
}

function tooHi() {
  console.log(tooHi)
  hiNum = computerGuess
  computerGuesses()
}
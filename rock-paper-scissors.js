// Using global variables to track the game which probably is not best practice!
let roundsPlayed = 0;
let playerScore = 0;
let computerScore = 0;
const maxRounds = 5;

function getComputerChoice() {
  const gameChoices = ["Rock", "Paper", "Scissors"];
  return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

function getPlayerWin(playerSelection, computerSelection) {
  let isPlayerWin = false;
  const playerSelectionNormalised = playerSelection.toUpperCase();
  const computerSelectionNormalised = computerSelection.toUpperCase();

  playerVictoryConditions = {
    ROCK: "SCISSORS",
    PAPER: "ROCK",
    SCISSORS: "PAPER",
  };

  if (
    playerVictoryConditions[playerSelectionNormalised] ===
    computerSelectionNormalised
  ) {
    isPlayerWin = true;
  }

  return isPlayerWin;
}

function getRoundMessage(
  isPlayerWin,
  playerSelection,
  computerSelection,
  isDraw = false
) {
  if (isPlayerWin) {
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  } else if (isDraw) {
    return `It is a draw! You both played ${playerSelection}!`;
  }
  return `You lose! ${computerSelection} beats ${playerSelection}.`;
}

function playRound(playerChoice) {
  let isDraw = false;
  let isPlayerWin = false;
  const computerChoice = getComputerChoice();

  // Handle draw
  if (playerChoice.toUpperCase() === computerChoice.toUpperCase()) {
    isDraw = true;
  } else {
    isPlayerWin = getPlayerWin(playerChoice, computerChoice);
  }

  roundMessage = getRoundMessage(
    isPlayerWin,
    playerChoice,
    computerChoice,
    isDraw
  );

  updateGame({
    isPlayerWin: isPlayerWin,
    isDraw: isDraw,
    roundMessage: roundMessage,
  });
}

function updateGame(roundResult) {
  // Allow the game to rollback over if user makes another choice beyond round 5
  if (roundsPlayed === maxRounds) {
    roundsPlayed = 0;
    playerScore = 0;
    computerScore = 0;
  }
  addResultToPage(roundResult.roundMessage);
  // Must handle draws
  roundsPlayed++;
  if (roundResult["isPlayerWin"]) {
    playerScore++;
  } else if (!roundResult["isPlayerWin"] && !roundResult["isDraw"]) {
    computerScore++;
  }
  updateScoresAndRounds();

  if (roundsPlayed === maxRounds) {
    addResultToPage(getWinner());
  }
}

function getWinner() {
  let message;
  if (playerScore > computerScore) {
    message = `You are the winner! 🎉`;
  } else if (playerScore === computerScore) {
    message = `It is a draw. No one wins! 🤨`;
  } else {
    message = `The computer is the winner! 😢`;
  }
  return message;
}

// React to events and make changes to the DOM
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.id));
});

function addResultToPage(result) {
  document.querySelector(".result").textContent = result;
}

function updateScoresAndRounds() {
  document.querySelector(
    ".score-title"
  ).textContent = `Scores after ${roundsPlayed} rounds`;
  document.querySelector(".player").textContent = playerScore;
  document.querySelector(".computer").textContent = computerScore;
}

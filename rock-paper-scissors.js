function computerPlay() {
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
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else if (isDraw) {
    return `It is a draw! ${playerSelection} and ${computerSelection} are equal`;
  }
  return `You lose! ${computerSelection} beats ${playerSelection}`;
}

function playRound(playerSelection, computerSelection) {
  let isDraw = false;
  let isPlayerWin = false;

  // Handle draw
  if (playerSelection.toUpperCase() === computerSelection.toUpperCase()) {
    isDraw = true;
  } else {
    isPlayerWin = getPlayerWin(playerSelection, computerSelection);
  }

  console.log(
    getRoundMessage(isPlayerWin, playerSelection, computerSelection, isDraw)
  );

  return { isPlayerWin: isPlayerWin, isDraw: isDraw };
}

function game() {
  const maxRounds = 5;
  let tries = 0;
  let playerWinCount = 0;
  let computerWinCount = 0;
  let keepGoing = true;

  while (keepGoing) {
    tries++;
    // Prompt user and get computer's random choice
    roundResult = playRound(
      prompt("Choose Rock, Paper or Scissors: "),
      computerPlay()
    );

    // For each round return who the winner is and increment the relevant win counter
    // Must handle draws
    if (roundResult["isPlayerWin"]) {
      playerWinCount++;
    } else if (!roundResult["isPlayerWin"] && !roundResult["isDraw"]) {
      computerWinCount++;
    }
    // Stop at 5 games
    if (tries >= maxRounds) {
      keepGoing = false;
    }
  }

  // Calculate the overall winner and return message
  returnWinner(playerWinCount, computerWinCount);
}

function returnWinner(playerWinCount, computerWinCount) {
  if (playerWinCount > computerWinCount) {
    console.log(
      `You are the winner! Player: ${playerWinCount} Computer: ${computerWinCount}`
    );
  } else if (playerWinCount === computerWinCount) {
    console.log(
      `It is a draw. No one wins! Computer: ${computerWinCount} Player: ${playerWinCount}`
    );
  } else {
    console.log(
      `The computer is the winner! Computer: ${computerWinCount} Player: ${playerWinCount}`
    );
  }
}

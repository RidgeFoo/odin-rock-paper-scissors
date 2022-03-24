function computerPlay() {
  const gameChoices = ["Rock", "Paper", "Scissors"];
  return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

// This function should be broken up
function playRound(playerSelection, computerSelection) {
  let playerVictory = false;
  playerSelectionNormalised = playerSelection.toUpperCase();
  computerSelectionNormalised = computerSelection.toUpperCase();

  playerVictoryConditions = {
    ROCK: "SCISSORS",
    PAPER: "ROCK",
    SCISSORS: "PAPER",
  };

  if (playerSelectionNormalised == computerSelectionNormalised) {
    return `It is a draw! ${playerSelection} and ${computerSelection} are equal`;
  }

  if (
    playerVictoryConditions[playerSelectionNormalised] ===
    computerSelectionNormalised
  ) {
    playerVictory = true;
  }

  if (playerVictory) {
    return `You win! ${playerSelection} beats ${computerSelection}`;
  }

  return `You lose! ${computerSelection} beats ${playerSelection}`;
}

function game() {
  const maxRounds = 5;
  let tries = 0;
  let playerWins = 0;
  let computerWins = 0;

  while (true) {
    tries++;
    // Prompt user and get computer's random choice
    result = playRound(
      prompt("Choose Rock, Paper or Scissors: "),
      computerPlay()
    );

    // For each round return who the winner is and increment the relevant win counter
    // This is a rubbish way of doing this but it works
    console.log(result);

    if (result.startsWith("You win!")) {
      playerWins++;
    } else if (result.startsWith("You lose!")) {
      computerWins++;
    }
    // Stop at 5 games
    if (tries >= maxRounds) {
      break;
    }
  }

  // Calculate the overall winner and return message
  if (playerWins > computerWins) {
    console.log(
      `You are the winner! Player: ${playerWins} Computer: ${computerWins}`
    );
  } else if (playerWins === computerWins) {
    console.log(
      `It is a draw. No one wins! Computer: ${computerWins} Player: ${playerWins}`
    );
  } else {
    console.log(
      `The computer is the winner! Computer: ${computerWins} Player: ${playerWins}`
    );
  }
}

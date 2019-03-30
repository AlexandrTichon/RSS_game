function readScore() {
  const scoreBoard = JSON.parse(localStorage.getItem('gameScore'));
  const scoreBoardBlock = document.querySelector('.scoreBoard');
  for (let index = 0; index < scoreBoard.players.length; index += 1) {
    const userScore = document.createElement('div');
    userScore.className = 'userScore';
    scoreBoardBlock.appendChild(userScore);

    userScore.innerHTML = `<span>${scoreBoard.players[index].username}       ${scoreBoard.players[index].score}</span>`;
  }
}

function writeScore(userScore) {
  // 'gameScore' is a key

  if (localStorage.getItem('gameScore') === null) {
    const score = {};
    score.players = [];
    score.players.push({
      username: document.querySelector('.playerName').textContent,
      score: userScore,
    });
    localStorage.setItem('gameScore', JSON.stringify(score));
  } else {
    const score = JSON.parse(localStorage.getItem('gameScore'));
    localStorage.clear();
    score.players.push({
      username: document.querySelector('.playerName').textContent,
      score: userScore,
    });
    localStorage.setItem('gameScore', JSON.stringify(score));
  }
}

export { writeScore, readScore };

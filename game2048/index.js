const boardDesk = document.getElementById('board');
const title = document.getElementById('title');
const leaders = document.getElementById('leaders');
const newGame = document.querySelector('.new-game');
const leaderboards = document.querySelector('.leaderboards');


const rows = 4, columns = 4;
let matrixBoard, isClicked, score = 0;

if (!localStorage.getItem("leaderBoard")) {
  const leaderBoard = new Array(10).fill({name: "", score: 0});
  const count = 0;
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  localStorage.setItem("count", JSON.stringify(count));
}

window.onload = () => setGame();

newGame.addEventListener('click', setGame);
leaderboards.addEventListener('click', setResults);

function setGame() {
  score = 0;
  document.getElementById('score').innerText = 0;
  results.style.display = 'none';
  boardDesk.innerHTML = '';
  boardDesk.style.opacity = "1";
  boardDesk.style.display = "";
  matrixBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  createBoard();
  addNumtoTile(2);
  addNumtoTile(Math.random() > 0.5 ? 4 : 2);
  document.addEventListener("keyup", moveDirection);
}

function setResults() {
  if (!isClicked) {
    isClicked = true;
    document.removeEventListener("keyup", moveDirection);
    boardDesk.style.display = "none";
    results.style.display = "";
    const values = JSON.parse(localStorage.getItem("leaderBoard"));
    let text = '';
    let count = 1;

    for (const key of values) {
      if (!key.score) continue;
      text += `<div>${count++}. ${key.name} &nbsp;&nbsp;=&nbsp;&nbsp; ${key.score} points</div>`;
    }

    leaders.innerHTML = text;

    } else {
      isClicked = false;
      document.addEventListener("keyup", moveDirection);
      boardDesk.style.display = "";
      results.style.display = "none";
      leaders.innerHTML = "";
    }
}


function createBoard() {
  for (let r = 0; r < rows; r+= 1) {
    for (let c = 0; c < columns; c += 1) {
      const tile = document.createElement('div');
      tile.id = `pos-${r}-${c}`;
      tile.classList.add('tile');
      boardDesk.appendChild(tile);
    }
  }
}


function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (matrixBoard[r][c] === 0) {
        return true;
      }
    }
  }
  return false;
}


function addNumtoTile(num) {
  if (hasEmptyTile()) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    
    if (matrixBoard[row][col] === 0) { 
      addNumber(row, col, num);
      return;
    } 
    else {
      addNumtoTile(num);
    }
  } else {
    isGameOver();
  }
}


function addNumber(row, col, num) {
  matrixBoard[row][col] = num;
  const currTile = document.querySelector(`#pos-${row}-${col}`);
  currTile.innerHTML = num || '';
  currTile.classList.value = "";
  currTile.classList.add(`tile`, `x${num}`);
}


function isGameOver() {
  if(!isCanMove()) {
    document.removeEventListener("keyup", moveDirection);
    title.innerText = "Game Over";
    boardDesk.style.opacity = "0.3";
    updateLeaderBoard(score);
  }
}

function isCanMove() {
  for (let i = 0; i < rows - 1; i++) {

    for (let y = 0; y < rows - 1; y++) {
      if (matrixBoard[i][y] === matrixBoard[i][y + 1] 
        || matrixBoard[y][i] === matrixBoard[y + 1][i]) {
        return true;
      }
    }
  }
  return false;
}

function updateLeaderBoard(score) {
  let player = prompt('Enter your name');

  if (!player) {
    let count = +JSON.parse(localStorage.getItem("count"));
    player = `player${++count}`;
    localStorage.setItem("count", JSON.stringify(count));
  } 

  const values = JSON.parse(localStorage.getItem("leaderBoard"));
  values.push({name: player, score: score});
  values.sort(sortScores);
  
  const results = values.slice(0, 10); 
  localStorage.setItem("leaderBoard", JSON.stringify(results));
}

function sortScores(a, b) {
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  } else {
    return 0;
  }
}

function moveDirection(event) {
  const direction = event.code;
  if (direction === "ArrowLeft" 
  ||  direction === "ArrowRight") {
      gorizontalMove(direction);
  } else {
      verticalMove(direction);
  }
  document.getElementById('score').innerText = score;
  isGameWin();
  addNumtoTile(Math.random() > 0.5 ? 4 : 2);
}

function isGameWin() {
  if(has2048()) {
    document.removeEventListener("keyup", moveDirection);
    title.innerText = "Congratulation! You WIN!!!";
    boardDesk.style.opacity = "0.3";
    updateLeaderBoard(score);
  }
}

function has2048() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (matrixBoard[r][c] === 2048) {
        return true;
      }
    }
  }
  return false;
}

function gorizontalMove(arrow) {
  for (let r = 0; r < rows; r += 1) {
    const tempRow = [];

    for (let c = 0; c < columns; c += 1) {
      tempRow.push(matrixBoard[r][c]);
    }

    const zero = arrow === "ArrowRight";
    const mergeRow = mergeValues(tempRow, zero);
  
    for (let c = 0; c < columns; c += 1) {
      matrixBoard[r][c] = mergeRow[c];
      addNumber(r, c, mergeRow[c]);
    }
  }
}


function verticalMove(arrow) {
  for (let r = 0; r < rows; r += 1) {
    const tempRow = [];

    for (let c = 0; c < columns; c += 1) {
      tempRow.push(matrixBoard[c][r]);
    }

    const zero = arrow === "ArrowDown";
    const mergeRow = mergeValues(tempRow, zero);
  
    for (let c = 0; c < columns; c += 1) {
      matrixBoard[c][r] = mergeRow[c];
      addNumber(c, r, mergeRow[c]);
    }
  }
}


function mergeValues(row, zeroFirst) {
  row = row.filter(value => value);
  
  if (zeroFirst) {
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i + 1] *= 2;
        row[i] = 0;
        score += row[i + 1];
        i++;
      }
    }
    row = row.filter(value => value);
    while (row.length < 4) {
      row.unshift(0);
    }
  }
  else {
    for (let i = row.length - 1; i > 0; i--) {
      if (row[i] === row[i - 1]) {
        row[i - 1] *= 2;
        row[i] = 0;
        score += row[i - 1];
        i--;
      }
    }
    row = row.filter(value => value);
    while (row.length < 4) {
      row.push(0);
    }
  }
  return row;
}

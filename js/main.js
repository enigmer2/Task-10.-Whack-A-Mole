const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const rbtn = document.querySelector(".removeBtn");
const btn = document.querySelector(".startBtn");
let gameStop = 25000;
let highScoreBoard = document.querySelector(".high-score");
let levelBoard = document.querySelector(".speed");
let lv;
let lastHole,
  timeUp = false,
  score = 0,
  prevScore = 0,
  timeLv = {
    lv1: [1500, 2000],
    lv2: [800, 1200],
    lv3: [500, 800],
    lv4: [300, 500],
    lv5: [200, 300],
  },
  scoreLv = {
    lv1: 1,
    lv2: 5,
    lv3: 10,
    lv4: 15,
    lv5: 18,
  };

function randomTime(quickTime) {
  quickTime =
    score >= scoreLv.lv5
      ? timeLv.lv5
      : score >= scoreLv.lv4
      ? timeLv.lv4
      : score >= scoreLv.lv3
      ? timeLv.lv3
      : score >= scoreLv.lv2
      ? timeLv.lv2
      : timeLv.lv1;
  return Math.round(
    Math.random() * (quickTime[1] - quickTime[0]) + quickTime[0]
  );
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length),
    hole = holes[idx];
  if (lastHole === hole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(),
    hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (score > prevScore) {
      localStorage.setItem("score", score);
      prevScore = score;
      loadScore();
    }
    if (!timeUp) peep();
  }, time);
}
function startGame() {
  scoreBoard.textContent = 'Score: 0';
  timeUp = false;
  score = 0;
  prevScore = localStorage.getItem("score");
  peep();
  setTimeout(() => {
    timeUp = true;
    levelBoard.style.opacity = "0";
  }, gameStop);
}

function scoreUp(e) {
  if (!e.isTrusted) return;
  score++;
  if (score === scoreLv.lv5) {
    levelBoard.textContent = "Speed up to: 5x";
    levelBoard.style.opacity = "1";
  } else if (score === scoreLv.lv4) {
    levelBoard.textContent = "Speed up to: 4x";
    levelBoard.style.opacity = "1";
  } else if (score === scoreLv.lv3) {
    levelBoard.textContent = "Speed up to: 3x";
    levelBoard.style.opacity = "1";
  } else if (score === scoreLv.lv2) {
    levelBoard.textContent = "Speed up to: 2x";
    levelBoard.style.opacity = "1";
  } else {
    levelBoard.style.opacity = "0";
  }
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = `Score: ${score}`;
}
function removeScore() {
  timeUp = true;
  localStorage.setItem("score", 0);
  updateScore();
}
function updateScore(score = 0) {
  highScoreBoard.textContent = `High score: ${score}`;
}
function loadScore() {
  const localScore = localStorage.getItem("score")
    ? localStorage.getItem("score")
    : 0;
  updateScore(localScore);
}
btn.addEventListener("click", startGame);
rbtn.addEventListener("click", removeScore);
moles.forEach((mole) => mole.addEventListener("click", scoreUp));
loadScore();

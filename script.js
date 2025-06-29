const bottom = document.querySelector(".bottom");
let countdownId;
let hitVal = 0;
let scoreVal = 0;
let time = 60;
const hit = document.querySelector("#hit-count");
const timer = document.querySelector("#timer-count");
const score = document.querySelector("#score-count");
let firstVal = new Number();
let secondVal = new Number();
let firstValIndex = new Number();
let secondValIndex = new Number();
let newTurn = true;
const remove = ["bg-emerald-400", "hover:bg-emerald-700"];
const gameOverScreen = document.querySelector(".game-over-screen");
const finalScore = document.querySelector(".final-score");
const retry = document.querySelector(".retry");
function create_bubble() {
  let clutter = new String();
  const wrapper = document.querySelector(".game")
  console.log(wrapper.computedStyle)

  let times = 168;
  for (let i = 1; i <= times; i++) {
    let random = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble h-9 w-9 sm:h-10 sm:w-10 bg-emerald-400 rounded-[50%] flex items-center justify-center text-white text-2xl  font-semibold cursor-pointer hover:bg-emerald-700 transition-all duration-100">${random}</div>`;
  }
  bottom.innerHTML = clutter;
}
function game() {
  create_bubble();
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble, index) => {
    bubble.addEventListener("click", () => {
      if (newTurn) {
        firstVal = bubble.textContent;
        firstValIndex = index;
        changeBackground(firstValIndex);
        hit.textContent = ++hitVal;
        newTurn = false;
      } else {
        if (firstValIndex == index) {
          changeBackground(firstValIndex);
          newTurn = true;
          firstVal = null;
          firstValIndex = null;
          return;
        }
        secondVal = bubble.textContent;
        secondValIndex = index;
        changeBackground(secondValIndex);
        hit.textContent = ++hitVal;
        if (firstVal == secondVal) {
          score.textContent = ++scoreVal;
          firstVal = null;
          secondVal = null;
          bubbles[firstValIndex].style.opacity = 0;
          bubbles[firstValIndex].style.pointerEvents = "none";
          bubbles[secondValIndex].style.opacity = 0;
          bubbles[secondValIndex].style.pointerEvents = "none";
        }
        changeBackground(firstValIndex);
        firstValIndex = null;
        secondValIndex = null;
        newTurn = true;
      }
    });
  });

  function changeBackground(firstIndex) {
    if (newTurn) {
      bubbles[firstIndex].classList.remove(...remove);
      bubbles[firstIndex].classList.add("bg-yellow-500");
    } else {
      bubbles[firstIndex].classList.remove("bg-yellow-500");
      bubbles[firstIndex].classList.add(...remove);
    }
  }
}

function countdown() {
  if (countdownId) clearInterval(countdownId);
  timer.textContent = time;
  countdownId = setInterval(() => {
    time--;
    if (time < 0) {
      bottom.classList.remove("flex");
      bottom.classList.add("hidden");
      gameOverScreen.classList.remove("hidden");
      gameOverScreen.classList.add("flex");
      clearInterval(countdownId);
      bottom.innerHTML = "";
      finalScore.textContent = scoreVal;
      return;
    } else {
      timer.textContent = time;
    }
  }, 1000);
}

retry.addEventListener("click", () => {
  hitVal = 0;
  scoreVal = 0;
  time = 60;
  firstVal = null;
  secondVal = null;
  secondValIndex = null;
  newTurn = true;
  hit.textContent = hitVal;
  gameOverScreen.classList.add("hidden");
  score.textContent = scoreVal;
  bottom.classList.remove("hidden");
  bottom.classList.add("flex");
  game();
  countdown();
});

game();
countdown();

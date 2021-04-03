import {Images, imgs, winImgs, loseImgs, startImg} from './imgs.js';
import *as sound from './sound.js';

const $squareContainer = document.querySelector('.square__container');
const $startButton = document.querySelector('.start__button');
const $gameInfoBar = document.querySelector('.game__info');
const $gameTimer = document.querySelector('.game-timer');
const $gameState = document.querySelector('.game-state');

const flippedImgs = [];
const imgUrls = [];

const QUESTION_COUNT = 8;
const TIME_LIMIT = 30;
const GAME = {
  START: '시작',
  RESTART: '재시작',
  WIN: 'win',
  LOSE: 'lose'
};

(function makeImgSrcList(){
  for (let i = 0; i < imgs.length; i++) {
    const imgUrl = new Images(i + 1, imgs[i]);
    imgUrls.push(imgUrl);
    imgUrls.push(imgUrl);
  }
})();

let isPlaying = false;
let answerCount = 0;
let timer = null;

function updateAnswerCount(count) {
  (count === QUESTION_COUNT) && finishGame(GAME.WIN);
  $gameState.textContent = `${QUESTION_COUNT - count}명`;
}

function flipImg(square) {
  square.classList.toggle('flip');
}

function handleCheckAnswer(ev) {
  if (flippedImgs.length !== 2) {
    return;
  }

  const [firstImg, secondImg] = flippedImgs;
  const firstImgNumber = firstImg.dataset.number;
  const secondImgNumber = secondImg.dataset.number;

  if (firstImgNumber === secondImgNumber) {
    sound.playCorrect();
    updateAnswerCount(++answerCount);
  } else {
    sound.playError();
    setTimeout(() => {
      flipImg(firstImg);
      flipImg(secondImg);
    }, 300)
  }

  flippedImgs.length = 0;
}

function handleFlipSquare(ev) {
  const nowImg = ev.target.parentNode;
  const flippedImg = nowImg.classList.contains('flip');
  const squareImg = ev.target.classList.contains('square-img');

  if (!squareImg || flippedImg) {
    return;
  }

  flipImg(nowImg);
  flippedImgs.push(nowImg);
}

function toggleGameInfoBar() {
  $gameInfoBar.classList.toggle('hide-game__info');
}

function changeButtonText() {
  $startButton.textContent = isPlaying
    ? GAME.RESTART
    : GAME.START;
}

function changeBackgroundImg(gameState) {
  let imgUrl;
  switch(gameState) {
    case GAME.WIN:
      imgUrl = winImgs[0];
      sound.playWin();
      break;
    case GAME.LOSE:
      imgUrl = loseImgs[0];
      sound.playLose();
      break;
    case GAME.RESTART:
      imgUrl = startImg;
      break;
    default:
      throw new Error('sorry');
  }

  const $backgroundImg = document.querySelector('.bg-img');
  $backgroundImg.src = imgUrl;
}

function paintSquaresByImg(urls) {
  const $frontSquares = document.querySelectorAll('.front-square');
  const $backSquares = document.querySelectorAll('.back-square');

  for (let j = 0; j < $backSquares.length; j++) {
    const $frontImg = document.createElement('img');
    const $backImg = document.createElement('img');

    $frontSquares[j].dataset.number = urls[j].number;
    $frontSquares[j].appendChild($frontImg);
    $backSquares[j].appendChild($backImg);

    $frontImg.src = '../bgs/square-bg.jpg'
    $backImg.src = urls[j].url;
    $frontImg.classList.add('square-img');
    $backImg.classList.add('square-img');
    $frontImg.setAttribute('draggable', false);
    $backImg.setAttribute('draggable', false);
  }
}

function shuffleImgUrls() {
  for (let i = imgUrls.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    let urlOfI = imgUrls[i];
    imgUrls[i] = imgUrls[randomIndex];
    imgUrls[randomIndex] = urlOfI;
  }

  paintSquaresByImg(imgUrls);
}

function removeSquares() {
  $squareContainer.innerHTML = '';
}

function createSquares() {
  for (let i =0; i < QUESTION_COUNT * 2; i++){
    const $square = document.createElement('div');
    const $frontSquare = document.createElement('div');
    const $backSquare = document.createElement('div');

    $squareContainer.append($square);
    $square.append($frontSquare, $backSquare);
    $square.classList.add('square');
    $backSquare.classList.add('back-square');
    $frontSquare.classList.add('front-square');
  }
}

function removeBackground() {
  document.querySelector('.bg-img').remove();
}

function createBackgroundImg() {
  const $backgroundImg = document.createElement('img');
  $squareContainer.appendChild($backgroundImg);
  $backgroundImg.classList.add('bg-img');
  $backgroundImg.setAttribute('draggable', false);
}

function updateGameTimer(seconds) {
  $gameTimer.textContent = `${seconds}초`;
}

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  let seconds = TIME_LIMIT;
  updateGameTimer(seconds);

  timer = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timer);
      finishGame(GAME.LOSE)
    } else {
      updateGameTimer(--seconds);
    }
  }, 1000)
}

function finishGame(gameState) {
  createBackgroundImg();
  changeBackgroundImg(gameState);
  stopTimer();
  sound.stopBackground();
}

function restartGame() {
  isPlaying = false;
  answerCount = 0;
  stopTimer();
  removeSquares();
  createBackgroundImg();
  changeButtonText();
  toggleGameInfoBar();
  changeBackgroundImg(GAME.RESTART);
  sound.stopBackground();
  sound.stopWin();
  sound.stopLose();
}

function startGame() {
  isPlaying = true;
  startTimer();
  createSquares();
  shuffleImgUrls();
  removeBackground();
  changeButtonText();
  toggleGameInfoBar();
  updateAnswerCount(answerCount);
  sound.playBackground();

}

$squareContainer.addEventListener('click', (ev) => {
  handleFlipSquare(ev);
});

$squareContainer.addEventListener('click', (ev) => {
  handleCheckAnswer(ev);
});

$startButton.addEventListener('click', () => {
  sound.playStart();
  if (isPlaying) {
    restartGame();
  } else {
    startGame();
  }
});

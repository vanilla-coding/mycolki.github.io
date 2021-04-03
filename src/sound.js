const bgSound = new Audio('../sound/background.mp3');
const startSound = new Audio('../sound/start.mp3');
const correctSound = new Audio('../sound/correct.mp3');
const errorSound = new Audio('../sound/wrong.mp3');
const winSound = new Audio('../sound/win.mp3');
const loseSound = new Audio('../sound/lose.wav');

export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

export function playStart() {
  playSound(startSound);
}

export function playCorrect() {
  playSound(correctSound);
}

export function playError() {
  playSound(errorSound);
}

export function playWin() {
  playSound(winSound);
}

export function stopWin() {
  stopSound(winSound);
}

export function playLose() {
  playSound(loseSound);
}

export function stopLose() {
  stopSound(loseSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

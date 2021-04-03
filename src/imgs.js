export const imgs = [
  '../imgs/01.jpg',
  '../imgs/02.jpg',
  '../imgs/03.jpg',
  '../imgs/04.jpg',
  '../imgs/05.jpg',
  '../imgs/06.jpg',
  '../imgs/07.jpg',
  '../imgs/08.jpg',
];

export const winImgs = [
  '../bgs/win-bg1.jpg',
  '../bgs/win-bg2.jpg'
];

export const loseImgs = [
  '../bgs/lose-bg1.jpg',
  '../bgs/lose-bg2.jpg',
];

export const startImg = '../bgs/bg.png';

export class Images {
  constructor(id, img) {
    this.number= id;
    this.url= img;
  }
};

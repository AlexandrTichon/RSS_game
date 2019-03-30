function drawEllipse(centerX, centerY, width, height) {
  const context = document.querySelector('#battleArea').getContext('2d');
  context.beginPath(); // start new path after each redraw of each element

  context.moveTo(centerX, centerY - height / 2);

  context.bezierCurveTo(
    centerX + width / 2, centerY - height / 2,
    centerX + width / 2, centerY + height / 2,
    centerX, centerY + height / 2,
  );

  context.bezierCurveTo(
    centerX - width / 2, centerY + height / 2,
    centerX - width / 2, centerY - height / 2,
    centerX, centerY - height / 2,
  );

  context.fill();
  context.closePath();
}

class DrawBattle {
  constructor(userParam, monsterParam) {
    this.userParam = userParam;
    this.monsterParam = monsterParam;
    this.images = {};
    this.imagesM = {};

    this.x = 0;
    this.y = 0;

    this.breathInc = 0.1;
    this.breathAmt = 0;
    this.breathMax = 2;
    this.breathDir = 1;

    this.allImg = this.userParam.imgList.concat(this.monsterParam.imgList);
  }

  updateBreath() {
    if (this.breathDir === 1) { // breath in
      this.breathAmt -= this.breathInc;
      if (this.breathAmt < -this.breathMax) {
        this.breathDir = -1;
      }
    } else { // breath out
      this.breathAmt += this.breathInc;
      if (this.breathAmt > this.breathMax) {
        this.breathDir = 1;
      }
    }
    requestAnimationFrame(this.updateBreath.bind(this));
  }

  redrawUser() {
    this.x = 245;
    this.y = 430;

    drawEllipse(this.x + 40, this.y + 29, 160 - this.breathAmt, 8); // draw shadow

    const context = document.querySelector('#battleArea').getContext('2d');

    // images draw in full sizes
    context.drawImage(this.images.leftArm, this.x + this.userParam.animationPos.leftArm.x,
      this.y + this.userParam.animationPos.leftArm.y - this.breathAmt);
    context.drawImage(this.images.legs, this.x + this.userParam.animationPos.legs.x,
      this.y + this.userParam.animationPos.legs.y);
    context.drawImage(this.images.torso, this.x + this.userParam.animationPos.torso.x,
      this.y + this.userParam.animationPos.torso.y);
    context.drawImage(this.images.head, this.x + this.userParam.animationPos.head.x,
      this.y + this.userParam.animationPos.head.y - this.breathAmt);
    context.drawImage(this.images.hair, this.x + this.userParam.animationPos.hair.x,
      this.y + this.userParam.animationPos.hair.y - this.breathAmt);
    context.drawImage(this.images.rightArm, this.x + this.userParam.animationPos.rightArm.x,
      this.y + this.userParam.animationPos.rightArm.y - this.breathAmt);

    const curEyeHeight = 14;

    drawEllipse(this.x + 47, this.y - 68 - this.breathAmt, 8, curEyeHeight); // Left Eye
    drawEllipse(this.x + 58, this.y - 68 - this.breathAmt, 8, curEyeHeight); // Right Eye
  }

  redrawFrame() {
    const canvas = document.querySelector('#battleArea');
    canvas.width = canvas.width; // clears the canvas

    this.redrawMonster();
    this.redrawUser();

    requestAnimationFrame(this.redrawFrame.bind(this));
  }

  redrawMonster() {
    this.x = 1100;
    this.y = 290;

    drawEllipse(this.x + 100, this.y + 186, 400 - 2 * this.breathAmt, 15); // draw shadow

    const context = document.querySelector('#battleArea').getContext('2d');

    // images draw in full sizes
    context.drawImage(this.imagesM.legs, this.x + this.monsterParam.animationPos.legs.x,
      this.y + this.monsterParam.animationPos.legs.y);
    context.drawImage(this.imagesM.rightArm, this.x + this.monsterParam.animationPos.rightArm.x,
      this.y + this.monsterParam.animationPos.rightArm.y - this.breathAmt);
    context.drawImage(this.imagesM.torso, this.x + this.monsterParam.animationPos.torso.x,
      this.y + this.monsterParam.animationPos.torso.y);
    context.drawImage(this.imagesM.head, this.x + this.monsterParam.animationPos.head.x,
      this.y + this.monsterParam.animationPos.head.y - this.breathAmt);
    context.drawImage(this.imagesM.leftArm, this.x + this.monsterParam.animationPos.leftArm.x,
      this.y + this.monsterParam.animationPos.leftArm.y - this.breathAmt);
  }

  loadImages() {
    this.monsterParam.imgList.forEach((element) => {
      this.imagesM[element] = new Image();
      this.imagesM[element].onload = () => {
        requestAnimationFrame(this.redrawFrame.bind(this));
      };
      this.imagesM[element].src = `${this.monsterParam.source}M${Math.floor(Math.random() * 3) + 1}_${element}.${this.monsterParam.imgType}`;
    });
    this.userParam.imgList.forEach((element) => {
      this.images[element] = new Image();
      this.images[element].onload = () => {
        requestAnimationFrame(this.redrawFrame.bind(this));
      };
      this.images[element].src = `${this.userParam.source}${element}.${this.userParam.imgType}`;
    });
    requestAnimationFrame(this.updateBreath.bind(this));
  }
}

function resizeCanvas() {
  const canvas = document.querySelector('#battleArea');
  canvas.width = window.innerWidth;
  canvas.height = 550;
}

function prepareCanvas() {
  resizeCanvas(); // listener for fullscreen canvas
  // draw user character
  window.addEventListener('resize', resizeCanvas, false);
  const userImgList = ['leftArm', 'legs', 'torso', 'rightArm', 'head', 'hair'];
  const userSource = './components/sprites/user/';
  const userImgType = 'png';
  const userAnimationPos = {
    leftArm: {
      x: 40,
      y: -42,
    },
    legs: {
      x: 0,
      y: 0,
    },
    torso: {
      x: 0,
      y: -50,
    },
    head: {
      x: -10,
      y: -125,
    },
    hair: {
      x: -37,
      y: -138,
    },
    rightArm: {
      x: -15,
      y: -42,
    },
  };

  const userCharacterParam = {
    imgList: userImgList,
    source: userSource,
    imgType: userImgType,
    animationPos: userAnimationPos,
  };

  // draw monster character
  const monsterImgList = ['leftArm', 'legs', 'torso', 'rightArm', 'head'];
  const monsterSource = './components/sprites/monster/';
  const monsterImgType = 'png';
  const monsterAnimationPos = {
    leftArm: {
      x: 166,
      y: -126,
    },
    legs: {
      x: 0,
      y: 0,
    },
    torso: {
      x: -5,
      y: -138,
    },
    head: {
      x: -26,
      y: -193,
    },
    rightArm: {
      x: -93,
      y: -20,
    },
  };

  const monsterCharacterParam = {
    imgList: monsterImgList,
    source: monsterSource,
    imgType: monsterImgType,
    animationPos: monsterAnimationPos,
  };
  const BATTLE = new DrawBattle(userCharacterParam, monsterCharacterParam);
  BATTLE.loadImages();
}

export default prepareCanvas;

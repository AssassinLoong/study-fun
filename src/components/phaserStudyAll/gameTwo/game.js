const Phaser = window.Phaser;
import dog from "@/assets/images/dog.png";

let canvasW, canvasH;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Main" });
  }
  preload() {
    this.load.atlas("dogs", dog);
  }
  create() {}
  update() {}
}

// const width = 750;
// const height = width / (window.innerWidth / window.innerHeight);

let gameIns = null;

const game = {
  launch: ({ parent, width, height }) => {
    gameIns = new Phaser.Game({
      type: Phaser.CANVAS,
      parent: parent,
      transparent: false,
      canvasStyle: `width:${width}px;height:${height}px`,
      width,
      height,
      scene: [MainScene],
      audio: {
        // web audio 的部分对安卓 5.0 设备不兼容
        disableWebAudio: true
      }
    });
    canvasW = width;
    canvasH = height;
  },
  destroy: () => {
    gameIns.destroy(true);
  }
};

function color(i) {
  return "0x" + Math.floor(Math.random() * 16777215).toString(16);
  // return 0x001100 * (i % 15) + 0x000033 * (i % 5);
}

function calcVW(number) {
  // return (number / 750) * window.innerWidth;
  return (number / 750) * canvasW;
}

function scaleVW(number, scale = 1) {
  let Imgpercent;
  let size = number;
  size = number * scale;
  Imgpercent = size / 750;

  return Imgpercent;
}

export default game;

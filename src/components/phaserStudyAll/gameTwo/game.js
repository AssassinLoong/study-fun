const Phaser = window.Phaser;
import dog from "@/assets/images/dog.png";
import ball from "@/assets/images/ball.png";
import configJson from "./game.json";

let canvasW, canvasH;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Main" });
  }
  preload() {
    this.load.atlas("dogs", dog, configJson);
    this.load.image("ball", ball);
  }
  create() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames("dogs", { prefix: "run_", end: 4, zeroPad: 2 }),
      frameRate: 4,
      repeat: -1,
      yoyo: true
    });

    var staticBlock = this.add
      .sprite(calcVW(canvasW / 2 - 150), calcVW(canvasW / 2 - 150), "dogs")
      .play("run")
      .setScale(scaleVW(150, 150 / 240));

    var block = this.add.tileSprite(100, 100, 64 * 1, 64 * 1, "ball").setScale(scaleVW(64));
    this.physics.add.existing(block, false);
    block.body.setVelocity(180, 180);
    block.body.setBounce(1, 1);
    block.body.setCollideWorldBounds(true);

    this.physics.add.existing(staticBlock, true);
    this.physics.add.collider(block, staticBlock);
  }
  update() {}
}

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
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 200 }
        }
      },
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
  return (number / 750) * window.innerWidth;
  // return (number / 750) * canvasW;
}

function scaleVW(number, scale = 1) {
  let Imgpercent;
  Imgpercent = (canvasW / 750) * scale;

  return Math.min(Imgpercent, 1);
}

export default game;

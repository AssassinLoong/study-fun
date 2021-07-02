const Phaser = window.Phaser;
import dog from "@/assets/images/dog.png";
import go from "@/assets/images/go.png";
import ball from "@/assets/images/ball.png";
import configJson from "./game.json";
import goJson from "./go.json";

let canvasW, canvasH;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Main" });
    this.a = 0;
  }
  preload() {
    this.load.atlas("dogs", dog, configJson);
    this.load.image("ball", ball);
    this.load.atlas("goes", go, goJson);
  }
  create() {
    /**
     * @function generateFrameNames
     * @param prefix 帧数标题头
     * @param end 多少帧
     * @param zeroPad 多少位数，不足的补0（如果设置为2，00、01、02...）
     */
    this.dog = this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames("dogs", { prefix: "run_", end: 4, zeroPad: 2 }),
      frameRate: 4,
      repeat: -1,
      yoyo: true
    });

    this.go = this.anims.create({
      key: "go",
      frames: this.anims.generateFrameNames("goes", { prefix: "go_", end: 4, zeroPad: 2 }),
      frameRate: 1.5,
      repeat: 0,
      hideOnComplete: true
    });

    var staticBlock = this.add
      .sprite(calcVW(canvasW / 2 - 150), calcVW(canvasW / 2 - 150), "dogs")
      .play("run")
      .setScale(scaleVW(150 / 240));

    this.add
      .sprite(calcVW(canvasW / 2 - 150), calcVW(canvasW / 2 - 150), "dogs")
      .play("go")
      .addListener("complete", function() {
        console.log(1234);
      });

    var ball1 = this.add.tileSprite(100, 100, 64 * 1, 64 * 1, "ball").setScale(scaleVW());
    /**
     * 游戏对象添加一个街机物理体 参数：对象、是否静态
     * 这个设置需要在下面这段代码之前
     */
    this.physics.add.existing(ball1, false);
    // 代码段开始
    ball1.body.setVelocity(180, 180);
    ball1.body.setBounce(1, 1);
    ball1.body.setCircle(32);
    ball1.body.setCollideWorldBounds(true);
    // 结束

    var ball2 = this.physics.add.image(700, 240, "ball");

    ball2.setScale(scaleVW()); // 设置缩放
    ball2.setCircle(32); // 将此物理物体设置为使用圆而不是矩形进行碰撞。 参数：半径,x偏移量,y
    ball2.setCollideWorldBounds(true); // 设置是否与世界边界碰撞
    ball2.setBounce(1); // 设置反弹值（1：原速，0：不反弹）
    ball2.setVelocity(-200, 60); // 设置物体的初始速度。 参数：x,y(正值向右移动)
    ball2.debugShowVelocity = false; // 隐藏速度标记。

    this.physics.add.existing(staticBlock, true);
    this.physics.add.collider(ball1, staticBlock); // 设置两物体碰撞
    this.physics.add.collider(staticBlock, ball2);
    this.physics.add.collider(ball1, ball2);
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

function scaleVW(scale = 1) {
  let Imgpercent;
  Imgpercent = (canvasW / 750) * scale;

  return Math.min(Imgpercent, 1);
}

export default game;

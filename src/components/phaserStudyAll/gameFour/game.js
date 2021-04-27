import random from "lodash/random";

function calcVW(number) {
  return (number / 750) * window.innerWidth;
}

const Phaser = window.Phaser;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.awardGraphics = null;
    this.awardCurve = null;
    this.awardPath = null;

    this.linkGraphics = null;
    this.linkCurve = null;
    this.linkPath = null;
  }
  preload() {
    this.load.image("gunBody", require("@/assets/images/gun/gun_body.png"));
    this.load.image("wheelLeft", require("@/assets/images/gun/wheel_left.png"));
    this.load.image("wheelRight", require("@/assets/images/gun/wheel_right.png"));

    this.load.image("rope", require("@/assets/images/gun/rope.png"));
    this.load.image("link", require("@/assets/images/gun/award_link.png"));
    this.load.image("award1", require("@/assets/images/gun/award_1.png"));
    this.load.image("award2", require("@/assets/images/gun/award_2.png"));

    this.load.image("ball", require("@/assets/images/gun/ball.png"));
  }

  async create() {
    console.log("create");

    var y = 750 / (window.innerWidth / window.innerHeight);

    this.wheelLeft = this.add
      .image(142, 93, "wheelLeft", 0)
      .setPosition(750 * 0.48, 860)
      .setVisible(true);
    this.wheelRight = this.add
      .image(56, 73, "wheelRight", 0)
      .setPosition(750 * 0.575, 850)
      .setVisible(true);
    this.gunBody = this.add
      .image(103, 151, "gunBody", 0)
      .setPosition(375, 810)
      .setVisible(true);

    this.rope = this.add
      .image(750, 79, "rope", 0)
      .setPosition(375, 190)
      .setVisible(true);

    this.rope = this.add
      .image(750, 79, "rope", 0)
      .setPosition(375, 190)
      .setVisible(true);

    this.ball = this.add
      .image(64, 64, "ball", 0)
      .setPosition(375, 800)
      .setVisible(true);

    this.createAward();
    this.createLink();

    this.addEvent();
  }

  createAward() {
    this.awardGraphics = this.add.graphics();
    var awardStartPoint = new Phaser.Math.Vector2(850, 216);
    var controlPoint1 = new Phaser.Math.Vector2(375, 370);
    var endPoint = new Phaser.Math.Vector2(-100, 216);
    this.awardCurve = new Phaser.Curves.QuadraticBezier(awardStartPoint, controlPoint1, endPoint);
    this.awardPath = { t: 0, vec: new Phaser.Math.Vector2() };

    this.packGroup = this.add.group({
      defaultKey: "award",
      maxSize: 6,
      createCallback: award => {
        award
          .setSize(200, 190)
          .setName("award" + this.packGroup.getLength())
          .setScale(0.5);

        console.log(award);
      }
    });

    var pack;
    for (var i = 0; i < 6; i++) {
      if (i % 2 == 0) {
        pack = this.packGroup.create(0, 0, "award1");
      } else {
        pack = this.packGroup.create(0, 0, "award2");
      }

      pack.setData("vector", new Phaser.Math.Vector2());

      this.tweens.add({
        targets: pack,
        z: 1,
        ease: "Linear",
        duration: 3600,
        repeat: -1,
        delay: i * 600
      });
    }
  }

  createLink() {
    this.linkGraphics = this.add.graphics();
    var awardStartPoint = new Phaser.Math.Vector2(850, 160);
    var controlPoint1 = new Phaser.Math.Vector2(375, 310);
    var endPoint = new Phaser.Math.Vector2(-100, 160);
    this.linkCurve = new Phaser.Curves.QuadraticBezier(awardStartPoint, controlPoint1, endPoint);
    this.linkPath = { t: 0, vec: new Phaser.Math.Vector2() };

    this.linkGroup = this.add.group({
      defaultKey: "link",
      maxSize: 6,
      createCallback: link => {
        link.setSize(18, 62).setName("link" + this.linkGroup.getLength());

        console.log(link, "link");
      }
    });

    var link;
    for (var i = 0; i < 6; i++) {
      link = this.linkGroup.create(0, 0, "link");

      link.setData("vector", new Phaser.Math.Vector2());

      this.tweens.add({
        targets: link,
        z: 1,
        ease: "Linear",
        duration: 3600,
        repeat: -1,
        delay: i * 600
      });
    }
  }

  addEvent() {
    // 滑动屏幕操作
    this.input.on("pointermove", this.handleTouch);
  }

  handleTouch = e => {
    // console.log(e.x, e.y);
  };

  // 发球
  launchBall() {
    console.log(this.gunBody);
  }

  update() {
    this.awardGraphics.clear();
    this.linkGraphics.clear();

    var packs = this.packGroup.getChildren();
    var links = this.linkGroup.getChildren();

    for (var i = 0; i < packs.length; i++) {
      var t = packs[i].z;
      var vec = packs[i].getData("vector");
      this.awardCurve.getPoint(t, vec);
      packs[i].setPosition(vec.x, vec.y);
      packs[i].setDepth(packs[i].y);

      var t = links[i].z;
      var vec = links[i].getData("vector");
      this.linkCurve.getPoint(t, vec);
      links[i].setPosition(vec.x, vec.y);
      links[i].setDepth(links[i].y);
    }
  }
}

let gameIns = null;
const ratio = window.innerWidth / window.innerHeight;

const game = {
  launch: canvas => {
    gameIns = new Phaser.Game({
      type: Phaser.CANVAS,
      width: 750,
      height: 1206,
      // height: 750 / ratio,
      canvas: canvas,
      canvasStyle: "width:100%",
      transparent: true,
      // backgroundColor: 'transparent',
      scene: [MainScene]
    });
  },
  fire: () => {
    gameIns.scene.getScene("game").launchBall();
  },
  restart: () => {
    gameIns.scene.getScene("game").scene.restart({
      paused: false
    });
  },
  destroy: () => {
    gameIns.destroy(true);
  }
};

export default game;

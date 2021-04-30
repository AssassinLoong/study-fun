import random from "lodash/random";

const Phaser = window.Phaser;

const Delay = 600;
const Count = 6;

// 绳子定位
const ropeY = 190;

// 炮筒定位
const gunBodyX = 375;
const gunBodyY = 810 + 151 / 2;

// 车轮定位
const wheelLeftX = 750 * 0.48;
const wheelLeftY = 860;
const wheelRightX = 750 * 0.575;
const wheelRightY = 850;

// 球的定位
const ballX = 375;
const ballY = 810;
const speed = 500; // 球的飞行速度(垂直)-每次运动的y轴距离

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.awardCurve = null; // 福袋运动轨迹
    this.linkCurve = null; // 连接器运动轨迹

    this.gunBodyTween = null; // 炮筒动画

    this.gunAngle = 0; // 炮筒旋转角度
    this.maxAngle = (Math.atan(gunBodyX / (gunBodyY - ropeY)) * 180) / Math.PI; // 最大旋转角度
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
    console.log("create", this.game);

    var y = 750 / (window.innerWidth / window.innerHeight);

    this.rope = this.add
      .image(750, 79, "rope", 0)
      .setPosition(375, ropeY)
      .setVisible(true);

    // this.ball = this.add
    //   .image(64, 64, "ball", 0)
    //   .setPosition(ballX, ballY)
    //   .setVisible(true)
    //   .setDepth(1);

    this.ball = this.physics.add
      .image(64, 64, "ball", 0)
      .setPosition(375, 800)
      .setVisible(false)
      .setCollideWorldBounds(false)
      .setBounce(1)
      .setCircle(32)
      .setBounce(0);

    this.createAward();
    this.createLink();

    this.physics.add.collider(this.ball, this.packGroup, this.colliderCb);

    this.gunInit();

    this.addEvent();
  }

  // 初始化炮台
  gunInit() {
    this.wheelLeft = this.add
      .image(142, 93, "wheelLeft", 0)
      .setPosition(wheelLeftX, wheelLeftY)
      .setVisible(true);
    this.wheelRight = this.add
      .image(56, 73, "wheelRight", 0)
      .setPosition(wheelRightX, wheelRightY)
      .setVisible(true);
    this.gunBody = this.add
      .image(103, 151, "gunBody", 0)
      .setPosition(gunBodyX, gunBodyY)
      .setVisible(true)
      .setOrigin(0.5, 1);

    this.gunBodyTween = this.tweens.add({
      targets: this.gunBody,
      paused: true,
      scaleY: 0.7,
      duration: 500,
      ease: "Sine.easeInOut",
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        this.ball.setVisible(true); // 显示球

        // 根据角度 计算出xy的比例
        let persent = Math.tan(this.gunAngle * ((2 * Math.PI) / 360));

        // 根据y轴速度(每次移动距离) 计算出x轴速度
        let speedX = speed * persent;
        this.ball.setVelocity(speedX, -speed);
      }
    });
  }

  // 创建福袋
  createAward() {
    var awardStartPoint = new Phaser.Math.Vector2(850, 216);
    var controlPoint1 = new Phaser.Math.Vector2(375, 370);
    var endPoint = new Phaser.Math.Vector2(-100, 216);
    this.awardCurve = new Phaser.Curves.QuadraticBezier(awardStartPoint, controlPoint1, endPoint);

    this.packGroup = this.physics.add.group({
      defaultKey: "award",
      maxSize: 6,
      createCallback: award => {
        award
          .setSize(200, 190)
          .setName("award" + this.packGroup.getLength())
          .setScale(0.5)
          .setCircle(100);
      }
    });

    var pack;
    for (var i = 0; i < Count; i++) {
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
        duration: Count * Delay,
        repeat: -1,
        delay: i * Delay
      });
    }
  }

  // 创建福袋连接器
  createLink() {
    var awardStartPoint = new Phaser.Math.Vector2(850, 160);
    var controlPoint1 = new Phaser.Math.Vector2(375, 310);
    var endPoint = new Phaser.Math.Vector2(-100, 160);
    this.linkCurve = new Phaser.Curves.QuadraticBezier(awardStartPoint, controlPoint1, endPoint);

    this.linkGroup = this.add.group({
      defaultKey: "link",
      maxSize: 6,
      createCallback: link => {
        link.setSize(18, 62).setName("link" + this.linkGroup.getLength());
      }
    });

    var link;
    for (var i = 0; i < Count; i++) {
      link = this.linkGroup.create(0, 0, "link");

      link.setData("vector", new Phaser.Math.Vector2());

      this.tweens.add({
        targets: link,
        z: 1,
        ease: "Linear",
        duration: Count * Delay,
        repeat: -1,
        delay: i * Delay
      });
    }
  }

  // 添加事件
  addEvent() {
    // 滑动屏幕操作
    this.input.on("pointermove", this.handleTouch);
  }

  // 滑动屏幕回调
  handleTouch = e => {
    let activeX = e.x;
    let activeY = e.y;

    let gunDeg = (Math.atan((activeX - gunBodyX) / (gunBodyY - activeY)) * 180) / Math.PI;
    let deg = (this.gunAngle = gunDeg > 0 ? Math.min(gunDeg, this.maxAngle) : Math.max(gunDeg, -this.maxAngle));

    let gunH = this.gunBody.height;

    if (activeY < gunBodyY) {
      this.gunBody.setAngle(deg);
      this.wheelLeft.setX(wheelLeftX + deg);
      this.wheelRight.setX(wheelRightX + deg);

      // 根据角度 计算球对于初始点 移动的距离 设置球的位置
      let w = parseInt(Math.sin(deg * ((2 * Math.PI) / 360)) * (gunH / 2));
      let h = Math.abs(parseInt(Math.cos(deg * ((2 * Math.PI) / 360)) * (gunH / 2)));
      let x = ballX + w;
      let y = ballY + (gunH / 2 - h);
      this.ball.setX(x);
      this.ball.setY(y);
    }
  };

  // 碰撞回调
  colliderCb = (obj1, obj2) => {
    this.ball.setVisible(false).setPosition(ballX, ballY); // 显示球

    console.log(obj2);
  };

  // 发球
  launchBall() {
    this.gunBodyTween.play();
  }

  update() {
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
      scene: [MainScene],
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: { y: 0 }
        }
      }
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

import random from "lodash/random";

const Phaser = window.Phaser;
const staticTime = 10;
var startX = [
  [50, 300],
  [300, 550],
  [550, 900]
];

function activatePocket(pocket) {
  pocket.setActive(true).setVisible(true);
}

function addGroup(groupName) {
  var [x1, x2] = startX[random(1, 2)];
  var initX = random(x1, x2);
  var initY = 0;
  if (initX >= 750) {
    initY = random(window.innerHeight / 2, (window.innerHeight / 4) * 3);
  }
  var pocket = this[groupName].get(initX, initY);
  if (groupName === "groupBean") {
    // 如果是金豆则需要选择跟缩放
    pocket.setRotation(-11).setScale(random(0.4, 1));
  }
  if (!pocket) return; // None free

  activatePocket(pocket);
}
function killGroup(groupName) {
  this[groupName].children.iterate(pocket => {
    if (pocket.y > 750 / (window.innerWidth / window.innerHeight) || pocket.x <= -pocket.width) {
      this[groupName].killAndHide(pocket);
    }
  });
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.countdownTime = staticTime;
    this.groupBean = null;
    this.groupBar = null;
    this.groupRain = null;
    this.clickTimes = 0;
  }
  preload() {
    this.load.image("pocket", require("@/assets/images/rain/redpocket.png"));

    this.load.image("BG", require("@/assets/images/rain/redrain_bg.jpg"));
    this.load.image("clock", require("@/assets/images/rain/redrain_clock.png"));
    this.load.image("moveline", require("@/assets/images/rain/redrain_countdown_move.png"));
    this.load.image("movebg", require("@/assets/images/rain/redrain_countdown_box.png"));
    this.load.image("counter", require("@/assets/images/rain/counter_icon.png"));
    this.load.image("bar", require("@/assets/images/rain/goldBar.png"));
    this.load.image("rain", require("@/assets/images/rain/rain.png"));
  }

  async create() {
    console.log("create");
    var y = 750 / (window.innerWidth / window.innerHeight);
    this.bg = this.add
      .image(750, 1650, "BG", 0)
      .setPosition(375, y / 2)
      .setVisible(true);

    this.counter = this.add
      .image(172, 157, "counter")
      .setOrigin(0, 0)
      .setPosition(578, 1025);
    this.counter_text = this.add
      .text(675, 1135, `黄金雨场数X${game.count}`, {
        fontSize: "23px",
        color: "#79512a",
        align: "center"
      })
      .setOrigin(0.5);

    console.log(game, "game");

    this.groupBean = this.add.group({
      defaultKey: "pocket",
      maxSize: 50,
      createCallback: pocket => {
        pocket
          .setSize(172, 184)
          .setOrigin(0, 1)
          .setName("pocket" + this.groupBean.getLength());
        var clickE = pocket.setInteractive();
        clickE.on("pointerdown", pointer => {
          this.groupBean.killAndHide(pocket); //停用并隐藏该组成员
          var { x, y } = pointer.position;
          this.game.bomb && this.game.bomb(x, y);
          console.log("点击的屏幕位置", x, y);
        });
      }
    });
    this.groupBean.setDepth(10);
    this.addpocketTimer = this.time.addEvent({
      delay: 500,
      loop: true,
      callback: addGroup.bind(this, "groupBean")
    });

    this.groupBar = this.add.group({
      defaultKey: "bar",
      maxSize: 50,
      createCallback: pocket => {
        pocket
          .setSize(172, 184)
          .setOrigin(0, 1)
          .setName("pocket" + this.groupBar.getLength());
        var clickE = pocket.setInteractive();
        clickE.on("pointerdown", pointer => {
          // clearTimeout(this.t1);
          this.groupBar.killAndHide(pocket); //停用并隐藏该组成员
          var { x, y } = pointer.position;
          this.game.bomb && this.game.bomb(x, y);
          console.log("点击的屏幕位置", x, y);
        });
      }
    });
    this.groupBar.setDepth(10);
    this.addgroupBarTimer = this.time.addEvent({
      delay: 1100,
      loop: true,
      callback: addGroup.bind(this, "groupBar")
    });

    this.groupRain = this.add.group({
      defaultKey: "rain",
      maxSize: 50,
      createCallback: pocket => {
        pocket
          .setSize(155, 256)
          .setOrigin(0, 1)
          .setName("pocket" + this.groupRain.getLength());
      }
    });
    this.addrainTimer = this.time.addEvent({
      delay: 600,
      loop: true,
      callback: addGroup.bind(this, "groupRain")
    });

    this.movebg = this.add
      .image(587, 57, "movebg", 0)
      .setOrigin(0, 0)
      .setPosition(130, 1289)
      .setDepth(1);
    this.moveline = this.add
      .image(487, 35, "moveline", 0)
      .setOrigin(0, 0)
      .setPosition(215, 1296)
      .setDepth(2);
    this.clock = this.add
      .image(177, 170, "clock", 0)
      .setOrigin(0, 0)
      .setPosition(69, 1239)
      .setDepth(3);

    this.tweens.timeline({
      targets: this.moveline,
      ease: "Linear",
      duration: this.countdownTime * 1000,
      tweens: [
        {
          scaleX: 0
        }
      ]
    });
    this.countText = this.add
      .text(160, 1315, this.countdownTime, {
        fontSize: "50px",
        color: "#feec99",
        stroke: "#feec99",
        strokeThickness: 2,
        align: "center"
      })
      .setOrigin(0.5)
      .setDepth(4);
    this.countdowntimer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.countdownTime--;
        this.countText.setText(this.countdownTime);
        if (this.countdownTime === 0) {
          this.countdowntimer.destroy();
          this.addpocketTimer.destroy();
          this.addgroupBarTimer.destroy();
          this.addrainTimer.destroy();
          this.moveline.setVisible(false);
          this.counter_text.setText(`黄金雨场数X${--game.count}`);
          if (typeof this.game.finishCallback === "function") {
            this.game.finishCallback(this.clickTimes);
          }
          return;
        }
      }
    });

    const clockGroup = this.add.group();
    clockGroup.add(this.clock);
    clockGroup.add(this.moveline);
    clockGroup.add(this.movebg);
    clockGroup.add(this.countText);
    clockGroup.add(this.counter_text);
    clockGroup.add(this.counter);
    clockGroup.incY(y - 170 > 1239 ? 0 : y - 170 - 1239);
    console.log(clockGroup.getChildren());
  }

  update() {
    Phaser.Actions.IncY(this.groupBean.getChildren(), 10);
    Phaser.Actions.IncX(this.groupBean.getChildren(), -5);
    Phaser.Actions.IncY(this.groupRain.getChildren(), 12);
    Phaser.Actions.IncX(this.groupRain.getChildren(), -6);
    Phaser.Actions.IncY(this.groupBar.getChildren(), 10);
    Phaser.Actions.IncX(this.groupBar.getChildren(), -5);
    var groupName = ["groupBean", "groupBar", "groupRain"];
    groupName.forEach(item => {
      killGroup.bind(this, item);
    });
  }
}

let gameIns = null;
const ratio = window.innerWidth / window.innerHeight;

const game = {
  launch: canvas => {
    gameIns = new Phaser.Game({
      type: Phaser.CANVAS,
      width: 750,
      height: 750 / ratio,
      canvas: canvas,
      canvasStyle: "width:100%",
      transparent: true,
      // backgroundColor: 'transparent',
      scene: [MainScene]
    });
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

const Phaser = window.Phaser;
const { innerWidth: winWidth, innerHeight: winHeight } = window;

let gameIns = null;

const packSize = {
  width: 122,
  height: 165
};
// 红包奖池大小
const HONGBAO_POOL = 10;
// 红包数
const HONGBAO_COUNT = 3;

// 同一时间屏幕内最大油滴/红包总数量
const MAX_COUNT = 12;

// 雨滴类型
const RAIN_TYPE = [
  {
    key: "zongzi",
    size: {},
    max: 10,
    tips: "zongzi_tips",
    info: { type: "zongzi", value: 1 },
    text: "加1"
  },
  {
    key: "banana",
    size: {},
    max: 2, // 最大数量分配
    tips: "banana_tips", // 点击后反馈
    info: { type: "banana", value: 1 },
    text: "减1"
  }
  // {
  //   key: "oil-m",
  //   size: {},
  //   max: 3,
  //   tips: "get-oil-2",
  //   info: { type: "oil", value: 2 }
  // },
  // {
  //   key: "oil-b",
  //   size: {},
  //   max: 2,
  //   tips: "get-oil-5",
  //   info: { type: "oil", value: 5 }
  // }
];

function getNextX(min, max, prev) {
  if (!prev) {
    return Phaser.Math.Between(min, max);
  }
  let leftRange = [min, prev.x - packSize.width].sort((a, b) => a - b);
  let rightRange = [prev.x + packSize.width, max].sort((a, b) => a - b);
  if (leftRange[0] !== min) {
    leftRange = null;
  }
  if (rightRange[1] !== max) {
    rightRange = null;
  }
  const dropRange = [leftRange, rightRange]
    .filter(item => item !== null)
    .sort(() => {
      return Math.random() - 0.5;
    })[0];

  return Phaser.Math.Between(dropRange[0], dropRange[1]);
}

// 根据屏幕比例，计算龙舟距离底部位置
function getBoatY() {
  let present = winWidth / winHeight;
  console.log(present, "present");
  if (present > 750 / 1206) {
    return 100;
  } else if (present > 750 / 1334) {
    return 200;
  } else {
    return 250;
  }
}

class MainScene extends Phaser.Scene {
  constructor(onGetPack, height) {
    super({ key: "Main" });
    this.setOnGetPack(onGetPack);
    this.winHeight = height;
  }

  setOnGetPack(onGetPack) {
    this._onGetPack = onGetPack;
  }
  preload() {
    console.log("12esdfa3");
    for (let rain of RAIN_TYPE) {
      try {
        this.load.image(rain.key, require(`@/assets/images/dragon/${rain.key}.png`));
        // this.load.image(rain.tips, require(`@/assets/images/dragon/${rain.tips}.png`));
      } catch (e) {
        //
      }
    }

    try {
      this.load.image("paddle", require(`@/assets/images/dragon/boat.png`));
    } catch (e) {
      //
    }
  }

  create(data) {
    console.log("this", this);
    if (data.paused !== false) {
      this.scene.pause();
      return;
    }

    if (this.packGroup) {
      return;
    }

    this.paddle = this.physics.add
      .image(375, this.winHeight - getBoatY(), "paddle")
      .setImmovable()
      .setDepth(5);

    this.paddle.body.setSize(272, 40);

    // console.log(this.paddle.body, "body");

    this.maxPackY = this.sys.canvas.height;
    console.log("canvas size:", this.sys.canvas.width, this.sys.canvas.height);

    // this.packGroup = this.add.group({ maxSize: MAX_COUNT });
    this.packGroup = this.physics.add.group({ maxSize: MAX_COUNT });
    this.dropSpeed = this.maxPackY / MAX_COUNT / 30;
    this.pixelRate = 3.75 / window.devicePixelRatio;
    console.log("下落速度:", this.dropSpeed);
    console.log("补偿比:", this.pixelRate);
    // this.initPackPool();

    this.physics.add.collider(this.paddle, this.packGroup, this.colliderCb);

    let randomList = [];
    let poolList = new Array(MAX_COUNT).fill(0).map((_, index) => index);

    this.tips = {};
    for (let rain of RAIN_TYPE) {
      this.tips[`${rain.key}`] = this.add
        .text(0, 0, rain.text, {
          color: "#73b3ce",
          fontSize: "60px",
          fontStyle: "bold"
        })
        .setDepth(2)
        .setVisible(false);

      let max = rain.max;
      while (max--) {
        let rdm = Math.floor(Math.random() * poolList.length);
        let index = poolList[rdm];
        poolList.splice(rdm, 1);
        randomList[index] = rain;
      }
    }

    for (let item of randomList) {
      this.packGroup.createMultiple({
        active: false,
        visible: false,
        key: item.key,
        repeat: 0
      });
    }

    // 保存上一个掉下去的红包，计算下一个的初始化 x, 尽量不重叠
    this.prevDropPack = null;

    this.time.addEvent({
      delay: 200,
      loop: true,
      callback: () => {
        const canvasWidth = this.sys.canvas.width;

        const dropX = getNextX(0 + 50, canvasWidth - 50, this.prevDropPack);
        let pack = this.packGroup.get(dropX, 0);
        if (pack) {
          // if (this._packPool.length === 0 && pack.texture.key === 'hongbao') {
          //   this.packGroup.remove(pack);
          //   pack = this.packGroup.get(dropX, 0);
          // }
          // if (!pack) {
          //   return;
          // }
          pack
            .setActive(true)
            .setVisible(true)
            .setAlpha(0.3)
            .enableBody();
          this.tweens.add({
            targets: pack,
            alpha: 1,
            duration: 300
          });
          this.prevDropPack = pack;
        }
      }
    });

    this.input.enableDebug(this.packGroup.getChildren());

    this.input.on(
      "pointermove",
      function(pointer) {
        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
      },
      this
    );

    this.input.on(
      "pointermove",
      function(pointer) {
        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
      },
      this
    );
    this.input.on(
      "pointerdown",
      function(pointer) {
        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
      },
      this
    );
  }

  removeHongbao() {
    // this.packGroup.remove()
  }

  // 碰撞回调
  colliderCb = (boat, pack) => {
    // if (pack.texture.key === "banana") {
    this._onGetPack(pack.texture.key);
    pack.disableBody(true, false);
    this.packGroup.killAndHide(pack);

    let tips = this.tips[`${pack.texture.key}`]
      .setAlpha(1)
      .setVisible(true)
      .setPosition(pack.x, pack.y - 50);

    this.tweens.add({
      targets: tips,
      alpha: 0,
      y: tips.y - 100,
      duration: 200,
      onComplete: (_, targets) => {
        targets[0].setVisible(false);
      }
    });

    // this.tweens.add({
    //   targets: pack,
    //   alpha: 0,
    //   duration: 200,
    //   onComplete: (tw, targets) => {
    //     this.packGroup.killAndHide(pack);
    //   }
    // });
    // }
  };

  initPackPool() {
    this._packPool = new Array(HONGBAO_POOL).fill(0);
    let list = [];
    while (list.length < HONGBAO_COUNT) {
      let rdm = Math.floor(Math.random() * this._packPool.length);
      if (!list.includes(rdm)) {
        list.push(rdm);
        this._packPool[rdm] = 1;
      }
    }
    console.log(
      "红包数:",
      this._packPool.reduce((acc, item) => {
        return (acc += item);
      }, 0)
    );
  }

  getPack() {
    if (this._packPool.length < 1) {
      return 0;
    }
    let rdm = Math.floor(Math.random() * this._packPool.length);
    let res = this._packPool[rdm];
    this._packPool.splice(rdm, 1);
    console.log("是否抽中:", res);
    console.log("奖池数量:", this._packPool.length);
    return res;
  }

  updateDropSpeed() {
    this.dropSpeed *= 1.1;
  }

  update() {
    Phaser.Actions.IncXY(this.packGroup.getChildren(), 0, this.dropSpeed * (this.pixelRate || 1));
    this.packGroup.children.iterate(item => {
      if (item.y > this.maxPackY) {
        this.packGroup.killAndHide(item);
      }
    });
  }
}

const game = {
  launch: ({ parent, width, height, onGetPack }) => {
    console.log("launch");
    gameIns = new Phaser.Game({
      type: Phaser.CANVAS,
      parent: parent,
      transparent: true,
      // canvasStyle: 'width:100%', // 不要用这个属性，不兼容 ios 9
      width,
      height,
      scene: [new MainScene(onGetPack, height)],
      physics: {
        default: "arcade"
        // arcade: {
        //   debug: false,
        //   gravity: { y: 0 }
        // }
      }
      // scene: [MainScene]
    });

    gameIns.scene.start("Main", { paused: true });

    if (process.env.NODE_ENV === "development") {
      window.gameIns = gameIns;
    }
  },
  pause: () => {
    gameIns.scene.getScene("Main").scene.pause();
  },
  resume: () => {
    gameIns.scene.getScene("Main").scene.resume();
  },
  restart: () => {
    gameIns.scene.getScene("Main").scene.restart({
      paused: false
    });
  },
  updateDropSpeed() {
    gameIns.scene.getScene("Main").updateDropSpeed();
  },
  destroy: () => {
    gameIns.destroy(true);
  }
};

export default game;

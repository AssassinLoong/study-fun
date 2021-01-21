const Phaser = window.Phaser;
import logo from "@/assets/logo.png";

let canvasW, canvasH;

let group1, group2, group3, group4, groupEllipse, groupAlpha, groupSpread;
let circle1, circle2, circle3, circle4, ellipse;
let tween;

let graphics;
let rect;
let shapes;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Main" });
  }
  preload() {
    this.load.spritesheet("balls", logo, { frameWidth: 200, frameHeight: 200 });
  }
  create() {
    console.log("create Main scece");
    circle1 = new Phaser.Geom.Circle(calcVW(400), calcVW(300), calcVW(220));
    circle2 = new Phaser.Geom.Circle(calcVW(400), calcVW(300), calcVW(170));
    circle3 = new Phaser.Geom.Circle(calcVW(400), calcVW(300), calcVW(120));
    circle4 = new Phaser.Geom.Circle(calcVW(400), calcVW(300), calcVW(80));
    ellipse = new Phaser.Geom.Ellipse(calcVW(400), calcVW(300), calcVW(200), calcVW(500));

    group1 = this.add.group({ key: "balls", repeat: 30, setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) } });
    group2 = this.add.group({ key: "balls", repeat: 24, setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) } });
    group3 = this.add.group({ key: "balls", repeat: 18, setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) } });
    group4 = this.add.group({ key: "balls", repeat: 12, setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) } });
    groupEllipse = this.add.group({ key: "balls", setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) }, frameQuantity: 48 });
    groupAlpha = this.add.group({
      key: "balls",
      frame: 0,
      frameQuantity: 50,
      setXY: { x: calcVW(10), y: calcVW(10), stepX: 14 },
      setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) }
    });
    groupSpread = this.add.group({
      key: "balls",
      frame: 3,
      frameQuantity: 50,
      setXY: { x: calcVW(30), y: calcVW(30), stepX: 14 },
      setScale: { x: scaleVW(200, 0.5), y: scaleVW(200, 0.5) }
    });

    Phaser.Actions.PlaceOnCircle(group1.getChildren(), circle1);
    Phaser.Actions.PlaceOnCircle(group2.getChildren(), circle2);
    Phaser.Actions.PlaceOnCircle(group3.getChildren(), circle3);
    Phaser.Actions.PlaceOnCircle(group4.getChildren(), circle4);
    Phaser.Actions.PlaceOnEllipse(groupEllipse.getChildren(), ellipse);
    Phaser.Actions.SetAlpha(groupAlpha.getChildren(), 0, 1 / 50);
    Phaser.Actions.Spread(groupSpread.getChildren(), "alpha", 0, 1);

    tween = this.tweens.addCounter({
      from: calcVW(220),
      to: calcVW(50),
      duration: 3000,
      delay: 2000,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true
    });

    this.tweens.add({
      targets: ellipse,
      width: calcVW(700),
      height: calcVW(100),
      delay: 1000,
      duration: 2000,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true
    });

    graphics = this.add.graphics();
    shapes = new Array(15).fill(null).map(function(nul, i) {
      return new Phaser.Geom.Circle(
        Phaser.Math.Between(0, calcVW(canvasW)),
        Phaser.Math.Between(0, calcVW(canvasH)),
        Phaser.Math.Between(calcVW(25), calcVW(75))
      );
    });
    rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
  }
  update() {
    Phaser.Actions.RotateAroundDistance(group1.getChildren(), { x: calcVW(400), y: calcVW(300) }, 0.02, tween.getValue());
    // Phaser.Actions.RotateAroundDistance(group1.getChildren(), { x: calcVW(400), y: calcVW(300) }, -0.03, circle1.radius);
    Phaser.Actions.RotateAroundDistance(group2.getChildren(), { x: calcVW(400), y: calcVW(300) }, 0.025, circle2.radius);
    Phaser.Actions.RotateAroundDistance(group3.getChildren(), { x: calcVW(400), y: calcVW(300) }, -0.02, circle3.radius);
    Phaser.Actions.RotateAroundDistance(group4.getChildren(), { x: calcVW(400), y: calcVW(300) }, 0.015, circle4.radius);
    Phaser.Actions.PlaceOnEllipse(groupEllipse.getChildren(), ellipse);

    shapes.forEach(function(shape, i) {
      shape.x += 1 + 0.1 * i;
      shape.y += 1 + 0.1 * i;
    });
    Phaser.Actions.WrapInRectangle(shapes, rect, calcVW(72));
    draw();
  }
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

function draw() {
  graphics.clear();

  shapes.forEach(function(shape, i) {
    if (shape.color) {
      graphics.fillStyle(shape.color, 0.5).fillCircleShape(shape);
    } else {
      let c = color();
      graphics.fillStyle(c, 0.5).fillCircleShape(shape);
      shape.color = c;
    }
  });
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

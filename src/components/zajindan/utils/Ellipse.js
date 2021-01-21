export default class Ellipse {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  /**
   * 获取椭圆的周长
   *
   * @return {number}
   */
  circumference() {
    let rx = this.width / 2;
    let ry = this.height / 2;
    let h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);

    return Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  }
  /**
   * 根据给定的角度给出圆周上的一点
   *
   * @param {number} angle 弧度值。取值范围为 0 到 2*PI
   *
   * @return {Object} 一个包含 x/y 坐标值的对象
   */
  circumferencePoint(angle = 0) {
    const out = {
      x: 0,
      y: 0
    };

    out.x = this.x + (this.width / 2) * Math.cos(angle);
    out.y = this.y + (this.height / 2) * Math.sin(angle);

    return out;
  }
  /**
   * 返回一组圆周上的点
   *
   * @param {integer} quantity 要返回的点的数量
   * @param {number} [stepRate] 点与点之间的间隔长度
   *
   * @return {array}
   */
  getPoints(quantity, stepRate) {
    const out = [];

    if (!quantity) {
      quantity = this.circumference() / stepRate;
    }
    for (let i = 0; i < quantity; i++) {
      const angle = fromPercent(i / quantity, 0, Math.PI * 2);

      out.push(this.circumferencePoint(angle));
    }

    return out;
  }
}

/**
 * 把参考值锁定在最小值与最大值的范围内
 * @param {number} value 参考值
 * @param {number} min 最小边界值
 * @param {number} max 最大边界值
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * 在最小值与最大值的范围内，根据给定的百分比返回一个对应的值
 *
 * @param {number} percent 表示百分比的值，范围为 0 - 1
 * @param {number} min 最小值
 * @param {number} max 最大值
 *
 * @return {number}
 */
function fromPercent(percent, min, max) {
  percent = clamp(percent, 0, 1);

  return (max - min) * percent;
}

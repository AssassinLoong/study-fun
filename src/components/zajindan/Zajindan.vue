<template>
  <section class="zajindan">
    <img class="zajindan__bed"
         :src="baseImage">
    <div class="zajindan__box"
         ref="zajindanBox">
      <div class="zajindan__egg"
           v-for="(item, index) in eggList"
           :key="index"
           :style="{
              transform: `translate(${getLeft(item.point)}px, ${getTop(item.point)}px) scale(${getScale(item.point)})`,
              zIndex: `${getZIndex(item.point)}`
            }"
           @click="clickEgg(item.point)">
        <img class="zajindan__egg-img"
             :src="item.eggSrc || eggImage"
             :class="{
          'hidden': hammer_index !== -1 && hammer_index !== item.point || hammerAnimFinished === true,
        }">
        <img class="zajindan__egg-shell-1"
             :src="item.egg_shell_1 || egg_shell_1"
             v-show="hammerAnimFinished === true && hammer_index === item.point">
        <img class="zajindan__egg-shell-2"
             :src="item.egg_shell_2 || egg_shell_2"
             v-show="hammerAnimFinished === true && hammer_index === item.point">
        <img class="zajindan__hammer"
             :src="hammer"
             v-show="hammer_index === item.point"
             @animationend="hammerAnimFinished = true">
      </div>
    </div>
  </section>
</template>

<script>
import Ellipse from "./utils/Ellipse";
import loadImgs from "./utils/loadImgs";
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      lotteryIng: false, // 是否正在抽奖
      ellipse: null, // 椭圆本体
      points: [], // 需要运动的点
      pointsNumber: this.config.pointsNumber || 100, // 默认需要100个定位点
      speed: this.config.speed || 40, // 旋转速度
      eggList: [], // 金蛋列表
      baseImage: this.config.baseImage, // 金蛋底座图片
      eggImage: this.config.eggImage, // 金蛋图片
      hammer: this.config.hammer, // 锤子图片,
      egg_shell_1: this.config.egg_shell_1, // 金蛋裂开 瓣1
      egg_shell_2: this.config.egg_shell_2, // 金蛋裂开 瓣2
      moving: false, // 蛋蛋是否正在移动

      clicked_index: -1, // 被击中的蛋
      hammer_index: -1, // 当该值与某一个
      hammerAnimFinished: false // 锤子的动画是否已完成
    };
  },
  created() {
    this.preloadImgs();

    // 在这里得到父组件的批准后，开启抽奖
    // this.$on("lotteryStart", val => {
    //   console.log(val);
    //   this.goToStart();
    // });

    // 在这里得到父组件的重置通知，将一切的状态都重置好
    // this.$on("lotteryReset", val => {
    //   console.log(val);
    //   this.resetData();
    // });
  },
  mounted() {
    if (typeof this.config.eggList[0] != "object") {
      this.eggList = this.config.eggList.map(item => {
        return {
          point: item || 0,
          eggSrc: "",
          egg_shell_1: "",
          egg_shell_2: ""
        };
      });
    } else {
      this.eggList = JSON.parse(JSON.stringify(this.config.eggList));
    }

    this.initPoints();
    this.moving = true;
    this.moveEggs();
  },
  methods: {
    initPoints() {
      const box = this.$refs["zajindanBox"];

      if (!box) {
        return;
      }
      if (!box.clientWidth) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.initPoints();
          });
        }, 200);
        return;
      }

      let x = 0;
      let y = 0;
      let width = box.clientWidth;
      let height = box.clientHeight;

      this.ellipse = new Ellipse(x, y, width, height);
      this.points = this.ellipse.getPoints(this.pointsNumber).reverse();
    },
    getLeft(index) {
      const point = this.points[index];

      if (point) {
        return point.x;
      }
      return 0;
    },
    getTop(index) {
      const point = this.points[index];

      if (point) {
        return point.y;
      }
      return 0;
    },
    getScale(index) {
      const point = this.points[index];

      if (!point) {
        return 1;
      }
      return 1 + (point.y / this.ellipse.height) * 0.5;
    },
    getZIndex(index) {
      const point = this.points[index];

      if (!point) {
        return 0;
      }
      if (point.y < this.ellipse.y) {
        return 0;
      }
      if (point.y < this.ellipse.y + this.ellipse.height * 0.25) {
        return 1;
      }
      return 2;
    },
    clickEgg(index) {
      this.clicked_index = index;
      // 在这里向父组件申请抽奖
      if (this.lotteryIng) {
        console.log("正在抽奖");
        return;
      }
      this.lotteryIng = true;
      this.$emit("lotteryApply");
    },
    launchHomeLottery() {
      return new Promise((resolve, reject) => {
        // 在这里向父组件发起抽奖（请求）
        console.log("在这里向父组件发起抽奖");
        this.$emit("lotteryLaunch", { resolve, reject });
      });
    },
    goToStart() {
      if (this.hammer_index !== -1) {
        return;
      }

      this.moving = false;
      this.hammer_index = this.clicked_index;

      // Promise.all([this.launchHomeLottery()])
      //   .then(data => {
      //     // 在这里告诉父组件，抽奖的动画已经完成，可以显示结果了
      //     this.$emit("lotteryFinish", data[0]);
      //   })
      //   .catch(err => {});
      // .finally(() => {
      //   this.lotteryIng = false;
      // });
    },
    moveEggs() {
      if (!this.moving) {
        return;
      }
      this.eggList = this.eggList.map(item => {
        item.point = (item.point + 1) % this.pointsNumber;
        return item;
      });
      setTimeout(() => {
        this.$nextTick(() => {
          this.moveEggs();
        });
      }, this.speed);
    },
    resetData() {
      this.hammer_index = -1;
      this.hammerAnimFinished = false;
      this.moving = true;
      this.lotteryIng = false;
      this.moveEggs();
    },
    preloadImgs() {
      const { baseImage, eggImage, hammer, egg_shell_1, egg_shell_2, eggList } = this.config;
      let img = [];
      eggList.map(item => {
        if (item.eggSrc && img.indexOf(item.eggSrc) == -1) {
          img.push(item.eggSrc);
        }
        if (item.egg_shell_1 && img.indexOf(item.egg_shell_1) == -1) {
          img.push(item.egg_shell_1);
        }
        if (item.egg_shell_2 && img.indexOf(item.egg_shell_2) == -1) {
          img.push(item.egg_shell_2);
        }
      });

      loadImgs([baseImage, eggImage, hammer, egg_shell_1, egg_shell_2, ...img]).then(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@function relative_size($x, $vpw: 375) {
  // $x: 设计图上元素的px值；$vpw：设计图的页面宽度的px值
  @return round($x / $vpw * 10000) / 100; // 返回的值保留两位小数，既可用于 rem 尺寸，也可以用于 vw 尺寸
}

.zajindan {
  position: relative;
  height: relative_size(138) * 1rem;
  height: relative_size(138) * 1vw;
  z-index: 0;

  &__bed {
    display: block;
    width: 100%;
  }

  &__box {
    $box-width: 64%;
    position: absolute;
    left: (100% - $box-width) * 0.5;
    top: -2%;
    width: $box-width;
    height: 38%;
  }

  &__egg {
    $egg-width: 50%;
    position: absolute;
    width: $egg-width;
    left: (100% - $egg-width) * 0.5;
    top: -145%;
    transform-origin: 50% 100%;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    &-img {
      display: block;
      width: 100%;
      &.hidden {
        visibility: hidden;
      }
    }
  }

  &__egg-shell-1 {
    position: absolute;
    left: -12%;
    bottom: 8%;
    width: 60%;
    animation: eggShell1Anim 0.25s linear forwards;
  }

  &__egg-shell-2 {
    position: absolute;
    right: -12%;
    bottom: 8%;
    width: 60%;
    animation: eggShell2Anim 0.25s linear forwards;
  }

  &__hammer {
    position: absolute;
    left: 58%;
    top: -20%;
    width: 60%;
    z-index: 2;
    transform-origin: 100% 100%;
    animation: hammerAnim 0.2s ease-in forwards;
  }
}

@keyframes eggShell1Anim {
  0% {
    transform: translate(2px, -12px);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes eggShell2Anim {
  0% {
    transform: translate(-2px, -12px);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes hammerAnim {
  0% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(-15deg);
  }
}
</style>

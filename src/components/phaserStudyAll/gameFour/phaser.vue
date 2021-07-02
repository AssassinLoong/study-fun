<template>
  <div class="page bg">
    <div class="container">
      <div class="table bg"></div>
      <div class="btn_bg bg"></div>
      <div class="btn_body bg"
           @click="launchBall"></div>

      <canvas ref="canvas"></canvas>
    </div>

    <div class="dialog bg tr-xy"
         v-if="showDialog">
      <div class="text">没中奖</div>
      <div class="btn bg tr-x"
           @click="closeDialog"></div>
    </div>
  </div>
</template>

<script>
import game from "./game.js";
export default {
  components: {},
  data() {
    return {
      showDialog: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      game.launch(this.$refs.canvas, {
        width: 750, // canvas大小
        height: 1206
      });
      game._lottery = this.lottery; // 传入抽奖方法 击中福袋后调用
    });
  },
  methods: {
    launchBall() {
      game.fire(); // 发球
    },
    lottery(conf) {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      game.resetGun(); // 重置炮台 允许发球
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  background-image: url("~@/assets/images/gun/main_bg.jpg");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.container {
  width: 100%;
  height: vw(1206);
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  .table {
    background-image: url("~@/assets/images/gun/gun_table_bg.png");
    width: vw(750);
    height: vw(394);
    position: absolute;
    top: vw(680);
    z-index: -1;
  }
}

.btn_body {
  background-image: url("~@/assets/images/gun/btn_launch_top.png");
  width: vw(243);
  height: vw(101);
  position: absolute;
  top: vw(925);
  left: 50%;
  transform: translateX(-50%);
}
.btn_bg {
  background-image: url("~@/assets/images/gun/btn_launch_bottom.png");
  width: vw(257);
  height: vw(89);
  position: absolute;
  top: vw(955);
  left: 50%;
  transform: translateX(-50%);
}

.dialog {
  width: vw(606);
  height: vw(493);
  background-image: url("~@/assets/images/gun/series_day_bg.png");
  position: absolute;

  .text {
    font-size: vw(40);
    font-weight: bold;
    color: red;
    width: 100%;
    text-align: center;
    position: absolute;
    top: vw(150);
  }

  .btn {
    background-image: url("~@/assets/images/gun/btn_again.png");
    width: vw(352);
    height: vw(106);
    position: absolute;
    bottom: vw(100);
  }
}
</style>

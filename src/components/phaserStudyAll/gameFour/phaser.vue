<template>
  <div class="page bg">
    <div class="container">
      <div class="table bg"></div>
      <div class="btn_bg bg"></div>
      <div class="btn_body bg"
           @click="launchBall"></div>

      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import game from "./game.js";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      game.launch(this.$refs.canvas);
      game.count = 2;
    });
  },
  methods: {
    launchBall() {
      game.fire();
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
</style>

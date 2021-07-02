<template>
  <div class="enter_bg bg">
    <div class="container">
      <div class="title bg tr-x"></div>
      <div class="home_dragon bg" />
      <div class="tips tr-x">
        <div class="tip_text">左右滑动盘子接粽子</div>
        <div class="tip_text">接到<span class="red">30个</span>即算挑战成功哦</div>
      </div>
      <div class="btn-join bg tr-x"
           @click="join">
        <div class="count_bg bg">2次机会</div>
      </div>
      <div class="btn-give-up tr-x"
           @click="giveUp">返回首页></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // ct: () => import("./Center")
  },
  methods: {
    join() {
      this.$emit("join");
    },
    giveUp() {
      this.$emit("give-up");
    }
  }
};
</script>

<style lang="scss" scoped>
.enter_bg {
  position: relative;
  @include bg("images/dragon/home_bg.png");
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.container {
  position: absolute;
  width: 100%;
  height: vw(1206);
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  position: absolute;
  @include bg("images/dragon/home_title.png");
  top: vw(-65);
  z-index: 2;
  transform-origin: left;

  @media (min-aspect-ratio: 750 / 1334) {
    top: vw(-20);
  }
  @media (min-aspect-ratio: 750 / 1206) {
    top: vw(20);
  }
}
.home_dragon {
  position: absolute;
  @include bg("images/dragon/home_bg_dragon.png");
  top: vw(30);
  left: 0;
  // z-index: 1;
  transform-origin: center;

  @media (min-aspect-ratio: 750 / 1334) {
    top: vw(40);
  }
  @media (min-aspect-ratio: 750 / 1206) {
    top: vw(50);
  }
}
.tips {
  position: absolute;
  width: vw(436);
  height: vw(90);
  top: vw(880);
  background-color: rgba(225, 253, 255, 0.8);
  border-radius: vw(10);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-aspect-ratio: 750 / 1334) {
    top: vw(860);
  }
  @media (min-aspect-ratio: 750 / 1206) {
    top: vw(840);
  }

  &::after {
    content: "";
    border: vw(13) solid transparent;
    border-top: vw(18) solid rgba(225, 253, 255, 0.8);
    position: absolute;
    top: vw(88);
  }

  .tip_text {
    font-size: vw(26);
    line-height: vw(34);
  }
  .red {
    color: rgb(229, 58, 44);
  }
}
.btn-join {
  position: absolute;
  @include bg("images/dragon/home_join_btn.png");
  top: vw(998);

  @media (min-aspect-ratio: 750 / 1334) {
    top: vw(978);
  }
  @media (min-aspect-ratio: 750 / 1206) {
    top: vw(958);
  }

  .count_bg {
    @include bg("images/dragon/home_count_bg.png");
    position: absolute;
    top: vw(-20);
    right: 0;
    font-size: vw(24);
    color: #1c555f;
    text-align: center;
  }
}
.btn-give-up {
  position: absolute;
  font-size: vw(31);
  font-weight: bold;
  color: #1c555f;
  bottom: vw(0);
  text-align: center;
  opacity: 0.8;
  width: vw(240);
  text-decoration: underline;
  letter-spacing: vw(3);
  box-sizing: border-box;
  padding: vw(10) vw(30);
  text-underline-offset: vw(5);

  @media (min-aspect-ratio: 750 / 1334) {
    bottom: vw(20);
  }
  @media (min-aspect-ratio: 750 / 1206) {
    bottom: vw(40);
  }
}
</style>

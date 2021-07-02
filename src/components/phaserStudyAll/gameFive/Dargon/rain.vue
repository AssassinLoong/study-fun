<template>
  <div class="game_bg bg">
    <!-- <div class="info-wraps oil-info bg">{{ oil }}ml</div>
    <div class="info-wraps hongbao-info bg">{{ pack }}个</div>
    <div class="info-wraps time-info bg">
      <timer :paused="paused"
             ref="timer"
             :inited="handleInit"
             @end="handleEnd">
        <template v-slot="timeInfo">
          <span>{{ timeInfo.second }}.{{ timeInfo.ms | msStr }}S</span>
        </template>
      </timer>
    </div> -->
    <div class="info_box">
      <div class="time_info">
        <timer :paused="paused"
               ref="timer"
               :inited="handleInit"
               @end="handleEnd">
          <template v-slot="timeInfo">
            <span>{{ timeInfo.second }}</span>
            <span v-if="timeInfo.second<10">.{{ timeInfo.ms | msStr }}</span>
            <span class="small">秒</span>
          </template>
        </timer>
      </div>
      <div class="zongzi_info bg">
        <div class="count_box">
          <div class="count_bg">{{ (zongzi+'').split('').reverse()[2] || 0 }}</div>
          <div class="count_bg">{{ (zongzi+'').split('').reverse()[1] || 0 }}</div>
          <div class="count_bg">{{ (zongzi+'').split('').reverse()[0] || 0 }}</div>
        </div>
      </div>
    </div>

    <div ref="rain"
         class="rain-container"></div>
    <!-- <div class="btn-give-up"
         @click="handlePause">退出先不玩了</div> -->
    <div class="confirm-wrap bg tr-xy"
         v-show="showConfirm">
      <div class="btn-cancel bg"
           @click="handleResume"></div>
      <div class="btn-confirm bg"
           @click="handleEnd"></div>
    </div>
  </div>
</template>

<script>
import game from "./game";

const PACK_VALUE = {
  zongzi: +1,
  banana: -1
};

export default {
  components: {
    timer: () => import("./Timer")
  },
  filters: {
    msStr(num) {
      return num.toString()[0];
    }
  },
  data() {
    return {
      paused: false,
      zongzi: 0,
      showConfirm: false,
      ended: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleResume() {
      if (!this.paused) {
        return;
      }
      this.paused = false;
      this.showConfirm = false;
      game.resume();
    },
    handlePause() {
      if (this.ended || this.paused) {
        return;
      }
      this.paused = true;
      game.pause();
      this.showConfirm = true;
    },
    async handleInit() {
      setTimeout(() => {
        this.$refs[`timer`].start(10 * 1000);
        game.restart();

        // window.updateSpeedTimer && clearInterval(window.updateSpeedTimer);
        // window.updateSpeedTimer = setInterval(() => {
        //   game.updateDropSpeed();
        // }, 1000);
      }, 500);
    },
    handleEnd() {
      if (this.ended) {
        return;
      }
      this.ended = true;
      this.showConfirm = false;
      game.pause();
      this.$emit("end", {
        zongzi: this.zongzi
      });
    },
    init() {
      const width = 750;
      const height = this.$refs.rain.clientHeight / (window.innerWidth / width);

      game.launch({
        parent: this.$refs.rain,
        width,
        height,
        onGetPack: key => {
          this.getPack(key);
        }
      });
    },
    getPack(key) {
      (this.zongzi += PACK_VALUE[key]) < 0 && (this.zongzi = 0);
    }
  },
  beforeDestroy() {
    game.destroy();
  }
};
</script>

<style lang="scss" scoped>
.game_bg {
  @include bg("images/dragon/game_bg.png");
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.info-wraps {
  position: fixed;
  top: vw(100);
  font-size: vw(28);
  color: white;
  text-align: center;
  box-sizing: border-box;
  padding-top: vw(28);
  padding-left: vw(70);
  padding-right: vw(10);
}
.oil-info {
  @include bg("images/hongbao/oil-info.png");
  left: vw(-342+375);
  padding-top: vw(30);
}
.hongbao-info {
  @include bg("images/hongbao/hongbao-info.png");
  left: vw(-147+375);
}
.time-info {
  @include bg("images/hongbao/time-info.png");
  left: vw(165+375);
  padding-top: vw(30);
}
.info_box {
  position: absolute;
  width: 100%;
  top: vw(224);
  padding: 0 vw(40);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-aspect-ratio: 750 / 1334) {
    top: vw(194);
  }
  @media (min-aspect-ratio: 750 / 1206) {
    top: vw(164);
  }

  .time_info {
    width: vw(113);
    height: vw(113);
    // position: absolute;
    // top: vw(224);
    border-radius: 50%;
    background-color: rgb(255, 242, 140);
    border: vw(2) solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: vw(49);
    font-weight: bold;
    color: rgb(110, 110, 110);

    .small {
      font-size: vw(29);
    }
  }

  .zongzi_info {
    @include bg("images/dragon/zongzi_info_bg.png");
    position: relative;
  }

  .count_box {
    width: vw(236);
    height: 100%;
    position: absolute;
    left: vw(125);
    padding: 0 vw(20);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .count_bg {
      width: vw(56);
      height: vw(85);
      background: linear-gradient(to bottom, #fff, #fff 50%, rgb(200, 233, 203) 50%);
      border-radius: vw(20);
      line-height: vw(85);
      text-align: center;
      font-size: vw(56);
      font-weight: bold;
      color: rgb(232, 108, 93);
    }
  }
}

.btn-give-up {
  position: fixed;
  font-size: vw(30);
  color: white;
  text-decoration: underline;
  box-sizing: border-box;
  width: vw(300);
  padding: vw(10) vw(30);
  left: vw((750-300)/2);
  bottom: vw(100);
  text-align: center;
  letter-spacing: vw(2);
  text-underline-offset: vw(5);
}
.confirm-wrap {
  position: absolute;
  @include bg("images/hongbao/confirm-wrap.png");
  // left: vw(-589/2);
  // top: vw(-220);
  .btn- {
    &cancel,
    &confirm {
      position: absolute;
      top: vw(210);
    }
    &cancel {
      left: vw(50);
      @include bg("images/hongbao/btn-cancel.png");
    }
    &confirm {
      right: vw(50);
      @include bg("images/hongbao/btn-confirm.png");
    }
  }
}
</style>
<style lang="scss">
.rain-container {
  position: fixed;
  height: 100%;
  // top: vw(200);
  left: 0;
  right: 0;
  // bottom: vw(200);
  & canvas {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div>
    <section v-if="!isEmpty">
      <div class="result-title">恭喜您获得了</div>
      <div class="prize-info">
        <div class="oil-info"
             v-if="result.oil > 0">
          <div class="icon-oil bg"></div>
          <div class="oil-text">{{ result.oil }}mL油量</div>
        </div>
        <div class="hongbao-info"
             v-if="result.pack > 0 && result.prize && result.prize.is_won">
          <div class="icon-hongbao bg"></div>
          <div class="hongbao-text">{{ result.pack }}个红包共{{ money }}元</div>
        </div>
      </div>
      <div class="ser-id"
           v-if="result.pack > 0 && result.prize && result.prize.is_won">
        {{ result.prize.serial_number }}
      </div>
      <div class="tips prize-tips">*所获红包请在【我的奖品】中查看</div>
      <div class="result-prize bg"></div>
    </section>
    <section v-else>
      <div class="result-title empty-title">很遗憾</div>
      <div class="pity-text">没有获得任何奖励</div>
      <div class="result-empty bg"></div>
    </section>
    <div class="tips event-tips">每周一上午9:00-10:00可参与 期待再次来玩哟</div>
    <div class="btn-ok bg"
         @click="handleOk"></div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => ({
        oil: 0,
        pack: 0,
        prize: { is_won: false, prize_name: "", prize_type: "" }
      })
    }
  },
  data() {
    return {};
  },
  computed: {
    isEmpty() {
      return !this.result.oil && !this.result.pack;
    },
    money() {
      if (!this.result.prize || !this.result.prize.is_won || this.result.prize.prize_type !== "HONGBAO") {
        return "";
      }
      try {
        let res = this.result.prize.prize_name.match(/[0-9\\.]+/)[0];
        if (res) {
          return res;
        }
      } catch (e) {
        //
      }
      return "";
    }
  },
  methods: {
    handleOk() {
      this.$emit("ok");
    }
  }
};
</script>

<style lang="scss" scoped>
.result-title {
  position: absolute;
  font-size: vw(68);
  text-align: center;
  width: vw(750);
  left: vw(-750/2);
  top: vw(-400);
  color: white;
}
.empty-title {
  top: vw(-300);
}
.prize-info {
  position: absolute;
  width: vw(406);
  height: vw(162);
  top: vw(-288);
  left: vw(-406/2);
  background-image: linear-gradient(to right bottom, #291c5d 0, #582272 100%);
  border: 2px solid white;
  border-radius: vw(10);
  z-index: 2;
  box-sizing: border-box;
  padding: vw(20) vw(40);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: vw(36);
  color: white;
  text-align: left;

  .oil-info,
  .hongbao-info {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: vw(36);
    color: white;
    text-align: left;
    margin: vw(8) 0;
    white-space: nowrap;
  }
  .oil-info {
  }
  .hongbao-info {
  }

  .icon- {
    &oil,
    &hongbao {
      margin-right: vw(20);
    }
    &oil {
      @include bg("images/hongbao/icon-oil.png");
    }
    &hongbao {
      @include bg("images/hongbao/icon-hongbao.png");
    }
  }
}
.result-prize {
  position: absolute;
  @include bg("images/hongbao/result-prize.png");
  left: vw(-614/2);
  top: vw(-303);
}
.result-empty {
  position: absolute;
  @include bg("images/hongbao/result-pity.png");
  left: vw(-614/2);
  top: vw(-303);
}
.tips {
  position: absolute;
  width: vw(750);
  left: vw(-750/2);
  font-size: vw(25);
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
}
.prize-tips {
  top: vw(230);
}
.event-tips {
  top: vw(425);
}
.btn-ok {
  position: absolute;
  left: vw(-310/2);
  top: vw(290);
  @include bg("images/hongbao/btn-ok.png");
}
.pity-text {
  font-size: vw(36);
  color: white;
  position: absolute;
  width: vw(750);
  top: vw(-200);
  left: vw(-750/2);
  text-align: center;
}
.ser-id {
  position: absolute;
  width: vw(750);
  text-align: center;
  font-size: vw(18);
  left: vw(-750/2);
  top: vw(265);
  color: white;
  opacity: 0.5;
}
</style>

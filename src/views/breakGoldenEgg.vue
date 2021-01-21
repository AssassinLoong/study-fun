<template>
  <div class="test-conponent">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <zajindan class="zajindan"
              :config="config"
              @lotteryApply="lotteryApply"
              ref="zajindan"></zajindan>
    <div v-show="textMaskShow"
         class="mask">
      {{text}}
    </div>
  </div>
</template>

<script>
import zajindan from "@/components/zajindan/Zajindan.vue";
export default {
  components: {
    zajindan
  },
  data() {
    return {
      config: {
        pointsNumber: 100, // 定位点个数
        speed: 40, // 转动速度
        baseImage: require(`@/components/zajindan/assets/base_zajindan.png`), // 金蛋底座图片
        eggImage: require(`@/components/zajindan/assets/egg.png`), // 金蛋图片
        hammer: require(`@/components/zajindan/assets/hammer.png`), // 锤子图片
        egg_shell_1: require(`@/components/zajindan/assets/egg_shell_1.png`), // 金蛋裂开 瓣1
        egg_shell_2: require(`@/components/zajindan/assets/egg_shell_2.png`), // 金蛋裂开 瓣2
        // eggList: [0, 34, 67]
        eggList: [
          {
            point: 0, // 金蛋1 的定位
            eggSrc: require(`@/components/zajindan/assets/hammer.png`), // 金蛋图片单独配置
            egg_shell_1: require(`@/components/zajindan/assets/egg.png`),
            egg_shell_2: require(`@/components/zajindan/assets/egg.png`)
          },
          {
            point: 34
          },
          {
            point: 67
          }
        ]
      },
      textMaskShow: false,
      text: ""
    };
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    lotteryApply() {
      this.$refs.zajindan.goToStart();
      this.lotteryLaunch();
    },
    lotteryLaunch() {
      this.text = "发抽奖请求";
      this.textMaskShow = true;

      setTimeout(() => {
        this.textMaskShow = false;
        this.$refs.zajindan.resetData();
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.test-conponent {
  height: 100vh;

  .zajindan {
    position: relative;
    top: 40%;
  }

  .mask {
    position: absolute;
    width: 150px;
    height: 150px;
    line-height: 150px;
    background-color: rgba(00, 00, 00, 0.7);
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
  }

  .go-back {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    color: #f56c6c;
    padding-top: 20px;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>

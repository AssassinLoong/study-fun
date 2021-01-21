<template>
  <div class="phaser_style">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <PhaserPoint class="phaser-box"></PhaserPoint>
  </div>
</template>

<script>
import PhaserPoint from "@/components/phaserStudyAll/phaserPoint";
export default {
  components: {
    PhaserPoint
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="scss" scoped>
.phaser_style {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .phaser-box {
    flex: 1;
  }

  .go-back {
    display: inline-block;
    position: relative;
    color: #f56c6c;
    padding-top: 20px;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>


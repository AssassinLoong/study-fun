<template>
  <div class="phaser_style">
    <div class="header"
         :class="{'hidden_header': !showNav}">
      <div class="go-back"
           @click="goBack">返回首页</div>
      <div class="nav"
           @click="handleNav">{{ showNav ? '隐藏导航' : '显示导航' }}</div>
    </div>

    <PhaserPoint class="phaser-box"
                 :showNav="showNav"></PhaserPoint>
  </div>
</template>

<script>
import PhaserPoint from "@/components/phaserStudyAll/phaserPoint";
export default {
  components: {
    PhaserPoint
  },
  data() {
    return {
      showNav: false
    };
  },
  mounted() {},
  methods: {
    handleNav() {
      this.showNav = !this.showNav;
    },
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

  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    z-index: 999;
  }

  .hidden_header {
    position: fixed;
    top: 0;
  }

  .nav {
    color: lightgreen;
    cursor: pointer;
    margin-left: 40px;
  }

  .go-back {
    position: relative;
    color: #f56c6c;
    font-weight: 600;
    cursor: pointer;
  }

  .phaser-box {
    flex: 1;
  }
}
</style>


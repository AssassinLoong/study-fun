<template>
  <div class="hongbao-page">
    <div class="hongbao-bg bg"></div>
    <!-- <ct> -->
    <entry @join="handleJoin"
           @give-up="handleGiveUp"
           v-if="!joined && !ended" />
    <rain v-if="joined && !ended"
          @end="handleEnd" />
    <result :result="result"
            v-if="ended"
            @ok="handleResultOk"></result>
    <!-- </ct> -->
  </div>
</template>

<script>
export default {
  components: {
    // ct: () => import("./Center"),
    entry: () => import("./entry"),
    rain: () => import("./rain"),
    result: () => import("./result")
  },
  data() {
    return {
      joined: false,
      ended: false,
      result: {
        zongzi: 0,
        prize: {}
      },
      giveUp: false
    };
  },
  methods: {
    handleJoin() {
      this.joined = true;
    },
    async handleEnd(data) {
      // this.ended = true;
      this.joined = false;
      this.ended = false;

      console.log(data, "zongzi");

      this.$emit("result-ok");
    },
    async handleGiveUp() {
      if (this.giveUp) {
        return;
      }
      this.giveUp = true;
      this.$emit("give-up");
    },
    handleResultOk() {
      this.$emit("result-ok");
    }
  }
};
</script>

<style lang="scss" scoped>
.hongbao-page {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.hongbao-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(to bottom, #1a1138 0, #421213 100%);
  opacity: 0.9;
}
</style>

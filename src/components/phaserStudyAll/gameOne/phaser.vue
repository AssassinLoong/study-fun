<template>
  <div class="contain" ref="gameParent"></div>
</template>

<script>
import game from "./game";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      let width = this.$refs.gameParent.clientWidth;
      let height = this.$refs.gameParent.clientHeight;
      // const height = (750 / 7.5 / 100) * window.innerWidth;
      let size = Math.min(width, height);
      game.launch({ parent: this.$refs.gameParent, width: size, height: size });
    });
  },
  methods: {},
  beforeDestroy() {
    game.destroy();
  }
};
</script>
<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
}
</style>

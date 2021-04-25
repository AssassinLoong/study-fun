<template>
  <div>
    <canvas ref="canvas"></canvas>

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
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>

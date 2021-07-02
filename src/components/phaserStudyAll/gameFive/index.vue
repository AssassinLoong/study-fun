<!--
* @Author: 兜兜
* @Description: XXX
-->
<template>
  <div class=''>
    <Dargon @give-up="giveUpRedpackRain"
            @result-ok="redpackEnd" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    Dargon: () => import("./Dargon/index")
  },
  mounted() {},
  methods: {
    giveUpRedpackRain() {
      console.log("123");
    },
    redpackEnd() {
      console.log("1235");
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
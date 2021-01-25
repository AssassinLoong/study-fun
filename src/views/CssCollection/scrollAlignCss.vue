<template>
  <div class="scroll-align-css">

    <div class="tips">css自动对齐 + js生成颜色</div>

    <div class="container both-scroll both-mandatory">
      <div class="wrapper">
        <div class="element"
             ref="element"
             v-for="item in 9"
             :key="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.element.map(el => {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        el.style.background = "#" + randomColor;
      });
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.scroll-align-css {
  width: 900px;
  height: 100%;
  margin: 0 auto;

  .container {
    width: 500px;
    height: 500px;
    margin: 20px auto;
    border: 2px solid #333;
    overflow: auto;
    position: relative;

    -webkit-overflow-scrolling: touch;
    scroll-snap-type: mandatory;
    scroll-snap-points-y: repeat(300px);
    scroll-snap-points-x: repeat(300px);
  }

  .element {
    width: 300px;
    height: 300px;
    scroll-snap-stop: normal;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    scroll-snap-align: center;
    // scroll-snap-align: start;
    // scroll-snap-align: end;
    // scroll-snap-align: none;
  }
  .element code {
    font-size: 13px;
  }

  .both-mandatory {
    scroll-snap-type: both mandatory;
  }

  .wrapper {
    width: 620px;
    height: 100%;
    display: grid;
    grid-template-columns: 300px 300px 300px;
    grid-template-rows: 300px 300px 300px;
    grid-gap: 10px;
    padding: 100px 1000px 1000px 100px; /* To give more space to scroll */
    // padding: 100px; /* To give more space to scroll */
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

  .tips {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: gray;
  }
}
</style>

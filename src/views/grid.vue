<template>
  <div class="grid">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <div class="container">
      <div v-for="(item,index) in 9"
           :key="index"
           :class="`color_${item}`">
        {{item}}
      </div>
    </div>

    <div class="snowflake"
         v-for="(item, index) in 50"
         :key="index"></div>
  </div>
</template>

<script>
export default {
  components: {},
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
.grid {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: linear-gradient(#123, #111);
  position: relative;
  overflow: hidden;
}

.container {
  margin-top: vw(50);
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  grid-gap: 1px 1px; // 间隔
  // 区域
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i";
  grid-auto-flow: row; // dense: 尽量填满空格
  // justify-items: start; // 单元格内容的定位
  // align-items: end;
  justify-content: center; // 整个内容区域在容器里面的水平位置
  grid-auto-rows: 100px;

  @for $i from 1 through 9 {
    .color_#{$i} {
      font-size: 2em;
      text-align: center;
      border: 1px solid #e5e4e9;
      background-color: hsl(0 + $i * 40, 100%, 80%);
    }
  }

  .color_1 {
    // grid-column-start: 2;
    // grid-column-end: 4;
    // grid-column-start: 1;
    // grid-column-end: 3;
    // grid-row-start: 2;
    // grid-row-end: 4;

    grid-area: e;
    justify-self: center; // 只作用于单个单元格
    align-self: center;
    // grid-area: 2/2/2/2;
  }
  // .color_2 {
  //   grid-column-start: 1;
  //   grid-column-end: 3;
  // }
  // .color_8 {
  //   grid-column-start: 2;
  //   grid-row-start: 4;
  // }
  // .color_9 {
  //   grid-column-start: 3;
  //   grid-row-start: 5;
  // }
}

.snowflake {
  --size: 1vw;
  width: var(--size);
  height: var(--size);
  background: white;
  border-radius: 50%;
  position: absolute;
  top: -5vh;
}

@keyframes snowfall {
  0% {
    transform: translate3d(var(--left-ini), 0, 0);
  }
  100% {
    transform: translate3d(var(--left-end), 110vh, 0);
  }
}

@for $i from 1 through 50 {
  .snowflake:nth-child(#{$i}) {
    --size: #{random(5) * 0.2}vw;
    --left-ini: #{random(20) - 10}vw;
    --left-end: #{random(20) - 10}vw;
    left: #{random(100)}vw;
    animation: snowfall #{5 + random(10)}s linear infinite;
    animation-delay: -#{random(10)}s;
  }
}

/* added small blur every 6 snowflakes*/
.snowflake:nth-child(6n) {
  filter: blur(1px);
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
</style>

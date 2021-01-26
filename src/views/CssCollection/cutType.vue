<template>
  <div class="cut_type"
       @mousedown="mousedown"
       @mouseup="mouseup"
       @mousemove="mousemove">
    <div class="desc">在竖直方向上超出容器会被裁剪，而在水平方向上超出容器，则不会被裁剪</div>
    <div class="box_1">
      <div class="g-container bg"></div>
      <div class="g-container clip"
           style="z-index: 1">
        <div class="move"
             ref="move"
             style="position:absolute; width:100px; height:100px; background:gray"></div>
      </div>
      <div class="g-container bg2"></div>
    </div>
    <div class="box_2">
      <div class="square"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dragging: false,
      tLeft: 0,
      tTop: 0
    };
  },
  mounted() {},
  methods: {
    mousedown(e) {
      console.log("down", e);
      if (e.target == this.$refs.move) {
        this.dragging = true; //激活拖拽状态
        var moveElemRect = this.$refs.move.getBoundingClientRect();
        this.tLeft = e.clientX - moveElemRect.left; //鼠标按下时和选中元素的坐标偏移:x坐标
        this.tTop = e.clientY - moveElemRect.top; //鼠标按下时和选中元素的坐标偏移:y坐标
      }
    },
    mouseup(e) {
      this.dragging = false;
      console.log("up");
    },
    mousemove(e) {
      if (this.dragging) {
        var moveX = e.clientX - this.tLeft,
          moveY = e.clientY - this.tTop;

        this.$refs.move.style.left = moveX + "px";
        this.$refs.move.style.top = moveY + "px";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cut_type {
  width: 100%;
  height: 100%;
  // position: relative;

  .desc {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: #888;
  }

  .box_1 {
    height: 200px;
    padding-top: 100px;
    background: #fff;
    display: flex;
    justify-content: space-around;

    .g-container {
      width: 200px;
      height: 200px;
      margin: auto;
      background: #fc0;
      clip-path: polygon(-1000% 0, 1000% 0, 1000% 100%, -1000% 100%);
    }

    .bg {
      margin-top: -40px;
      background: #0f699e;
    }
    .bg2 {
      background: #0f699e;
      margin-top: 40px;
    }
  }

  .box_2 {
    margin-top: 200px;
    width: 200px;
    height: 200px;
    background: #62374e;
    // border: 20px dashed #fdc57b;
    display: flex;
    align-items: center;
    justify-content: center;
    // clip-path: polygon(0 50px, 100% 50px, 100% 150px, 0 150px);

    .square {
      border: 30px dashed #fdc57b;
      width: 150px;
      height: 150px;
      clip-path: polygon(0 30px, 100% 30px, 100% 120px, 0 120px);
    }
  }
}
</style>

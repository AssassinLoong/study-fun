<template>
  <div class="perspective">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <div class="phantom">
      <div class="dot"
           :class="`index-${item}`"
           v-for="item in 20"
           :key="item"><br></div>
    </div>
    <div class="flex-body">
      <div class="container">
        <div class="square enlarge"></div>
      </div>
      <div class="container">
        <div class="square flip"></div>
      </div>
      <div class="container">
        <div class="square swing"></div>
      </div>
    </div>
    <div class="cube-container">
      <div class="cube">
        <div class="side front"></div>
        <div class="side back"></div>
        <div class="side left"></div>
        <div class="side right"></div>
        <div class="side top"></div>
        <div class="side bottom"></div>
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
  mounted() {},
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="scss" scoped>
.perspective {
  width: 900px;
  margin: 0 auto;
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

.phantom {
  width: 300px;
  height: 100px;
  position: relative;
  margin: 100px auto;
  border-radius: 50px;
  border: 3px dotted #eee;
  text-align: center;
  font-family: sans-serif;
  padding-top: 10px;

  .dot {
    position: absolute;
    background: #f56c6c;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transform: rotate(0deg);
    top: 25px;
    left: 25px;
    opacity: 0.1;
    transition: all 0.75s cubic-bezier(0.71, 0, 0.33, 1.56) 0ms;
    content: "";
  }

  &:hover {
    .dot {
      transform: rotate(360deg);
      border-radius: 0%;
      left: 225px;
      background: #409eff;
    }
  }

  @for $i from 1 through 20 {
    .index-#{$i} {
      transition-delay: (3ms * ($i - 1));
    }
  }
}

.flex-body {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .container {
    border: 1px solid #fff;
    border-radius: 4px;
    perspective: 240px;
  }

  .square {
    width: 100px;
    height: 100px;
    background-color: green;
  }

  .enlarge {
    animation: moveOnZ 2s infinite ease-in-out alternate;
  }

  .flip {
    animation: rotateOnX 4s infinite linear;
  }

  .swing {
    animation: moveSquare 4s infinite ease-in-out alternate;
    transform: rotateY(90deg);
  }

  @keyframes moveSquare {
    from {
      transform: translateX(-100px) rotateY(90deg);
    }
    to {
      transform: translateX(100px) rotateY(90deg);
    }
  }

  @keyframes rotateOnX {
    to {
      transform: rotateX(360deg);
    }
  }

  @keyframes moveOnZ {
    from {
      transform: translateZ(-50px);
    }
    to {
      transform: translateZ(50px);
    }
  }
}

.cube-container {
  margin: 20px auto 0;
  width: 400px;
  height: 400px;
  border: 2px solid white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 800px;
  perspective-origin: 50% 50%;

  .cube {
    position: relative;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    animation: cubeRotate 10s linear infinite;
  }

  .side {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    border: 2px solid white;
  }

  .front {
    background-color: #d50000;
    transform: translateZ(100px);
  }
  .back {
    background-color: #aa00ff;
    transform: translateZ(-100px);
  }

  .left {
    background-color: #304ffe;
    transform: rotateY(90deg) translateZ(100px);
  }
  .right {
    background-color: #0091ea;
    transform: rotateY(-90deg) translateZ(100px);
  }

  .top {
    background-color: #00bfa5;
    transform: rotateX(90deg) translateZ(100px);
  }
  .bottom {
    background-color: #64dd17;
    transform: rotateX(-90deg) translateZ(100px);
  }

  @keyframes cubeRotate {
    from {
      transform: rotateY(0deg) rotateX(720deg) rotateZ(0deg);
    }
    to {
      transform: rotateY(360deg) rotateX(0deg) rotateZ(360deg);
    }
  }
}
</style>


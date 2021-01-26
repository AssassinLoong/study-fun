<template>
  <div class="border_anims">
    <div class="box_1"></div>
    <div class="box_2"></div>
    <div class="box_3"></div>
    <div class="box_4"></div>
    <div class="box_5">
      <div class="text">转啊转<br>指我发现秘密</div>
    </div>
    <div class="box_6"></div>
    <div class="box_7"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
$borderColor: #03a9f3;
.border_anims {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & > div {
    margin: 20px;
  }
  .box_1 {
    width: 200px;
    height: 100px;
    position: relative;
    border: 1px solid #03a9f3;
    cursor: pointer;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      transition: all 0.5s linear;
    }
    &::before {
      top: -5px;
      left: -5px;
      border-top: 1px solid $borderColor;
      border-left: 1px solid $borderColor;
    }

    &::after {
      right: -5px;
      bottom: -5px;
      border-bottom: 1px solid $borderColor;
      border-right: 1px solid $borderColor;
    }

    &:hover::before,
    &:hover::after {
      width: calc(100% + 9px);
      height: calc(100% + 9px);
    }
  }
  .box_2 {
    width: 200px;
    height: 100px;
    position: relative;
    border: 1px solid #333;
    transition: border 0.5s linear;

    &:hover {
      border: none;
      background: linear-gradient(90deg, red 50%, transparent 0) repeat-x, linear-gradient(90deg, rgb(0, 174, 255) 50%, transparent 0) repeat-x,
        linear-gradient(0deg, green 50%, transparent 0) repeat-y, linear-gradient(0deg, rgb(155, 153, 33) 50%, transparent 0) repeat-y;
      background-size: 4px 2px, 4px 2px, 2px 4px, 2px 4px;
      background-position: 0 0, 0 100%, 0 0, 100% 0;
      animation: linearGradientMove 0.3s infinite linear;
    }

    @keyframes linearGradientMove {
      100% {
        background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
      }
    }
  }
  .box_3 {
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background-repeat: no-repeat;
      background-size: 50% 50%, 50% 50%;
      background-position: 0 0, 100% 0, 100% 100%, 0 100%;
      background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
      animation: rotate 4s linear infinite;
    }
    &::before {
      content: "";
      position: absolute;
      width: 95%;
      height: 95%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      z-index: 1;
    }

    &:hover::before {
      opacity: 0.5;
    }
  }
  .box_4 {
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;
    background-color: rgb(52, 77, 83);
    opacity: 0.8;
    &::after {
      content: "";
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
      animation: rotate 4s linear infinite;
    }
    &::before {
      content: "";
      position: absolute;
      width: 95%;
      height: 95%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #222;
      z-index: 1;
    }

    &:hover::after {
      z-index: 2;
    }
  }
  .box_5 {
    position: relative;
    width: 200px;
    height: 150px;
    cursor: pointer;
    line-height: 150px;

    .text {
      display: inline-block;
      width: 100%;
      // height: 100%;
      text-align: center;
      vertical-align: middle;
      line-height: 20px;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 3px solid gold;
      border-radius: 25px;
      animation: clippath 3s infinite linear;
    }

    &::after {
      animation: clippath 3s infinite -1.5s linear;
    }

    &:hover::before,
    &:hover::after {
      background: rgba(255, 215, 0, 0.5);
    }
  }
  .box_6 {
    width: 200px;
    height: 100px;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 4px;
      bottom: 4px;
      right: 4px;
      left: 4px;
      background: #67c23a;
      border: 2px solid #fff;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: -20px;
      left: 0px;
      background: #67c23a;
      //border-radius: 50%;
      transform: rotateZ(-90deg) translate(-100%, -100%);
      transform-origin: top left;
      transition: transform 0.3s;
      transition-timing-function: linear;
    }

    &:hover::before {
      transform: rotateZ(0deg) translate(0%, -0%);
    }
  }
  .box_7 {
    width: 200px;
    height: 100px;
    border: 5px solid;
    border-image: linear-gradient(135deg, gold, deeppink) 1;
    clip-path: inset(0px round 5px);
    animation: huerotate 6s infinite linear;
    filter: hue-rotate(360deg);

    @keyframes huerotate {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(360deg);
      }
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 95% 0);
  }
  25% {
    clip-path: inset(0 95% 0 0);
  }
  50% {
    clip-path: inset(95% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 95%);
  }
}
</style>

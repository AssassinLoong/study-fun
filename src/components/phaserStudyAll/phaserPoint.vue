<template>
  <div class="phaser-point" ref="phaser_point">
    <div class="aside">
      <button class="title-link" v-for="(item, index) in routerList" :key="index"
        @click="(e)=>turnToLink(e, item)">{{ item.mate.label }}
      </button>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import { phaserChild } from "@/router";

export default {
  components: {},
  data() {
    return {
      routerList: phaserChild
    };
  },
  mounted() {
    let winw = window.innerWidth;
    let winh = window.innerHeight;
    let isColumn = winw < winh;
    isColumn ? (this.$refs.phaser_point.style["flex-direction"] = "column") : (this.$refs.phaser_point.style["flex-direction"] = "");
  },
  methods: {
    turnToLink(e, data) {
      let button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
      circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
      circle.classList.add("ripple");
      const ripple = button.getElementsByClassName("ripple")[0];
      if (ripple) {
        ripple.remove();
      }
      button.appendChild(circle);
      setTimeout(() => {
        this.$router.push({ name: data.name });
        console.log(data);
      }, 300);
    }
  }
};
</script>
<style lang="scss" scoped>
// 字体
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.phaser-point {
  display: flex;
  // flex-direction: column;
  width: 100%;
  height: 100%;

  .aside {
    width: 150px;
    height: auto;
    max-height: 800px;
    text-align: center;
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;

    .title-link {
      position: relative;
      overflow: hidden;
      color: #fff;
      background-color: #6200ee;
      padding: 1rem 1.5rem;
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      outline: 0;
      border: 0;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
      // transition: background 400ms;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 1rem;
    }
  }
  .main {
    flex: 2;
  }
}
</style>
<style lang="scss">
.phaser-point {
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.7);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
}
</style>

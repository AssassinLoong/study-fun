<template>
  <div class="css-point">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <div class="body">
      <div class="aside">
        <button class="title-link"
                v-for="(item, index) in routerList"
                :key="index"
                @click="(e)=>turnToLink(e, item)">{{ item.mate.label }}
        </button>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { CssCollectionChild } from "@/router";

export default {
  components: {},
  data() {
    return {
      routerList: CssCollectionChild
    };
  },
  mounted() {},
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
      if (this.$router.history.current.name == data.name) {
        return;
      }
      setTimeout(() => {
        this.$router.push({ name: data.name });
        console.log(data);
      }, 300);
    },
    goBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="scss" scoped>
// 字体
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.css-point {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .go-back {
    display: inline-block;
    position: relative;
    color: #f56c6c;
    padding-top: 20px;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }

  .aside {
    width: 200px;
    height: auto;
    max-height: 800px;
    margin-right: 10px;
    text-align: center;

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
.css-point {
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

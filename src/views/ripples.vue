<template>
  <div class="ripples"
       ref="ripples">
    <div class="button"
         ref="button">
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      debounce: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const $button = this.$refs.button;

      $button.addEventListener("click", () => {
        if (this.debounce) return;
        this.debounce = true;
        buttonAnimate();
        createWave();
      });

      const buttonAnimate = () => {
        $button.classList.add("clicked");
        setTimeout(() => {
          $button.classList.remove("clicked");
          this.debounce = false;
        }, 700);
      };

      const createWave = () => {
        const wave = document.createElement("div");
        wave.classList.add("wave");
        this.$refs.ripples.appendChild(wave);
        setTimeout(() => wave.remove(), 7000);
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.ripples {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #55b9f3;
  color: #c8deeb;
  overflow: hidden;
}

.button {
  z-index: 10;
  position: absolute;
  width: 40px;
  height: 40px;
  background: #55b9f3;
  border-radius: 50%;
  box-shadow: 6px 6px 12px #489dcf, -6px -6px 12px #62d5ff;
  cursor: pointer;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.clicked {
    animation: shadowFadeOut 200ms ease-out forwards, shadowFadeIn 200ms 300ms ease-in forwards;
    svg {
      animation: fillFadeOut 200ms ease-out forwards, fillFadeIn 200ms 300ms ease-in forwards;
    }
  }
}

@keyframes shadowFadeIn {
  0% {
    box-shadow: inset 6px 6px 12px #489dcf, inset -6px -6px 12px #62d5ff;
  }
  50% {
    box-shadow: none;
  }
  100% {
    box-shadow: 6px 6px 12px #489dcf, -6px -6px 12px #62d5ff;
  }
}

@keyframes shadowFadeOut {
  0% {
    box-shadow: 6px 6px 12px #489dcf, -6px -6px 12px #62d5ff;
  }
  50% {
    box-shadow: none;
  }
  100% {
    box-shadow: inset 6px 6px 12px #489dcf, inset -6px -6px 12px #62d5ff;
  }
}

@keyframes fillFadeOut {
  from {
    fill: none;
  }
  to {
    fill: currentColor;
  }
}

@keyframes fillFadeIn {
  from {
    fill: currentcolor;
  }
  to {
    fill: none;
  }
}
</style>
<style lang="scss">
.wave {
  z-index: 1;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 20px 20px 60px #489dcf, -20px -20px 60px #62d5ff;
  opacity: 0;
  animation: fadeIn 400ms ease-out forwards, outside_grow 5s ease-out, fadeOut 3s 2s forwards;
}

.wave::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0px;
  height: 0px;
  border-radius: 50%;
  box-shadow: inset 20px 20px 60px #489dcf, inset -20px -20px 60px #62d5ff;
  animation: inside_grow 5s ease-out;
}

@keyframes outside_grow {
  from {
    width: 20px;
    height: 20px;
  }
  to {
    width: 900px;
    height: 900px;
  }
}

@keyframes inside_grow {
  from {
    width: 0px;
    height: 0px;
  }
  to {
    width: 880px;
    height: 880px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

<template>
  <div class="scroll-to-top"
       ref="pageBody">
    <div class="contain"
         ref="container">
      <h1>Scroll to Down 👇</h1>
    </div>
    <footer ref="foot">
      <button class="scrollToTopBtn"
              :class="{'showBtn': showScroll}"
              @click="scrollToTop"
              ref="scroll">☝️</button>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showScroll: false
    };
  },
  mounted() {
    // 方式1
    // document.addEventListener("scroll", this.listenerScroll);

    // 方式2
    var target = this.$refs["foot"];
    let observer = new IntersectionObserver(this.listenerScroll2);
    observer.observe(target);
  },
  methods: {
    scrollToTop() {
      // 获取元素高度
      // let a = this.$refs.rule.offsetTop;
      this.$refs.pageBody.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      /**
       * scrollTo 滚动方法要加在滚动条所在的元素上
       * 如果 .scroll-to-top 去掉 overflow: auto
       * 在 App.vue 的 overflow 设置为 auto
       * 则上面的方法失效，下面的方法为正确写法
       */

      // document.documentElement.scrollTo({
      //   top: 0,
      //   behavior: "smooth"
      // });
    },
    scrollToTopOther() {
      const drag = 10;
      let winH = window.innerHeight;
      let location = 0;

      const scroll = () => {
        // 距离顶部的距离
        // const gap = this.$refs.container.scrollTop || 1;
        const gap = this.$refs.pageBody.scrollTop;
        if (gap > location) {
          window.requestAnimationFrame(scroll);
          // this.$refs.container.scrollTo(0, gap + Math.ceil((location - gap) / drag));
          this.$refs.pageBody.scrollTo ? this.$refs.pageBody.scrollTo(0, gap - gap / drag) : (this.$refs.pageBody.scrollTop = gap - gap / drag);
        }
      };
      scroll();
    },
    listenerScroll() {
      let el = document.documentElement;
      let scrollTotal = el.scrollHeight - el.clientHeight;

      if (el.scrollTop / scrollTotal > 0.8) {
        // Show button
        this.showScroll = true;
      } else {
        // Hide button
        this.showScroll = false;
      }
    },
    listenerScroll2(entries, observer) {
      console.log(entries, "eeeeeeeee");
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.showScroll = true;
        } else {
          this.showScroll = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-to-top {
  background-image: linear-gradient(#d16ba5, #e17497, #eb828b, #ee9183, #eda280, #f1ad7d, #f3b97b, #f3c67b, #f8d273, #fbdf6b, #f9ec64, #f4fb5f);
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .contain {
    height: 120vmin;

    h1 {
      color: white;
      font-family: system-ui, sans-serif;
      font-size: 48px;
      text-align: center;
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    .scrollToTopBtn {
      background-color: black;
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      font-size: 16px;
      line-height: 48px;
      width: 48px;

      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 100;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.5s ease;
      outline: 0;
    }
    .showBtn {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
<style lang="scss">
</style>

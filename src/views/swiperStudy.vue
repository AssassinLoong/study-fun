<template>
  <div class="swiper_study">
    <div class="swiper-container-new">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(item,index) in swiperImageList"
             :key="index">
          <div class="swiper-img-box">
            <img :src="img"
                 @click="test(item)">
          </div>
        </div>
      </div>
    </div>

    <swiper ref="mySwiper"
            :options="swiperOptions">
      <swiper-slide v-for="(item,index) in swiperImageList"
                    :key="index">
        <div class="swiper-img-box">
          <img :src="img">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import SwiperNew from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import SwiperNew from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperImageList: [1, 2, 3, 4, 5, 6],
      img: require("@/assets/images/swiper1.png"),
      swiper: null,
      swiperOptions: {
        initialSlide: 1,
        observer: true,
        observeParents: true,
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: -30, // 拉伸 图片间左右的间距和密集度
          depth: 120, // 深度 切换图片间上下的间距和密集度
          modifier: 2, // 修正值 该值越大前面的效果越明显
          slideShadows: false //页面阴影效果
        },
        autoplay: {
          disableOnInteraction: false, //手动滑动之后不打断播放
          delay: 5000
        }
      }
    };
  },
  mounted() {
    this.swiper = new SwiperNew(".swiper-container-new", {
      initialSlide: 1,
      observer: true,
      observeParents: true,
      loop: true,
      slidesPerView: "auto",
      centeredSlides: true,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0, // 旋转的角度
        stretch: -30, // 拉伸 图片间左右的间距和密集度
        depth: 120, // 深度 切换图片间上下的间距和密集度
        modifier: 2, // 修正值 该值越大前面的效果越明显
        slideShadows: false //页面阴影效果
      },
      autoplay: {
        disableOnInteraction: false, //手动滑动之后不打断播放
        delay: 5000
      },
      on: {
        tap: swiper => {
          console.log(swiper.activeIndex % this.swiperImageList.length, "--");
        },
        slideChangeTransitionStart: swiper => {
          console.log(swiper.activeIndex % this.swiperImageList.length);
        }
      }
    });
    console.log(this.swiper, this.swiperComponent);
  },
  methods: {
    test(i) {
      let tabIndex = this.swiper.activeIndex % this.swiperImageList.length;
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    }
  },
  computed: {
    swiperComponent() {
      return this.$refs.mySwiper.$swiper;
    }
  }
};
</script>
<style lang="scss" scoped>
.swiper-slide {
  width: auto;
  height: vw(315);
}
.swiper-img-box {
  img {
    width: vw(450);
    height: vw(315);
  }
}
</style>

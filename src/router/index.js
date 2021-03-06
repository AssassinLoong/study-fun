import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export const phaserChild = [
  {
    path: "gameOne",
    name: "gameOne",
    mate: {
      label: "gameOne"
    },
    component: () => import("@/components/phaserStudyAll/gameOne/phaser.vue")
  },
  {
    path: "gameTwo",
    name: "gameTwo",
    mate: {
      label: "gameTwo"
    },
    component: () => import("@/components/phaserStudyAll/gameTwo/phaser.vue")
  },
  {
    path: "gameThree",
    name: "gameThree",
    mate: {
      label: "gameThree"
    },
    component: () => import("@/components/phaserStudyAll/gameThree/phaser.vue")
  },
  {
    path: "gameFour",
    name: "gameFour",
    mate: {
      label: "gameFour"
    },
    component: () => import("@/components/phaserStudyAll/gameFour/phaser.vue")
  },
  {
    path: "gameFive",
    name: "gameFive",
    mate: {
      label: "gameFive"
    },
    component: () => import("@/components/phaserStudyAll/gameFive/index.vue")
  }
];

export const CssCollectionChild = [
  {
    path: "scrollAlign",
    name: "ScrollAlign",
    component: () => import("../views/CssCollection/scrollAlignCss.vue"),
    mate: {
      label: "css滚动对齐"
    }
  },
  {
    path: "borderAnims",
    name: "BorderAnims",
    component: () => import("../views/CssCollection/borderAnims.vue"),
    mate: {
      label: "边框 制作/动画"
    }
  },
  {
    path: "cutType",
    name: "CutType",
    component: () => import("../views/CssCollection/cutType.vue"),
    mate: {
      label: "剪裁方式(clip-path)"
    }
  }
];

export const titleRouter = [
  {
    path: "/perspective",
    name: "Perspective",
    component: () => import("../views/perspective.vue"),
    mate: {
      label: "旋转正方体"
    }
  },
  {
    path: "/turnPage",
    name: "TurnPage",
    component: () => import("../views/turnPage.vue"),
    mate: {
      label: "翻页"
    }
  },
  {
    path: "/scrollTop",
    name: "ScrollTop",
    component: () => import("../views/scrollToTop.vue"),
    mate: {
      label: "滚到顶部"
    }
  },
  {
    path: "/zajindan",
    name: "Zajindan",
    component: () => import("../views/breakGoldenEgg.vue"),
    mate: {
      label: "测试砸金蛋"
    }
  },
  {
    path: "/importExcel",
    name: "ImportExcel",
    component: () => import("../views/importExcel.vue"),
    mate: {
      label: "导入excel"
    }
  },
  {
    path: "/svgBorder",
    name: "SvgBorder",
    component: () => import("../views/svgBorder.vue"),
    mate: {
      label: "svg边框动效"
    }
  },
  {
    path: "/CssCollection",
    name: "CssCollection",
    component: () => import("../views/CssCollection.vue"),
    mate: {
      label: "css合集"
    },
    redirect: "/CssCollection/scrollAlign",
    children: CssCollectionChild
  },
  {
    path: "/phaserStudy",
    name: "PhaserStudy",
    component: () => import("../views/phaserStudy.vue"),
    mate: {
      label: "Phaser学习"
    },
    redirect: "/phaserStudy/gameOne",
    children: phaserChild
  },
  {
    path: "/swiperStudy",
    name: "SwiperStudy",
    component: () => import("../views/swiperStudy.vue"),
    mate: {
      label: "swiper轮播图"
    }
  },
  {
    path: "/tencentMap",
    name: "TencentMap",
    component: () => import("../views/tencentMap.vue"),
    mate: {
      label: "腾讯地图"
    }
  },
  {
    path: "/areaPicker",
    name: "AreaPicker",
    component: () => import("../views/areaPicker.vue"),
    mate: {
      label: "城市选择"
    }
  },
  {
    path: "/grid",
    name: "Grid",
    component: () => import("../views/grid.vue"),
    mate: {
      label: "Grid布局"
    }
  },
  {
    path: "/ripples",
    name: "Ripples",
    component: () => import("../views/ripples.vue"),
    mate: {
      label: "涟漪动画"
    }
  },
  {
    path: "/moveMouse",
    name: "MoveMouse",
    component: () => import("../views/moveMouse.vue"),
    mate: {
      label: "移动鼠标"
    }
  }
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  ...titleRouter
];

const router = new VueRouter({
  routes
});

export default router;

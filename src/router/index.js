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
    path: "/scrollAlign",
    name: "ScrollAlign",
    component: () => import("../views/scrollAlignCss.vue"),
    mate: {
      label: "css滚动对齐"
    }
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

<template>
  <div class="tencent_map">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <div class="body"
         ref="tencent_map">

    </div>
    <div>总距离：{{length}}</div>
    <div>
      <input type="text"
             v-model="latVal">
      <input type="text"
             v-model="longVal">
      <button @click="addLat">添加</button>
    </div>
  </div>
</template>

<script>
import TMap from "TMap";
export default {
  components: {},
  data() {
    return {
      $map: null,
      zoomControl: null, // zoom控件
      rotationControl: null, // 旋转控件
      allLat: [
        // [23.102271, 113.419839],
        // [23.101079, 113.419403],
        // [23.103567, 113.417707],
        // [23.101984, 113.418256],
        // [23.100125, 113.432266],
        // [23.10311, 113.445017],
        // [23.104654, 113.446523]
      ], // 路径数组
      newLat: [], // 上一个路径
      polylineLayer: null, // 轨迹对象
      length: 0, //总长度
      latVal: "",
      longVal: ""
    };
  },
  mounted() {
    this.allLat.push([23.102271, 113.419839]);
    this.newLat.push(23.102271, 113.419839);
    this.init();
  },
  methods: {
    addLat() {
      this.allLat.push([Number(this.latVal), Number(this.longVal)]);

      if (this.allLat.length == 2 && !this.polylineLayer) {
        this.drawLine();
      } else if (this.polylineLayer) {
        this.polylineLayer.add({
          //新的折线添加到图层中
          styleId: "style_blue",
          paths: [new TMap.LatLng(this.newLat[0], this.newLat[1]), new TMap.LatLng(Number(this.latVal), Number(this.longVal))]
        });
      }

      // 修改地图中心点
      this.$map.setCenter(new TMap.LatLng(Number(this.latVal), Number(this.longVal)));

      // 算总距离
      this.length = TMap.geometry.computeDistance(this.newLatLng);

      this.newLat = [Number(this.latVal), Number(this.longVal)];
    },
    init() {
      console.log(TMap, "TMap");
      let el = this.$refs.tencent_map;
      var center = new TMap.LatLng(this.allLat[0][0], this.allLat[0][1]);
      //定义map变量，调用TMap.Map构造函数创建地图
      this.$map = new TMap.Map(el, {
        center: center, //设置地图中心点坐标
        zoom: 17, //设置地图缩放级别
        mapStyleId: "style1", //个性化地图样式设置
        showControl: true // 是否显示控件
      });

      this.zoomControl = this.$map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
      this.rotationControl = this.$map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);

      this.removeZoomControl();
      this.removeRotationControl();

      // this.drawLine();
    },
    // 画运动轨迹
    drawLine() {
      this.polylineLayer = new TMap.MultiPolyline({
        id: "polyline-layer", //图层唯一标识
        map: this.$map, //设置折线图层显示到哪个地图实例中
        //折线样式定义
        styles: {
          style_blue: new TMap.PolylineStyle({
            color: "#3777FF", //线填充色
            width: 3, //折线宽度
            borderWidth: 1, //边线宽度
            borderColor: "#FFF", //边线颜色
            lineCap: "butt" //线端头方式
          }),
          style_red: new TMap.PolylineStyle({
            color: "#f56c6c", //线填充色
            width: 6, //折线宽度
            borderWidth: 3, //边线宽度
            borderColor: "#FFF", //边线颜色
            lineCap: "butt" //线端头方式
          })
        },
        //折线数据定义
        geometries: [
          {
            //第1条线
            id: "pl_1", //折线唯一标识，删除时使用
            styleId: "style_blue", //绑定样式名
            paths: this.newLatLng
          }
        ]
      });
    },
    showAllLat() {
      // 将轨迹完整显示
      var latlngBounds = new TMap.LatLngBounds();
      for (var i = 0; i < this.newLatLng.length; i++) {
        latlngBounds.extend(this.newLatLng[i]);
      }
      this.$map.fitBounds(latlngBounds, {
        padding: 10
      });
    },
    // 移除缩放控件
    removeZoomControl() {
      if (!this.$map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)) {
        // 如果map上不存在该控件则直接返回
        return;
      }
      this.$map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
    },
    // 移除旋转控件
    removeRotationControl() {
      if (!this.$map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)) {
        // 如果map上不存在该控件则直接返回
        return;
      }
      this.$map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
    },
    goBack() {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    newLatLng() {
      return this.allLat.map(item => {
        return new TMap.LatLng(item[0], item[1]);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
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
  margin-bottom: 20px;
}
</style>

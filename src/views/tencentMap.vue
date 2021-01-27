<template>
  <div class="tencent_map">
    <div class="go-back"
         @click="goBack">返回首页</div>
    <div ref="tencent_map"></div>
    <div>总距离：{{length}}</div>
  </div>
</template>

<script>
import TMap from "TMap";
export default {
  components: {},
  data() {
    return {
      length: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(TMap, "TMap");
      let el = this.$refs.tencent_map;
      var center = new TMap.LatLng(23.102271, 113.419839);
      //定义map变量，调用TMap.Map构造函数创建地图
      var map = new TMap.Map(el, {
        center: center, //设置地图中心点坐标
        zoom: 17, //设置地图缩放级别
        mapStyleId: "style1" //个性化地图样式设置
      });

      var polylineLayer = new TMap.MultiPolyline({
        id: "polyline-layer", //图层唯一标识
        map: map, //设置折线图层显示到哪个地图实例中
        //折线样式定义
        styles: {
          style_blue: new TMap.PolylineStyle({
            color: "#3777FF", //线填充色
            width: 6, //折线宽度
            borderWidth: 3, //边线宽度
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
            paths: [new TMap.LatLng(23.102271, 113.419839), new TMap.LatLng(23.101079, 113.419403), new TMap.LatLng(23.103567, 113.417707)]
          },
          {
            //第1条线
            id: "pl_2", //折线唯一标识，删除时使用
            styleId: "style_red", //绑定样式名
            paths: [
              new TMap.LatLng(23.103567, 113.417707),
              new TMap.LatLng(23.101984, 113.418256),
              new TMap.LatLng(23.100125, 113.432266),
              new TMap.LatLng(23.10311, 113.445017),
              new TMap.LatLng(23.104654, 113.446523)
            ]
          }
        ]
      });

      // 算总距离
      this.length = TMap.geometry.computeDistance([
        new TMap.LatLng(23.102271, 113.419839),
        new TMap.LatLng(23.101079, 113.419403),
        new TMap.LatLng(23.103567, 113.417707),
        new TMap.LatLng(23.101984, 113.418256),
        new TMap.LatLng(23.100125, 113.432266),
        new TMap.LatLng(23.10311, 113.445017),
        new TMap.LatLng(23.104654, 113.446523)
      ]);
    },
    goBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="scss" scoped>
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

<template>
  <div class="area_picker">
    <div class="seach_box">
      <van-search v-model="cityName"
                  @input="seachChange"
                  placeholder="请输入城市进行搜索" />
    </div>
    <div class="city_hot">
      <div class="title">热门城市</div>
      <div class="box">
        <div class="city_label"
             v-for="(item, index) in hotCityList"
             :key="index"
             @click="selectCity(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="city_box"
         v-if="!cityName">
      <van-index-bar>
        <div v-for="(item) in cityList"
             :key="item">
          <van-index-anchor :index="item" />
          <van-cell v-for="(item) in citySort[item]"
                    :key="item.key"
                    :title="item.name"
                    @click="selectCity(item)" />
        </div>
      </van-index-bar>
    </div>
    <div class="city_box"
         v-else>
      <div v-if="searchCityList.length > 0">
        <div class="van-cell"
             v-for="(item, index) in searchCityList"
             :key="index"
             @click="selectCity(item)">
          {{ item.name }}
        </div>
      </div>
      <div v-else> 没有搜索到 </div>
    </div>

  </div>
</template>

<script>
import cityObj from "@/utils/cityObj.js";
import citySort from "@/utils/citySort.js";
export default {
  components: {},
  data() {
    return {
      citySort: citySort,
      cityName: "",
      searchCityList: [],
      hotCityList: [
        { key: "110100", name: "北京市" },
        { key: "310100", name: "上海市" },
        { key: "440100", name: "广州市" },
        { key: "440300", name: "深圳市" },
        { key: "510100", name: "成都市" },
        { key: "330100", name: "杭州市" },
        { key: "320100", name: "南京市" },
        { key: "320500", name: "苏州市" },
        { key: "500100", name: "重庆市" },
        { key: "120100", name: "天津市" },
        { key: "420100", name: "武汉市" },
        { key: "610100", name: "西安市" }
      ]
    };
  },
  mounted() {
    // let citySort = Object.keys(cityObj).sort((a, b) => {
    //   return cityObj[a].localeCompare(cityObj[b]);
    // });
    // let city = citySort.map(key => {
    //   return {
    //     key: key,
    //     name: cityObj[key]
    //   };
    // });
    // console.log(city);
  },
  methods: {
    selectCity(city) {
      console.log(city, "cc");
    },
    seachChange() {
      this.searchCityList = [];
      for (let i = 0; i < this.cityList.length; i++) {
        let key = this.cityList[i];
        let right = this.citySort[key].filter(item => {
          return item.name.indexOf(this.cityName) != -1;
        });
        console.log(right, key);
        this.searchCityList.push(...right);
      }
    }
  },
  computed: {
    cityList() {
      return Object.keys(this.citySort);
    }
  }
};
</script>
<style lang="scss" scoped>
.area_picker {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .city_hot {
    height: vw(300);
    padding: 0 vw(20);

    .box {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .city_label {
        background-color: #eee;
        padding: vw(10);
        margin: vw(10);
      }
    }
  }

  .city_box {
    flex: 1;
    overflow: auto;
  }
}
</style>

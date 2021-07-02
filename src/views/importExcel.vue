<template>
  <div class="import-excel">
    <!-- <div style="color: red;height: 30px;margin-top:10px;">打开控制台，看详细表格解析数据</div> -->
    <!-- <input type="text"> -->
    <a class="downloadFile"
       href="./ExcelTemplate.xlsx"
       download="ExcelTemplate.xlsx">下载模板</a>

    <div class="file-upload">
      <div class="label">选择上传文件</div>
      <input ref="questionFile"
             type="file"
             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
             @change="changeFile">
    </div>

    <div class="list">
      <div class="container"
           v-for="(item,index) in excelData"
           :key="index">
        <div class="content"
             v-for="(data, ii) in item"
             :key="ii">
          <img class="images"
               v-if="(''+data).match(/(http|https):\/\/([\w.]+\/?)\S*/ig)"
               :src="data">
          <div v-else>{{data}}</div>
        </div>
        <!-- <img class="list-img"
             :src="imageArr[item]">
        <div class="text">{{item | handleImgName}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Excel } from "excel-image-transformer";
import axios from "axios";
import { OSS } from "@/api/";

export default {
  components: {},
  data() {
    return {
      imageArr: {},
      excelData: []
    };
  },
  mounted() {},
  methods: {
    changeFile(e) {
      // 获取文件信息
      const target = e.target;
      const name = target.files[0].name;
      if (!target.files[0]) return;
      const fileReader = new FileReader();
      fileReader.onload = e => {
        let imageArr = {};

        const excel = new Excel();
        // 载入文件buffer
        excel.load(e.target.result);

        excel
          .transformImagesToStr(async file => {
            // 通过 oss 上传图片然后得到图片的 url，并返回
            // 图片所在的单元格的内容就会被替换为 url

            // 提取文件名字、大小、最后修改时间 判断是否是同一张图片
            // 同一图片不上传oss
            const { name, size, lastModified } = file;
            let imgOnly = name + "-" + size + "-" + lastModified;

            // 新图片 将地址存起来
            if (!imageArr.hasOwnProperty(imgOnly)) {
              // 通过oss 获取图片链接
              const ossToken = await this.getOssToken(file);
              const url = await this.postEndpoint(ossToken);
              imageArr[imgOnly] = url;
              return url;
            } else {
              // 已上传过该图片，读取url
              return imageArr[imgOnly];
            }
          })
          .then(() => {
            this.imageArr = imageArr;
            const data = excel.getData();
            console.log(data);

            this.excelData = data[0].data;

            alert("上传成功");
          })
          .finally(() => {});
      };
      fileReader.readAsArrayBuffer(target.files[0]);
    },
    getOssToken(file) {
      return new Promise((resolve, reject) => {
        let fileName = file.name;
        OSS({ fileName })
          .then(res => {
            const fd = new FormData();
            fd.append("OSSAccessKeyId", res.accessid);
            fd.append("policy", res.policy);
            fd.append("Signature", res.signature);
            fd.append("key", res.key);
            // 二进制文件可以是 event.target.files 中的文件，canvas.toBlob 的 Blob 等等
            fd.append("file", file);
            resolve({
              url: res.endpoint,
              formData: fd,
              imageUrl: res.url
            });
          })
          .catch(error => {
            reject(new Error(error));
          });
      });
    },
    postEndpoint(data) {
      return new Promise((resolve, reject) => {
        var instance = axios.create({
          timeout: 10000,
          withCredentials: false
        });
        instance
          .post(data.url, data.formData)
          .then(() => {
            resolve(data.imageUrl);
          })
          .catch(error => {
            reject();
            console.log(error);
          });
      });
    }
  },
  filters: {
    handleImgName(val) {
      return val.split("-")[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.import-excel {
  width: 100%;
  height: 100%;
  overflow: auto;

  .downloadFile {
    display: block;
    margin: 20px;
  }

  .file-upload {
    margin-left: 20px;

    .label {
      color: red;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
  }
  .container {
    width: 100%;
    height: 25vw;
    line-height: 25vw;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .content {
    width: 33vw;
    text-align: center;
  }
  .images {
    width: 20vw;
    height: 20vw;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
  
import axios from "axios";
import router from "@/router/index.js";

// let baseUrl = (axios.defaults.baseURL = './'); // 代理

let baseUrl = (axios.defaults.baseURL =
  process.env.VUE_APP_WORD == "TEST" ? "https://boc-questions-quiz.api.h5no1.com/api" : "https://boc-questions-quiz.test.h5no1.com/api"); // 设置测试请求地址

// let baseUrl = (axios.defaults.baseURL =
//   'https://api.h5no1.com/boc-questions-quiz/api'); // 设置测试请求地址

/** 设置POST请求的默认content-type类型
 * axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 * options : 'multipart/form-data' ,'application/json' ,'application/x-www-form-urlencoded'
 *
 */

// axios 全局配置（拦截所有请求）
axios.interceptors.request.use(
  req => {
    // get请求添加时间戳
    if (req.method.toLowerCase() === "get") {
      req.params = req.params || {};
      req.params["t"] = Date.now();
    }
    if (localStorage.getItem("token")) {
      req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return req;
  },
  /* eslint-disable handle-callback-err */
  err => {
    return Promise.reject(err);
  }
);

// axios 全局配置（拦截所有响应）
axios.interceptors.response.use(
  res => {
    // 如果不是服务器的请求
    // if (res.config.ignoreResCode) {
    //   return Promise.resolve(res.data)
    // }

    // 服务器请求出错
    if (res.data.ok !== true) {
      if (res.data.message.indexOf("权限不足") > -1) {
        router.push({
          name: "login"
        });
      }
      return Promise.reject(res.data);
    }
    if (res.config.url == baseUrl + "/admin/login") {
      console.log("success");
      localStorage.setItem("token", res.headers["x-token"]);
    }
    return Promise.resolve(res.data.result);
  },
  err => {
    if (axios.isCancel(err)) {
      console.log(err.message);
    }
    return Promise.reject(err);
  }
);

// if (process.env.NODE_ENV !== 'production') {
axios.defaults.withCredentials = true;
// }

// 登陆
export let loginApi = params => {
  return axios.post("/admin/login", params);
};

/*--------------------OSS图片上传-------------------- */

// OSS
export let OSS = params => {
  return axios.get("/oss/sign", {
    params
  });
};

export const ossApi = () => {
  return `${baseUrl}/oss/sign`;
};

export default axios;

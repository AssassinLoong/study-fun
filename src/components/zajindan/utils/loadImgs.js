export default function loadImgs(srcArr) {
  return new Promise((resolve, reject) => {
    if (!srcArr || !srcArr.length) {
      reject(new Error(`参数不合法: 请传入图片地址数组!`));
      return;
    }

    let loaded = 0;
    let total = srcArr.length;

    srcArr.map(function(src) {
      let img = new Image();

      img.src = src;
      if (img.complete && ++loaded === total) {
        resolve();
      } else {
        img.addEventListener("error", function onError() {
          reject(new Error(`${src} 所指向的图片不存在!`));
        });
        img.addEventListener("load", function onLoad() {
          ++loaded === total && resolve();
        });
      }
    });
  }).catch(err => {
    /* eslint no-console: off */
    console.error(`${err.message}`);
  });
}

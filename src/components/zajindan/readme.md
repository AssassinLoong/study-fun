# 砸金蛋

## 选项

| 参数   | 类型   | 必填 | 可选 | 默认值 | 说明     |
| ------ | ------ | ---- | ---- | ------ | -------- |
| config | Object | true |      |        | 组件配置 |

### config 选项

| 参数         | 类型     | 必填  | 可选 | 默认值 | 说明                   |
| ------------ | -------- | ----- | ---- | ------ | ---------------------- |
| pointsNumber | Number   | false |      | 100    | 定位点总个数           |
| speed        | Number   | false |      | 40     | 转动速度               |
| baseImage    | Image    | true  |      |        | 金蛋底座图片           |
| hammer       | Image    | true  |      |        | 锤子图片               |
| eggImage     | Image    | true  |      |        | 金蛋图片（通用）       |
| egg_shell_1  | Image    | true  |      |        | 金蛋裂开 瓣 1 （通用） |
| egg_shell_2  | Image    | true  |      |        | 金蛋裂开 瓣 2 （通用） |
| eggList      | [Object] | true  |      |        | 金蛋配置               |

### eggList 选项

| 参数        | 类型   | 必填  | 可选 | 默认值 | 说明                  |
| ----------- | ------ | ----- | ---- | ------ | --------------------- |
| point       | Number | true  |      |        | 金蛋定位              |
| eggSrc      | Image  | false |      |        | 单独配置金蛋图片      |
| egg_shell_1 | Image  | false |      |        | 单独配置裂开瓣 1 图片 |
| egg_shell_2 | Image  | false |      |        | 单独配置裂开瓣 2 图片 |

注：

- 单独配置图片会覆盖通用图片
- 若图片不需要单独配置，只需要配置金蛋定位，可写成 `eggList: [定位1, 定位2, 定位3]`

## 方法

| 参数      | 参数 | 说明     |
| --------- | ---- | -------- |
| goToStart | -    | 开启抽奖 |
| resetData | -    | 重置状态 |

## 事件

| 参数          | 回调参数            | 说明                       |
| ------------- | ------------------- | -------------------------- |
| lotteryApply  | -                   | 点击金蛋触发。发起抽奖申请 |
| lotteryLaunch | { resolve, reject } | 开砸后触发。               |
| lotteryFinish | data                | 抽奖流程完成后触发         |

注：

- lotteryLaunch

  1. `resolve()`后会主动触发 `lotteryFinish`
  2. `reject()`后则会被拦截，不会触发 `lotteryFinish`

- lotteryFinish
  1. 参数 data 的值为 `lotteryLaunch`事件`resolve()`的内容

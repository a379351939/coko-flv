# coko-flv

### 介绍
一个用来播放实时流的React组件。只适用于直播场景。
基于[flv.js](https://github.com/Bilibili/flv.js)封装，加入追帧，跳帧，重连的功能。


### 使用
[demo](https://codesandbox.io/s/coko-flv-demo-cqk8c?file=/src/App.tsx)
```
npm i coko-flv'
```
```
import CokoFlv from "coko-flv";

function App() {
  return (
      <CokoFlv url="" />
  );
}
```

### API
| 参数  | 说明  |  类型 |  默认值 |  
|---|---|---|---|
| url  | 流地址，必填  |  string |   |  
|  videoEleOpt | videoDom元素参数   | object  |   | 
|  mediaDataSource | 参考flv.js api   | object  |   | 
| config  |  参考flv.js api   |  object |   |  
| diffCritical  |   超过X秒以上就进行跳转   |  number | 6  |  
| diffSpeedUp  |   超过X秒以上则进行视频加速播放   |  number | 4  |  
| latest  |   缓冲区最小时间间隔   |  number | 1  |  
| delay  |   校验追帧间隔，单位ms   |  number | 5000  | 
| reconnectLimit  |   断流重连次数限制   |  number | 5  | 

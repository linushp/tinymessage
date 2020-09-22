# 样式模仿ant design Message全局提示

## 与ant design的区别
1. 简单纯净小巧，不依赖任何第三方库和组件
2. 不依赖react和vue 

## 用法


1. 安装
```

npm i tiny-message-box

```

2. 引入
```javascript
import TinyMessage from 'tiny-message-box';

```

3. 调用
```javascript


TinyMessage.success('成功提示', 3000) // 停留3000毫秒

TinyMessage.error('错误提示', 3000) // 停留3000毫秒

TinyMessage.info('普通信息提示', 3000) // 停留3000毫秒

TinyMessage.loading('加载中', 3000) // 停留3000毫秒

TinyMessage.destroy() // 立即销毁所有弹出的信息提示框

```




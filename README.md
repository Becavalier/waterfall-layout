## 瀑布流式布局 (Waterfall Layout)

### 介绍
什么是瀑布流布局？直接到 Pinterest 的网站上体验一下就知道了。

![image](https://github.com/Becavalier/Waterfall0z/blob/master/inline-block%20%2B%20flex/screenshot.gif?raw=true)

### 说明
正好由于工作需要，花了点时间总结了两种方式的瀑布流布局：一种基于 `inline-box` 和 `flex`，对浏览器兼容有一定要求；另一种方式与 Pinterest 采用的方式相同，即使用 `absolute` 方式。

> * 基于 inline-box + flex, 性能较好，但需要浏览器兼容 flex；
> * 基于 absolute, 性能较差。由于 absolute 的特性，需要在窗口变化时不停的重绘页面；

这两种方式实现的瀑布流式布局均支持首屏和网页窗口大小改变时的列数自适应。

### 实现
这里实现的流式布局假设首屏内容是通过异步加载获取的。如需将首屏内容直接渲染输出，需要对渲染部分的逻辑稍作修改。
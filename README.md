<h2 align='center'> iny-request axios typescript 重构计划</h2> 


<p align='center'>如果对你有帮助或者有任何收获、点个 赞，给个星星，鼓励一下作者😄<p>
 
### 背景介绍
 
`axios` 作为一个在前端领域非常重要的 `HTTP` 请求库，不管是 `Vue`、`React` 还是 `Node`，甚至任何 `JS` 可以运行的地方，都有可能出现，可以说，`axios` 是前端绕不过去的一个槛，掌握 `axios` 的原理、对我们日常开发和技术学习有着非常重要的意义。
    
同时，`axios` 源码中，有着非常优秀的设计思想，是每一个 前端开发 都应该去学习和借鉴的，了解其中的原理并将其运用到我们代码中，是一件非常 `cool` 的事

### 系列计划
    
    1. 分析 axios 的每一个 feature，并在这过程中，使用 typescript 重写 axios 库（不包含 Node 端实现）
    2. 添加 微信小程序、支付宝小程序 adapter，并简化 axios 一些过于鸡肋的功能（例如 axios.all axios.spread）
    3. 完整的测试用例覆盖，确保 新的 axios 库能够稳定的运行在生产环境
    4. 将新的axios 库发布到 npm 上，供大家使用

### 系列文档

[一、开发环境搭建、基本xhr函数实现、url、params处理](https://github.com/landluck/iny-request)

周末会更新第二篇，第二篇的主要内容以下两个点

* axios 请求 data 的处理 
* axios 请求 header 的处理

axios 重构系列，是我最近想在小程序中使用 axios 的功能，却发现没有很好的选择，因此而萌生的一个想法。但直接去从 axios 源码上改，除了满足业务需求，收益不大，所以，当我看了好几遍 axios 的源码后，决定使用 ts 从零自己去写一个这样的系列，并扩展微信小程序和支付宝小程序相关的内容，如果大家在阅读过程中中发现了不合理或者可以优化的点，欢迎大家直接在评论区直接提出 或者联系我

最后，如果 axios 重构计划 给你提供了帮助或者让你有任何收获，请给 作者 点个赞，感谢大家 [点赞](https://github.com/landluck/iny-request)

以下为快速传送门

[重构计划文档地址](https://github.com/landluck/axios-analysis)
[重构计划源码地址](https://github.com/landluck/iny-request)

###  axiox 介绍

> Promise based HTTP client for the browser and node.js 

    axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，其主要也是对 XHR 基于 Promoise 
    的封装，所以它不兼容 ie9 及以下，在 ie9 中我们需要引入 ployfill

axios 主要的功能点有：

* 浏览器中创建 XMLHttpRequests
* Node中创建 http 请求（暂不实现）
* 支持 Promise
* 支持拦截请求和响应
* 转换请求数据和响应数据
* 取消请求
* 自动转换 JSON 数据
* 客户端支持防御 XSRF
* ...

### 核心图示

为了避免 brothers 说我标题党，我在这里就将个人对 axios 源码的理解的图片贴出来，后面
大家可以看着这张图，去看我的代码，更能容易理解 axios 的原理和设计思想。

![](https://user-gold-cdn.xitu.io/2019/8/7/16c6cbd98ed7aeac?w=2045&h=3602&f=png&s=219027)
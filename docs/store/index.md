---
title: 简介
---

### 背景

由于`Redux`和`dva`配置繁琐，概念太多，使用不够便捷，给开发增加负担

### 开发目标

打造一个轻量级、便捷使用的状态管理，没有复杂概念，基于`React`本身

### 开发思路

基于`React` `context`原由的穿够效果，达到数据共享目的，但是`context`存在全量`rerender`问题，需要禁止`context`原有`render`行为，通过`hooks`注册订阅方式，按需`rerender`

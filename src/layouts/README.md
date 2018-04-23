# 基础框架

## 导航布局说明

用户可以设置页面进行修改

开发人员可以修改 `models/settings.js` 中 pageFrameLayout 初始值，来指定默认布局方式。

目前提供三种布局，如下：
1. side-menu: 只有左侧菜单
1. top-menu: 只有顶部菜单
1. top-side-menu: 头部菜单和左侧菜单

## 特性
相关方法已经封装到action中，代码在相应得models中

1. 头部固定
1. 菜单固定
1. 菜单可以滚动，并且隐藏滚动条
1. 菜单宽度可拖拽改变大小
1. 菜单可以展开/收起
1. 页面头部title自动获取/可设置
1. 页面头部面包屑自动获取/可设置
1. 页面头部可以隐藏/显示

## 页面头部
```
const {page} = this.props.action;
page.setTitle('自定义title');
page.hide();
page.show();
page.setBreadcrumbs([
    {text: '自定义',icon: 'home',path: '/path'},
    {text: '面包屑',icon: 'home',path: '/path'},
    {text: '导航',icon: 'home',path: '/path'},
])
```

## 左侧菜单

```
const {side} = this.props.acion;
side.hide();
side.show();
```

# 网易云音乐（App版本）

## 一、基本介绍

本项目使用`vue2+vue-cli`实现了一个简易的网易云音乐(App版本)，实现了歌曲的首页推荐展示，歌曲的搜索，评论的展示以及歌曲的播放四个主要功能模块，主要用来练手。

## 二、项目使用

**github地址**：[cloud-music](https://github.com/bosombaby/cloud-music)

**在线预览：**

## 三、开发环境



### 2.1 代理服务器

`api链接`：https://binaryify.github.io/NeteaseCloudMusicApi/#/![3](https://gitee.com/riskbaby/picgo/raw/master/blog/202210131612886.png)

`总结`：根据文档在后端跑起来代理服务器

### 2.2 搭建前端项目

接下来使用`yarn`代替`npm`，原因：https://blog.csdn.net/qq_39122387/article/details/109675680

#### 2.2.1 脚手架

```js
vue create music-demo
```

`总结`：默认选择`vue2`和`yarn`安装依赖的方式

#### 2.2.2 项目依赖

**进入项目文件夹**

```
cd  music-demo
```

**第三方依赖**

```
yarn add axios vant@latest-v2 vue-router@3
```

注意版本，这个是vue2的项目，对应的包有所变化

**生产依赖**

```
yarn add babel-plugin-import postcss postcss-pxtorem@5.1.1  -D
yarn add less less-loader@5.0.0 -D
```

**引入本地样式、图标**

```js
// 字体图标
import '@/assets/fonts/TsangerYuYangT_W01_W01.ttf'
//自适应
import '@/mobile/flexible'
//初始化样式
import '@/styles/reset.css'
```

**在babel.config.js - 添加vant按需引入插件配置**

```js
plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
```

**postcss.config.js自定义自适应比例**

```js
module.exports = {
    plugins: {
      'postcss-pxtorem': {
        // 能够把所有元素的px单位转成Rem
        // rootValue: 转换px的基准值。
        // 例如一个元素宽是75px，则换成rem之后就是2rem。
        rootValue: 37.5,
        propList: ['*']
      }
    }
  }
```

`注意`：每一次改动`src`目录之外的内容需要**重启服务**

## 四、需求分析



<img src="https://gitee.com/riskbaby/picgo/raw/master/blog/202210131941184.png" alt="image-20210426212251154" style="zoom:50%;" />

![1](https://gitee.com/riskbaby/picgo/raw/master/blog/202210161035039.png)



`App`：管理所有的组件

-  `Layout`：管理首页和搜索
  - `Home`：主页
    - `SongItem`：负责音乐的布局
  - `Search`：搜索页
    - `SongItem`：负责音乐的布局

- `Play`：音乐播放

- `Comment`：评论页



`Play`和`Comment`与`Layout`平级，需要的时候直接调用就行



## 五、路由管理

```js
// 引入Vue
import Vue from 'vue'
// 引入路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
// 引入组件
import Layout from '@/views/Layout'
import HomePage from '@/views/Home'
import SearchPage from '@/views/Search'
import Play from '@/views/Play'
import Comment from '@/views/Comment'


const routes = [
    {
        path: '/',
        redirect:'/layout'
    },
    {
        path: '/layout',
        redirect: '/layout/home',
        component: Layout,
        children: [
            {
                path: 'home',
                component: HomePage,
                meta: {
                    title:'首页'
                },
            },
            {
                path: 'search',
                component: SearchPage,
                meta: {
                    title:'搜索'
                },
            }
        ]
    },
    {
        path: '/play',
        component:Play
    },
    {
        path: '/comment',
        component:Comment
    }
    
]
const router = new VueRouter({ routes })

export default router
```



## 六、接口管理

```js
//所有api的管理者
import { recommendMusicAPI, newMusicAPI } from "@/api/Home";
import { hotSearchAPI, searchResultAPI } from "@/api/Search";
import { getSongByIdAPI, getLyricByIdAPI } from '@/api/Play'
import { getHotCommentAPI} from '@/api/Comment'

export { recommendMusicAPI,newMusicAPI,hotSearchAPI,searchResultAPI,getSongByIdAPI,getLyricByIdAPI,getHotCommentAPI}
```

## 七、难点分析

### 7.1  搜索页面

**防抖与节流**

`防抖`：像电梯门一样，每一次有人进来之后，电梯门就会重新计时，最终的记时完成，才会触发，相当于setTimeout

`节流`：像英雄的技能一样，触发一次之后要等待一段时间才能继续执行，相当于 setInterval

搜索歌曲避免多次发起请求，使用`防抖`实现

### 7.2 播放页面

`样式`：css的动画样式

`three.js`：打算引入`粒子特效`实现3d音乐效果的（后续需求，一开始未做好规划，不好加了）

### 7.3 评论页面

**评论的刷新与加载**

- vant组件库`List 列表`和` PullRefresh `结合，List 组件通过 `loading` 和 `finished` 两个变量控制加载状态，当组件滚动到底部时，会触发 `load` 事件并将 `loading` 设置成 `true`。此时可以发起异步操作并更新数据，数据更新完毕后，将 `loading` 设置成 `false` 即可。若数据已全部加载完毕，则直接将 `finished` 设置成 `true` 即可

### 7.4 异步

`Promise`：将异步转换为同步`async await`（就近原则使用），等待数据返回之后再继续执行下面的代码

## 八、项目总结

这次主要对`vue2`的项目进行锻炼。学习了模块化处理流程，对待不同的功能模块要进行合理的分区，前期一定要做好项目规划处理，后续开始学习`vue3`以及`three.js`
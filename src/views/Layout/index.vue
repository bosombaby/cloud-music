<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar 
       fixed
      :title="activeTitle"
    />
    <!-- 中间内容展示 -->
    <div class="main">
        <keep-alive>
             <router-view></router-view>
        </keep-alive>
    </div>
    <!-- 底部导航栏 -->
    <van-tabbar  route class="bottom">
      <van-tabbar-item  to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item  to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    name:'Layout',
    data(){
      return {
        
       
      }
    },
    computed:{
      activeTitle(){
        return this.$route.meta.title
      }
    }

}
</script>

<style scoped>
.bottom{
  padding: 15px 0;
}
.main{
  padding-top: 48px;
  padding-bottom: 20px;
}
</style>
<template>
  <div>
    <van-search 
      v-model="serachValue" 
      shape="round"
      placeholder="请输入搜索关键词" 
      @keydown.enter="getSearchResults(serachValue)"
      ref="search"
      />
      <!-- 搜索下容器 -->
    <div class="search_wrap" v-show="!resultList.length">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <ul class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <li 
          class="hot_item" 
          v-for="(hotObj,index) in hotSearchList" 
          :key="index"
          @click="getSearchValue(hotObj.first)"

        >{{hotObj.first}}</li>
      </ul>
    </div>

    <!-- 搜索结果 -->
    <SongItem 
    v-show="resultList.length"
    v-for="resultObj in resultList" 
    :key="resultObj.id"
    :title="resultObj.name" 
    :label="resultObj.ar[0].name"
    :id="resultObj.id"
    ></SongItem>

  </div>
</template>

<script>
import {hotSearchAPI,searchResultAPI} from '@/api'
import  SongItem from '@/components/SongItem'
export default {
    name:'SearchPage',
    data(){
      return {
        serachValue:'',
        hotSearchList:[],
        resultList:[],
        timer:null,
      }
    },
    async created() {
      const hotRes=await hotSearchAPI({limit:12})
      this.hotSearchList=hotRes.data.result.hots
      
    },
    methods: {
      getSearchValue(value){
        this.serachValue=value
        clearTimeout(this.timer)
        this.timer=setTimeout(async ()=>{
          const serachRes=await searchResultAPI({
            type:1,
            keywords:this.serachValue
          })
          this.resultList=serachRes.data.result.songs
        })
      },
    },
    watch:{
       serachValue(value){
        clearTimeout(this.timer)
        this.timer=setTimeout(async ()=>{
          if(value==='') return this.resultList=[]
          const serachRes=await searchResultAPI({
            type:1,
            keywords:value
          })
          this.resultList=serachRes.data.result.songs
        },300)
        //防抖 相当于setTimeout
        //节流 相当于 setInterval     
      }
    },
    components:{SongItem}
    
}
</script>

<style scoped>
/* 深度选择器 */
.van-search >>> .van-field__control{
  font-size: 14px !important;
}

/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}


</style>
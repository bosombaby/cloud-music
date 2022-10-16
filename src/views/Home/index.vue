<template>
  <div>
    <!-- 推荐歌单 -->
    <p class="title">推荐歌单</p>
    <div>
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="recommendObj in recommendList" :key="recommendObj.id">
          <van-image
              width="100%"
              height="100"
              :src="recommendObj.picUrl"
            />
            <p class="song_name">{{recommendObj.name}}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 最新音乐 -->
    <p class="title">最新音乐</p>
    <SongItem 
    v-for="newObj in newList" 
    :key="newObj.id"
    :title="newObj.name" 
    :label="newObj.song.artists[0].name"
    :id="newObj.id"
    ></SongItem>
  </div>
</template>

<script>
import {recommendMusicAPI,newMusicAPI} from '@/api'
import  SongItem from '@/components/SongItem'
export default {
    name:'HomePage',
    data(){
      return {
        recommendList:[],
        newList:[]
      }
    },
    async created() {
      //推荐歌单
      const res= await recommendMusicAPI({limit:6})
      this.recommendList=res.data.result
      
      //最新音乐
      const newRes=await newMusicAPI({limit:20})
      // console.log(newRes);
      this.newList=newRes.data.result


    },
    components:{SongItem}
   
}
</script>

<style scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

</style>
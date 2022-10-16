<template>
  <div>
    <van-nav-bar
        title="评论"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <!-- 评论页 -->
    <van-pull-refresh  v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
       >
            <div class="content">
                <div v-for="hotObj in hotList" :key="hotObj.commentId"  >
                    <div class="content-header">
                        <img :src="hotObj.user.avatarUrl" alt="">
                        <div class="author">{{hotObj.user.nickname}}</div>
                        <div class="agree">{{hotObj.likedCount}}人点赞</div>
                    </div>
                    <div class="content-main">
                        {{hotObj.content}}
                    </div>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
 

  </div>
</template>

<script>
import {getHotCommentAPI} from '@/api'
export default {
    name:'Comment',
    data(){
        return {
            loading: false,
            finished: false,
            refreshing: false,
            page:1,
            hotList:[]
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        }, 
        async getHotList() {
            const hotRes=await getHotCommentAPI({
                id:this.$route.query.id,
                type:0,
                limit:20,
                offset:(this.page-1)*20
            })
            this.hotList=[...this.hotList,...hotRes.data.hotComments]
            // hotRes.data.hotComments.forEach(obj => {this.hotList.push(obj)});
            this.refreshing=false
            this.loading=false
        },
        // 下拉刷新
        onRefresh(){
            this.hotList=[]
            this.page=1
            this.getHotList()
            
        },
        //数据更新完毕
        onLoad(){
            // console.log('正在加载页数',this.page);
            this.getHotList()
            this.page++
            this.loading=false
            if(this.page>5){
                this.finished=true
            }
        }
    },
}
</script>

<style scoped>
.content-header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: true;
}
.content-header img{
    width: 40px;
    height: 40px;
    border-radius:20px;
    margin: 5px 10px;
}
.content-header .author{
    flex: 1;
    font-size: 17px;
    font-weight: 700;
}
.content-header .agree{
    font-size: 13px;
    margin-right: 15px;
   
}
.content-main{
    margin: 10px 15px 20px;
    font-size: 14px;
    text-indent: 1em;
    color: #666;
    word-wrap:break-word;
    word-break:break-all;
}
</style>
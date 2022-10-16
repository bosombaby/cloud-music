<template>
  <van-cell center 
      :title="title" 
      :label="label"
      @click="enterComment()"
    >
      <template #right-icon>
        <van-icon name="play-circle-o"  size="24" @click="playSong()"/>
      </template>
    </van-cell>
</template>

<script>
export default {
    name:'SongItem',
    props:{
        title:String,
        label:String,
        id:Number
    },
    methods: {
      playSong(){
        this.$router.push({
          path:'/play',
          query:{
            id:this.id
          }
        })
        
      },
      enterComment(){
        this.$router.push({
          path:'/comment',
          query:{
            id:this.id
          }

        })
      }

    },
}
</script>

<style>

</style>
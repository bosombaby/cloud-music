<template>
  <div class="play">
    <!-- 模糊背景(靠样式设置), 固定定位 -->
    <div
      class="song-bg"
      :style="`background-image: url(${
        songInfo && songInfo.al && songInfo.al.picUrl
      }?imageView&thumbnail=360y360&quality=75&tostatic=0);`"
    ></div>
    <!-- 播放页头部导航 -->
    <div class="header">
      <van-icon
        name="arrow-left"
        size="20"
        class="left-incon"
        @click="$router.back()"
      />
    </div>
    <!-- 留声机 - 容器 -->
    <div class="song-wrapper">
      <!-- 留声机本身(靠css动画做旋转) -->
      <div
        class="song-turn ani"
        :style="`animation-play-state:${playState ? 'running' : 'paused'}`"
      >
        <div class="song-img">
          <!-- &&写法是为了防止报错, 有字段再继续往下访问属性 -->
          <img
            style="width: 100%"
            :src="`${
              songInfo && songInfo.al && songInfo.al.picUrl
            }?imageView&thumbnail=360y360&quality=75&tostatic=0`"
            alt=""
          />
        </div>
      </div>
      <!-- 播放按钮 -->
      <div class="start-box" @click="audioStart">
        <span class="song-start" v-show="!playState"></span>
      </div>
      <!-- 播放歌词容器 -->
      <div class="song-msg">
        <!-- 歌曲名 -->
        <h2 class="m-song-h2">
          <span class="m-song-sname"
            >{{ songInfo.name }}-{{
              songInfo && songInfo.ar && songInfo.ar[0].name
            }}</span
          >
        </h2>
        <!-- 歌词部分-随着时间切换展示一句歌词 -->
        <div class="lrcContent">
          <p class="lrc">{{ curLyric }}</p>
        </div>
      </div>
      <!-- 留声机 - 唱臂 -->
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
    </div>
    <!-- 播放音乐真正的标签
      看接口文档: 音乐地址需要带id去获取(但是有的歌曲可能404)
      https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
     -->
    <audio
      ref="audioMusic"
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    ></audio>
  </div>
</template>

<script>
// 获取歌曲详情和 歌曲的歌词接口
import { getSongByIdAPI,getLyricByIdAPI } from '@/api'
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon,
  },
  name: 'play',
  data() {
    return {
      playState: false, // 音乐播放状态(true暂停, false播放)
      id: this.$route.query.id, // 上一页传过来的音乐id
      songInfo: {}, // 歌曲信息
      lyric: {}, // 歌词枚举对象(需要在js拿到歌词写代码处理后, 按照格式保存到这个对象)
      curLyric: '', // 当前显示哪句歌词
      lastLy: '' // 记录当前播放歌词
    }
  },
  computed: {
    needleDeg() { // 留声机-唱臂的位置属性
      return this.playState ? '-7deg' : '-38deg'
    }
  },
  methods: {
    async getSong() { // 获取歌曲详情, 和歌词方法
      const res = await getSongByIdAPI(this.id)
      this.songInfo = res.data.songs[0]
      // 获取-并调用_formatLyr方法, 处理歌词
      const lyrContent = await getLyricByIdAPI(this.id)
      const lyricStr = lyrContent.data.lrc.lyric
      this.lyric = this._formatLyr(lyricStr)
      // 初始化完毕先显示零秒歌词
      this.curLyric = this.lyric[0]
    },
    _formatLyr(lyricStr) {
      // 可以看network观察歌词数据是一个大字符串, 进行拆分.
      let reg = /\[.+?\]/g // 
      let timeArr = lyricStr.match(reg) // 匹配所有[]字符串以及里面的一切内容, 返回数组
      // console.log(timeArr); // ["[00:00.000]", "[00:01.000]", ......]
      let contentArr = lyricStr.split(/\[.+?\]/).slice(1) // 按照[]拆分歌词字符串, 返回一个数组(下标为0位置元素不要,后面的留下所以截取)
      // console.log(contentArr);
      let lyricObj = {} // 保存歌词的对象, key是秒, value是显示的歌词
      timeArr.forEach((item, index) => {
        // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
        let ms = item.split(':')[0].split('')[2] * 60
        // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
        let ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        // 秒数作为key, 对应歌词作为value
        lyricObj[ms + Number(ss)] = contentArr[index]
      })
      // 返回得到的歌词对象(可以打印看看)
      // console.log(lyricObj);
      return lyricObj
    },
    audioStart() { // 播放按钮 - 点击事件
      if (!this.playState) { // 如果状态为false
        this.$refs.audioMusic.play() // 调用audio标签的内置方法play可以继续播放声音
      } else {
        this.$refs.audioMusic.pause() // 暂停audio的播放
      }
      this.playState = !this.playState // 点击设置对立状态
    },
    showLyric() {
      // 监听播放audio进度, 切换歌词显示
      this.$refs.audioMusic.addEventListener('timeupdate', () => {
        let curTime = Math.floor(this.$refs.audioMusic.currentTime)
        // 避免空白出现imageView
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime]
          this.lastLy = this.curLyric
        } else {
          this.curLyric = this.lastLy
        }
      })
    }
  },
  mounted() {
    this.getSong()
    this.showLyric()
    // console.log(this.$route.query.id);
  }
}
</script>

<style scoped>
.header {
  height: 50px;
}
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px); /*模糊背景 */
}
.song-bg::before{ /*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
  content: " ";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom:0;
}
.song-wrapper {
  position: fixed;
  width: 247px;
  height: 247px;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  z-index: 10001;
}
.song-turn {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: 100%;
}
.start-box {
  position: absolute;
  width: 156px;
  height: 156px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-start {
  width: 56px;
  height: 56px;
  background: url("./img/start.png");
  background-size: 100%;
}
.needle {
  position: absolute;
  transform-origin: left top;
  background: url("./img/needle-ab.png") no-repeat;
  background-size: contain;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}
.song-img {
  width: 154px;
  height: 154px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.m-song-h2 {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lrcContent {
  margin-top: 50px;
}
.lrc {
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.left-incon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}
.ani {
  animation: turn 5s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
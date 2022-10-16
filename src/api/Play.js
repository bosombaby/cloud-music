import { request } from "@/utils/request";

// 播放页 - 获取歌曲详情
export const getSongByIdAPI = (id) => request({
  url: `/song/detail?ids=${id}`,
})

// 播放页 - 获取歌词
export const getLyricByIdAPI = (id) => request({
  url: `/lyric?id=${id}`,
})


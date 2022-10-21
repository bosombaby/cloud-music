//首页推荐歌单请求
import { request } from "@/utils/request";

//推荐歌单
export const recommendMusicAPI = params => request({
    url: '/personalized',
    params
})
//最新音乐
export const newMusicAPI = params => request({
    url: '/personalized/newsong',
    params
})
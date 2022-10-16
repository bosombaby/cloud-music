import { request } from "@/utils/request";

//获取热门评论
export const getHotCommentAPI = params => request({
    url: 'comment/hot',
    params
})

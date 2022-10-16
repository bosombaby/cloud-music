//搜索页接口
import { request} from '@/utils/request'
//获取热门搜索
export const hotSearchAPI = params => request({
    url: '/search/hot',
    params
})
//获取搜索结果
export const searchResultAPI = params => request({
    url: '/search',
    params
})

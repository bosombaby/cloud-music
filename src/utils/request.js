//默认请求配置
import axios from "axios";

export const request = axios.create({
    method:'GET',
    baseURL:'http://https://api.vrteam.top'
})

//默认请求配置
import axios from "axios";

export const request = axios.create({
    method:'GET',
    baseURL:'http://localhost:3000'
})

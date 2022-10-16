// 引入Vue
import Vue from 'vue'
// 引入路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
// 引入组件
import Layout from '@/views/Layout'
import HomePage from '@/views/Home'
import SearchPage from '@/views/Search'
import Play from '@/views/Play'
import Comment from '@/views/Comment'


const routes = [
    {
        path: '/',
        redirect:'/layout'
    },
    {
        path: '/layout',
        redirect: '/layout/home',
        component: Layout,
        children: [
            {
                path: 'home',
                component: HomePage,
                meta: {
                    title:'首页'
                },
            },
            {
                path: 'search',
                component: SearchPage,
                meta: {
                    title:'搜索'
                },
            }
        ]
    },
    {
        path: '/play',
        component:Play
    },
    {
        path: '/comment',
        component:Comment
    }
    
]
const router = new VueRouter({ routes })

export default router
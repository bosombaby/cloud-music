import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
// 字体图标
import '@/assets/fonts/TsangerYuYangT_W01_W01.ttf'
//自适应
import '@/mobile/flexible'
//初始化样式
import '@/styles/reset.css'

//引入vant组件库
import { NavBar,Tabbar, TabbarItem, Image as VanImage ,Cell, CellGroup, Icon,Search,Grid, GridItem,PullRefresh,List , Swipe, SwipeItem, Lazyload} from 'vant';
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

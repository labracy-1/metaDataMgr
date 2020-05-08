import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from './components/home'
import standrdList from './components/standrdMgr/standrdList'
import stdrdDetail from './components/standrdMgr/standrdDetail'

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      iconCls: 'el-icon-message',
    },
    {
        path:'/standrd',
        name:'标准管理',
        component:standrdList
    },
    {
      path: "/stdrdDetail/:std_id",
      component: stdrdDetail
  },
  ]
})
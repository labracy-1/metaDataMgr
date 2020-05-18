import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from './components/home'
import standrdList from './components/standrdMgr/standrdList'
import stdrdDetail from './components/standrdMgr/standrdDetail'
import tableList from './components/tableMgr/tableList'
import tableDetail from './components/tableMgr/tableDetail'
import resourceList from './components/resourceDirMgr/resourceList'
import resourceDetail from './components/resourceDirMgr/resourceDetail'
import resDirList from './components/resourceDirMgr/resDirList'
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
    {
      path: "/tableList",
      component: tableList,
    },
    {
      path: "/tableDetail/:table_id",
      component: tableDetail
    },
    {
      path: "/resourceList",
      component: resourceList
    },
    {
      path: "/resourceDetail/:resource_id",
      component: resourceDetail
    },
    {
      path: "/resDirList",
      component: resDirList
    },
  ]
})
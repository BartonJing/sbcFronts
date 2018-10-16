import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login,
      hidden: true,
      children: []
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden: true,
      children: []
    }, {
      path: '/test',
      name: 'test',
      component: test
    }
    /* {path: '*', redirect: '/Home'} *//* {
      path: '/auth/permission/view',
      name: 'permission',
      component: PermissionView
    }, {
      path: '/auth/role/view',
      name: 'role',
      component: RoleView
    }, {
      path: '/auth/user/view',
      name: 'user',
      component: UserView
    } */
  ]
})

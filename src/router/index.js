import Vue from 'vue'
import Router from 'vue-router'
import DbTest from '@/components/DbTest'
import login from '@/components/login'
import main from '@/components/main'
import data from '@/components/data'
import manage from '@/components/manage'
import argu from '@/components/argu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/DbTest',
      name: 'DbTest',
      component: DbTest
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/data',
      name: 'data',
      component: data
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/argu',
      name: 'argu',
      component: argu
    }
  ]
})

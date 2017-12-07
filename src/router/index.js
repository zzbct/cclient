import Vue from 'vue'
import Router from 'vue-router'
import DbTest from '@/components/DbTest'
import main from '@/components/main'
import data from '@/components/data'
import manage from '@/components/manage'

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
    }
  ]
})

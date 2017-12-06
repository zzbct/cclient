import Vue from 'vue'
import Router from 'vue-router'
import DbTest from '@/components/DbTest'
import main from '@/components/main'

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
    }
  ]
})

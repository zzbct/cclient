import Vue from 'vue'
import Router from 'vue-router'
import DbTest from '@/components/DbTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DbTest',
      component: DbTest
    }
  ]
})

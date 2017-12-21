import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Registered from '@/components/Registered'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Registered',
      component: Registered
    },{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/Registered',
      name: 'Registered',
      component: Registered
    }
  ]
})

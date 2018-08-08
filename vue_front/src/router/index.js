import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import List from '@/components/List'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'main', component: Main,
      children : [
        { path: '/list', name: 'list', component: List}

      ]}
  ]
})

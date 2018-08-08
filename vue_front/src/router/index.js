import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import List from '@/components/List'
import Article from '@/components/Article'
import About from '@/components/About'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'main', component: Main,
      children : [
        { path: '/list', name: 'list', component: List},
        { path: '/article', name: 'article', component: Article},
        { path: '/about', name: 'about', component: About},
      ]}
  ]
})

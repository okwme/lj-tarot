import Vue from 'vue'
import Router from 'vue-router'
import Card from '@/components/Card'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:name',
      props: true,
      name: 'Card',
      component: Card
    }
  ]
})

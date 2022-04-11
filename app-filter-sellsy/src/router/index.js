import Vue from 'vue'
import Router from 'vue-router'
import FilterPage from '../components/FilterPage.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'FilterPage',
      component: FilterPage
    }
  ]
})

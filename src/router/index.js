import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import About from '@/components/About'
// import Menu from '@/components/Menu'
// import Veg from '@/components/Veg'
// import Wine from '@/components/Wine'
// import Opening from '@/components/Opening'
// import Contact from '@/components/Contact'
// import Jobs from '@/components/Jobs'
// import Impressum from '@/components/Impressum'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'richard',
      component: null
    },
    {
      path: '/:foo',
      props: true,
      name: 'Index',
      component: Home,
      alias: '*'
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  // }
})

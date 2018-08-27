
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFullPage from 'vue-fullpage.js'
Vue.use(VueFullPage)

var showdown = require('showdown')
var converter = new showdown.Converter()
Object.defineProperty(Vue.prototype, '$converter', { value: converter })

Vue.config.productionTip = false

router.afterEach((to, from) => {
  let goto = to.path.trim().split('/').pop().toLowerCase()
  if (goto === '' || global.noscroll) return
  global.nowaypoint = true
  let timeout = from.name === null ? 100 : 0
  setTimeout(() => {
    scrollToItemId('nav', goto)
  }, timeout)
  setTimeout(() => {
    global.nowaypoint = false
  }, 2000)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})

function scrollToItemId (containerId, scrollToId) {
  var scrollContainer = document.getElementById(containerId)
  var item = document.getElementById(scrollToId)
  if (!scrollContainer || !item) {
    console.log('no scroll item')
    return
  }
  // with animation
  var from = scrollContainer.scrollTop
  var by = item.offsetTop - scrollContainer.scrollTop
  if (from < item.offsetTop) {
    if (item.offsetTop > scrollContainer.scrollHeight - scrollContainer.clientHeight) {
      by = (scrollContainer.scrollHeight - scrollContainer.clientHeight) - scrollContainer.scrollTop
    }
  }

  var currentIteration = 0

  /**
         * get total iterations
         * 60 -> requestAnimationFrame 60/second
         * second parameter -> time in seconds for the animation
         **/
  var animIterations = Math.round(60 * 0.5);

  (function scroll () {
    var value = easeOutCubic(currentIteration, from, by, animIterations)
    scrollContainer.scrollTop = value
    currentIteration++
    if (currentIteration < animIterations) {
      requestAnimationFrame(scroll)
    }
  })()

  // without animation
  // scrollContainer.scrollTop = item.offsetTop;
}

// example easing functions
// function linearEase (currentIteration, startValue, changeInValue, totalIterations) {
//   return changeInValue * currentIteration / totalIterations + startValue
// }
function easeOutCubic (currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue
}

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vueHeadful from 'vue-headful'
import firebase from './firebase'
import Gravatar from 'vue-gravatar'
import { VueMasonryPlugin } from 'vue-masonry'

Vue.use(VueMasonryPlugin)

Vue.component('v-gravatar', Gravatar)

Vue.prototype.$eventBus = new Vue()

Vue.component('vue-headful', vueHeadful)

router.beforeEach((to, from, next) => {
  const currentUser = firebase.firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/Auth')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

Vue.config.productionTip = false
firebase.firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

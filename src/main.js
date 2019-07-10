import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vueHeadful from 'vue-headful';
import "./stylus/main.styl";
import firebase from './firebase'

Vue.prototype.$eventBus = new Vue();


Vue.component('vue-headful', vueHeadful);
Vue.use(Vuetify);

router.beforeEach((to, from, next) => {
  const currentUser = firebase.firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/Auth'); 
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});


Vue.config.productionTip = false;
  firebase.firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});

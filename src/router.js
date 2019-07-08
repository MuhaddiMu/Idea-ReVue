import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import New from "./views/New.vue";
import Ideas from "./views/Ideas.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/Ideas",
      name: "Ideas",
      component: Ideas
    },
    {
      path: "/New",
      name: "New",
      component: New
    }
  ]
});

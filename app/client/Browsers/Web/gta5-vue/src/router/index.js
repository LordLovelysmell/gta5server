import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/registration",
    name: "registration",
    // route level code-splitting
    // this generates a separate chunk (registration.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "registration" */ "../views/Registration.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

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
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    children: [
      {
        path: "/character-editor",
        name: "character-editor",
        component: () =>
          import( /* webpackChunkName: "character-editor" */ '../views/CharacterEditor.vue')
      },
    ],
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

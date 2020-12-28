import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Registration from '../views/Registration.vue'

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
    component: Registration
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
      {
        path: "/atm",
        name: "atm",
        component: () =>
          import( /* webpackChunkName: "atm" */ '../views/ATM.vue')
      },
    ],
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

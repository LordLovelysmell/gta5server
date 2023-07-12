import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    children: [
      {
        path: "/character-editor",
        name: "character-editor",
        component: () =>
          import(
            /* webpackChunkName: "character-editor" */ "../views/CharacterEditor.vue"
          ),
      },
      {
        path: "/dialogue",
        name: "dialogue",
        component: () =>
          import(/* webpackChunkName: "dialogue" */ "../views/Dialogue.vue"),
      },
    ],
  },
  {
    path: "/atm",
    redirect: "/atm/login",
    meta: { layout: "Atm" },
  },
  {
    path: "/atm/login",
    name: "atm:login",
    component: () =>
      import(/* webpackChunkName: "atm" */ "../views/ATM/Login.vue"),
    meta: { layout: "Atm" },
  },
  {
    path: "/atm/biometric-access-info",
    name: "atm:biometric-access-info",
    meta: {
      layout: "Atm",
      breadcrumbs: [
        {
          name: "Главное меню",
          to: { name: "atm:main-menu" },
        },
        {
          name: "Биометрический доступ",
          to: { name: "atm:biometric-access-info" },
        },
      ],
    },
    component: () =>
      import(
        /* webpackChunkName: "atm" */ "../views/ATM/BiometricAccessInfo.vue"
      ),
  },
  {
    path: "/atm/main-menu",
    name: "atm:main-menu",
    meta: {
      layout: "Atm",
      breadcrumbs: [
        {
          name: "Главное меню",
          to: { name: "atm:main-menu" },
        },
      ],
    },
    component: () =>
      import(/* webpackChunkName: "atm" */ "../views/ATM/MainMenu.vue"),
  },
  {
    path: "/atm/withdrawal",
    name: "atm:withdrawal",
    meta: {
      layout: "Atm",
      breadcrumbs: [
        {
          name: "Главное меню",
          to: { name: "atm:main-menu" },
        },
        {
          name: "Снятие наличных",
          to: { name: "atm:withdrawal" },
        },
      ],
    },
    component: () =>
      import(
        /* webpackChunkName: "atm" */ "../views/ATM/DepositWithdrawal.vue"
      ),
  },
  {
    path: "/atm/deposit",
    name: "atm:deposit",
    meta: {
      layout: "Atm",
      breadcrumbs: [
        {
          name: "Главное меню",
          to: { name: "atm:main-menu" },
        },
        {
          name: "Внесение наличных",
          to: { name: "atm:deposit" },
        },
      ],
    },
    component: () =>
      import(
        /* webpackChunkName: "atm" */ "../views/ATM/DepositWithdrawal.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

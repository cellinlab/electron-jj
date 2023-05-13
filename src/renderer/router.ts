import * as VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home/chat',
  },
  {
    path: '/home',
    component: () => import('./window/Home.vue'),
    children: [
      {
        path: 'chat',
        component: () => import('./window/home/Chat.vue'),
      },
      {
        path: 'contact',
        component: () => import('./window/home/Contact.vue'),
      },
      {
        path: 'collection',
        component: () => import('./window/home/Collection.vue'),
      },
    ],
  },
  {
    path: '/setting',
    component: () => import('./window/Setting.vue'),
    children: [
      {
        path: 'account',
        component: () => import('./window/setting/Account.vue'),
      },
    ],
  },
  {
    path: '/userinfo',
    component: () => import('./window/UserInfo.vue'),
  },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

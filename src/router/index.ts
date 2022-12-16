import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import frameIn from './frameIn';
import users from './users';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    redirect: '/index',
    children: [...frameIn],
  },
  ...users,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

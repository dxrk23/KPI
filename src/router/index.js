import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import TheBlog from '../components/TheBlog.vue';
import TheTaskList from '../components/TheTaskList.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: TheBlog,
      },
      {
        path: 'task',
        component: TheTaskList,
      },
      {
        path: 'task/:id',
        component: TheTaskList,
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
  },
];

const router = new createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

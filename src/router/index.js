import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import TheBlog from '../components/TheBlog.vue';
import TheTaskList from '../components/TheTaskList.vue';
import AddPost from '../components/UI/AddPost.vue';
import Roles from '../components/UI/Roles.vue';
import SelectPeriod from '../components/UI/SelectPeriod.vue';
import UsersTable from '../components/UI/UsersTable.vue';
import KPITable from '../components/UI/KPITable.vue';

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
        children: [
          {
            path: '',
            component: SelectPeriod,
          },
          {
            path: 'period/:periodId',
            component: UsersTable,
          },
          {
            path: 'period/:periodId/user/:userId',
            component: KPITable,
          },
        ],
      },
      {
        path: 'roles',
        component: Roles,
      },
      {
        path: 'addPost',
        component: AddPost,
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

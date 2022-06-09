import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import TheBlog from '../components/TheBlog.vue';
import AddPost from '../components/UI/Creators/CreatePost.vue';
import TheIndicators from "../components/TheIndicators.vue";
import CreateIndicator from "../components/UI/Creators/CreateIndicator.vue";
import TheIndicatorRouter from "../components/UI/Routers/TheIndicatorRouter.vue";
import SpecialityRouter from "../components/UI/Routers/SpecialityRouter.vue";
import TheSpecialities from "../components/TheSpecialities.vue";
import TasklistRouter from "../components/UI/Routers/TasklistRouter.vue";


const routes = [
  { path: '', redirect: '/home' },
  { path: '/', redirect: '/home' },

  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: TheBlog,
      },
      {
        path: 'add',
        component: AddPost,
      },

      {
        path: '/speciality',
        component: SpecialityRouter,
        children: [
          {
            path: '',
            component: TheSpecialities
          }
        ]
      },

      {
        path : '/task',
        component: TasklistRouter,
        children: [

        ]
      },

      {
        path: '/indicators',
        component: TheIndicatorRouter,
        children: [
          {
            path: '',
            component: TheIndicators,
          },
          {
            path: 'add',
            component: CreateIndicator
          }
        ]
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

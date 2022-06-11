import {createRouter, createWebHashHistory} from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import TheBlog from '../components/TheBlog.vue';
import AddPost from '../components/UI/Creators/CreatePost.vue';
import TheIndicators from "../components/TheIndicators.vue";
import CreateIndicator from "../components/UI/Creators/CreateIndicator.vue";
import TheIndicatorRouter from "../components/UI/Routers/TheIndicatorRouter.vue";
import SpecialityRouter from "../components/UI/Routers/SpecialityRouter.vue";
import TheSpecialities from "../components/TheSpecialities.vue";
import TaskListRouter from "../components/UI/Routers/TasklistRouter.vue";
import TheSpecialityIndicator from "../components/UI/Speciality/TheSpecialityIndicator.vue";
import CreateRequirement from "../components/UI/Creators/CreateRequirement.vue";
import StaffRouter from "../components/UI/Routers/StaffRouter.vue";


const routes = [
  {path: '', redirect: '/home'},
  {path: '/', redirect: '/home'},

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
          },
          {
            path: 'indicators/:specialityId',
            component: TheSpecialityIndicator
          },
          {
            path: 'createRequirement/:specialityId',
            component: CreateRequirement,
          }
        ]
      },

      {
        path: '/task',
        component: TaskListRouter,
        children: []
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

      {
        path: '/staff',
        component: StaffRouter,
        children: []
      }
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

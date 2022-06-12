import {createRouter, createWebHistory} from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import TheBlog from '../components/TheBlog.vue';
import AddPost from '../components/UI/Creators/CreatePost.vue';
import TheIndicators from "../components/TheIndicators.vue";
import CreateIndicator from "../components/UI/Creators/CreateIndicator.vue";
import TheIndicatorRouter from "../components/UI/Routers/TheIndicatorRouter.vue";
import SpecialityRouter from "../components/UI/Routers/SpecialityRouter.vue";
import TheSpecialities from "../components/TheSpecialities.vue";
import TaskListRouter from "../components/UI/Routers/TaskListRouter.vue";
import TheSpecialityIndicator from "../components/UI/Speciality/TheSpecialityIndicator.vue";
import CreateRequirement from "../components/UI/Creators/CreateRequirement.vue";
import StaffRouter from "../components/UI/Routers/StaffRouter.vue";
import TheTaskList from "../components/TheTaskList.vue";
import TaskListIndicatorTable from "../components/UI/Tables/TaskListIndicatorTable.vue";
import UpdateIndicator from "../components/UI/Updater/UpdateIndicator.vue";
import TheStaff from "../components/TheStaff.vue";


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
        children: [
          {
            path: '',
            component: TheTaskList
          },
          {
            path: 'requirements/:employeeId',
            component: TaskListIndicatorTable
          }
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
          },
          {
            path: 'update/:indicatorId',
            component: UpdateIndicator
          }
        ]
      },

      {
        path: '/staff',
        component: StaffRouter,
        children: [
          {
            path: '',
            component: TheStaff
          }
        ]
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
  history: createWebHistory(),
  routes,
});

export default router;

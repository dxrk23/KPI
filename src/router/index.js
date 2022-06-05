import {createRouter, createWebHashHistory} from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Home from '../views/Home.vue';
import TheBlog from '../components/TheBlog.vue';
import TheTaskList from '../components/TheTaskList.vue';
import AddPost from "../components/UI/AddPost.vue";
import Roles from "../components/UI/Roles.vue";

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
                path: 'roles',
                component: Roles,
            },
            // {
            //   path: 'task/:id',
            //   component: TheTaskList,
            // },
            {
                path: 'addPost',
                component: AddPost
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

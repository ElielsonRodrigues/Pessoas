import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './AppLogin.vue';
import AppSystem from './AppSystem';

const routes = [

    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/appSystem',
        name: 'appSystem',
        component: AppSystem,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./components/Dashboard.vue'),
    },

    {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue'),
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue'),
    },
    {
        path: '/estadosMunicipios',
        name: 'estadosMunicipios',
        component: () => import('./components/EstadosMuncipios.vue'),
    },
    {
        path: '/equipamento',
        name: 'equipamento',
        component: () => import('./components/Equipamento.vue'),
    },
    {
        path: '/pessoa',
        name: 'pessoa',
        component: () => import('./components/Pessoa.vue'),
    },
    {
        path: '/pessoa2',
        name: 'pessoa2',
        component: () => import('./components/Pessoa2.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

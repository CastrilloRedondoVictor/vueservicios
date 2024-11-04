import { createRouter, createWebHistory } from 'vue-router';

import HomeComponent from './components/HomeComponent.vue';
import EmpleadosComponent from './components/EmpleadosComponent.vue';
import OficiosComponent from './components/OficiosComponent.vue';
import EmpleadosDetalle from './components/EmpleadosDetalle.vue';

const routes = [
    {path: '/', component: HomeComponent},
    {path: '/empleados', component: EmpleadosComponent},
    {path: '/oficios', component: OficiosComponent},
    {path: '/empleadosdetalle/:oficio', component: EmpleadosDetalle},
]

const router = createRouter({history: createWebHistory(), routes})

export default router;
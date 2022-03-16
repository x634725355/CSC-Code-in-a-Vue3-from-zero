import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import PhoneUpglide from "@/pages/PhoneUpglide/PhoneUpglide.vue";
import FiveInRow from "@/pages/FiveInRow/FiveInRow.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/home', component: PhoneUpglide },
    { path: '/FiveInRow', component: FiveInRow }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});


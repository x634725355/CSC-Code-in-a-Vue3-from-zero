import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import Game from "@/page/Game/Game.vue";
import PhoneUpglide from "@/pages/PhoneUpglide/PhoneUpglide.vue";
import FiveInRow from "@/pages/FiveInRow/FiveInRow.vue";

export const routes: RouteRecordRaw[] = [
    { path: "/", component: Home, name: "Home" },
    { path: "/PhoneUpglide", component: PhoneUpglide, name: "PhoneUpglide" },
    {
        path: "/Game",
        component: Game,
        children: [
            { path: "/FiveInRow", component: FiveInRow, name: "FiveInRow" },
        ],
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

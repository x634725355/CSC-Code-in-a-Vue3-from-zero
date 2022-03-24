import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import Game from "@/pages/Game/Game.vue";
import PhoneUpglide from "@/pages/PhoneUpglide/PhoneUpglide.vue";
import FiveInRow from "@/pages/FiveInRow/FiveInRow.vue";
import AppleAnime from "@/pages/AppleAnime/AppleAnime.vue";

export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/Home' },
    { path: "/home", component: Home, name: "Home" },
    {
        path: "/Game/",
        name: 'Game',
        component: Game,
        children: [
            { path: "FiveInRow", component: FiveInRow, name: "FiveInRow" },
        ],
    },
    { path: "/AppleAnime", component: AppleAnime, name: "AppleAnime" },
    { path: "/PhoneUpglide", component: PhoneUpglide, name: "PhoneUpglide" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

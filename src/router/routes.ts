import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import Game from "@/pages/Game/Game.vue";
import FiveInRow from "@/pages/Game/FiveInRow/FiveInRow.vue";
import ChineseChess from "@/pages/Game/ChineseChess/ChineseChess.vue";

import PhoneUpglide from "@/pages/PhoneUpglide/PhoneUpglide.vue";
import AppleAnime from "@/pages/AppleAnime/AppleAnime.vue";

import Demo from "@/pages/Demo/Demo.vue";

export const routes: RouteRecordRaw[] = [
    { path: "/", redirect: "/Home" },
    { path: "/home", component: Home, name: "首页" },
    {
        path: "/Game/",
        name: "游戏",
        component: Game,
        children: [
            {
                path: "FiveInRow",
                component: import("@/pages/Game/FiveInRow/FiveInRow.vue"),
                name: "污渍棋",
            },
            {
                path: "ChineseChess",
                component: import("@/pages/Game/ChineseChess/ChineseChess.vue"),
                name: "象棋",
            },
        ],
    },
    {
        path: "/AppleAnime",
        component: import("@/pages/AppleAnime/AppleAnime.vue"),
        name: "🍎 动画",
    },
    { path: "/PhoneUpglide", component: PhoneUpglide, name: "PhoneUpglide" },
    { path: "/Demo", component: Demo, name: "Demo" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

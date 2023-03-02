import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import Home from "@/pages/Home/Home.vue";
import Game from "@/pages/Game/Game.vue";
// import FiveInRow from "@/pages/Game/FiveInRow/FiveInRow.vue";
import ChineseChess from "@/pages/Game/ChineseChess/ChineseChess.vue";
import Upload from "@/pages/Upload/Upload.vue";
import AppleAnime from "@/pages/AppleAnime/AppleAnime.vue";

import Demo from "@/pages/Demo/Demo.vue";

export const routes: RouteRecordRaw[] = [
    { path: "/", redirect: "/Home" },
    { path: "/home", component: Home, name: "首页" },
    {
        path: "/Game/",
        name: "游戏",
        component: import("@/pages/Game/ChineseChess/ChineseChess.vue"),
        children: [
            {
                path: "FiveInRow",
                component: import("@/pages/Game/FiveInRow/FiveInRow.vue"),
                name: "五子棋",
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
        component: AppleAnime,
        name: "🍎 动画",
    },
    { path: "/Upload", component: Upload, name: "Upload" },
    { path: "/Demo", component: Demo, name: "Demo" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

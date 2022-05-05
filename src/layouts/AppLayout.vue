<script setup lang="ts">
import { ref, onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import { routes } from "@/router/routes";

const drawerLeft = ref(true);

onMounted(() => {});
</script>

<template>
    <div class="layout">
        <q-layout
            view="hhh LpR lff"
            container
            style="height: 100vh"
            class="shadow-2 rounded-borders"
        >
            <q-header reveal class="header">
                <q-toolbar>
                    <q-btn
                        flat
                        @click="drawerLeft = !drawerLeft"
                        round
                        dense
                        icon="menu"
                    />
                    <q-toolbar-title>澄三彩的米奇妙妙屋</q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-drawer
                v-model="drawerLeft"
                :width="200"
                :breakpoint="700"
                bordered
                class="bg-grey-3"
            >
                <q-scroll-area class="fit">
                    <div class="q-pa-sm">
                        <Menu :routes="routes" :deep-index="0"></Menu>
                    </div>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page class="q-pa-md">
                    <router-view></router-view>
                </q-page>

                <q-page-scroller position="bottom-right">
                    <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>
            </q-page-container>
        </q-layout>
    </div>
</template>

<style lang="less" scoped>
.header {
    background-color: aliceblue;
    color: black;
}
</style>

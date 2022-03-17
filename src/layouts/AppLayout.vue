<script setup lang="ts">
import { ref, onMounted } from "vue"
import Sidebar from "@/components/Sidebar.vue";
import { routes } from "@/router/routes";

const drawerLeft = ref(true)

function touchmoveHandle(event: TouchEvent) {
    console.log('move', event)
}

function touchstartHandle(event: TouchEvent) {
    console.log('start', event);
}

function touchendHandle(event: TouchEvent) {
    console.log('end', event);
}

onMounted(() => {
    // document.body.addEventListener('touchstart', touchstartHandle)
    // document.body.addEventListener('touchend', touchendHandle)
    // document.body.addEventListener('touchmove', touchmoveHandle)
});

</script>

<template>
    <div class="layout">
        <q-layout
            view="hhh LpR lff"
            container
            style="height: 100vh"
            class="shadow-2 rounded-borders"
        >
            <q-header reveal class="bg-black">
                <q-toolbar>
                    <q-btn
                        flat
                        @click="drawerLeft = !drawerLeft"
                        round
                        dense
                        icon="menu"
                    />
                    <q-toolbar-title>Header</q-toolbar-title>
                </q-toolbar>
            </q-header>

            <!-- <q-footer>
                <q-toolbar>
                    <q-toolbar-title>Footer</q-toolbar-title>
                </q-toolbar>
            </q-footer> -->

            <q-drawer
                v-model="drawerLeft"
                :width="200"
                :breakpoint="700"
                bordered
                class="bg-grey-3"
            >
                <q-scroll-area class="fit">
                    <div class="q-pa-sm">
                        <Sidebar></Sidebar>
                    </div>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page style="padding-top: 60px" class="q-pa-md">
                    <router-view></router-view>

                    <q-page-sticky
                        position="top"
                        expand
                        class="bg-accent text-white"
                    >
                        <q-toolbar>
                            <q-btn flat round dense icon="map" />
                            <q-toolbar-title>Title</q-toolbar-title>
                        </q-toolbar>
                    </q-page-sticky>
                </q-page>

                <q-page-scroller position="bottom-right">
                    <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>
            </q-page-container>
        </q-layout>
    </div>
</template>

<style lang="less"></style>

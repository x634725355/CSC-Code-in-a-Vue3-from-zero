<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import AppLayout from "./layouts/AppLayout.vue";

const route = useRoute();
const app = 1111
const isHome = ref(false);

watch(route, (newValue, oldValue) => {
    isHome.value = newValue.name === "首页";
});
</script>

<template>
    <router-view v-if="isHome"></router-view>
    <AppLayout v-if="!isHome" />
</template>

<style></style>

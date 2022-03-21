<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import AppLayout from "./layouts/AppLayout.vue";

const route = useRoute();

const isHome = ref(false);

watch(route, (newValue, oldValue) => {
    isHome.value = newValue.name === 'Home';
});

</script>

<template>
    <router-view v-show="isHome" ></router-view>
    <AppLayout v-show="!isHome" />
</template>

<style>
</style>

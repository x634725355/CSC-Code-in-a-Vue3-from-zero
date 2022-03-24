<script lang="ts" setup>
import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { routes } from "@/router/routes";

</script>

<template>
    <div class="Game">
        Game momo 
        <router-view></router-view>
    </div>
</template>

<style lang="less" scoped>
.Game {
}
</style>

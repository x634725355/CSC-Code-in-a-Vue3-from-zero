<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { routes } from "@/router/routes";

</script>

<template>
    <div class="Game">
        Game
        <router-view></router-view>
    </div>
</template>

<style lang="less" scoped>
.Game {
}
</style>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent({
    loader: () => import("./Arknights/Arknights.vue"),
    delay: 2000,
});
</script>

<template>
    <div class="Home">
        <AsyncComp />
    </div>
</template>
<style lang="less" scoped>
.Home {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: #424642;
    cursor: url(src/assets/mouse.png) 4 4, default;
}

</style>

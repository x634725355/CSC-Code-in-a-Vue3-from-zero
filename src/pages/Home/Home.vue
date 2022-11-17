<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent({
    loader: () => import("./Arknights/Arknights.vue"),
    delay: 2000
})


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
    padding: 0px 10%;
    position: relative;
    background-color: #424642;
}
</style>

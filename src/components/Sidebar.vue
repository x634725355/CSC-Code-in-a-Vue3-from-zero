<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { RouteRecordRaw } from "vue-router";

const props = defineProps<{ routes: RouteRecordRaw[] }>();



</script>

<template>
    <div class="Sidebar">
        <template v-for="item in props.routes" ></template>
    </div>
</template>

<style lang="less" scoped>
.Sidebar {
}
</style>

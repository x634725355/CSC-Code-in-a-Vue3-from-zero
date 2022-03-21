<script lang="ts" setup>
import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";

const props = defineProps<{ routes: RouteRecordRaw[], deepIndex: number, frontRouting?: string }>()

const deepStyle = ref(props.deepIndex * 10);

const prefix = ref(props.frontRouting ? props.frontRouting : '');

</script>

<template>
    <div class="Menu" :style="{ marginLeft: `${deepStyle}px` }" >
        <div v-for="item in props.routes" >
            <!-- 图标区 -->
            <!-- <span>图标区</span> -->
            <router-link class="link" :to="prefix + item.path" >{{ item.name }}</router-link>
            <template v-if="item.children" >
                <Menu :routes="item.children" :deepIndex="deepIndex + 1" :frontRouting="item.path" ></Menu>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.Menu {
    font-size: 18px;
    .link {
        text-decoration: none;
        color: black;

        &:hover {
            text-decoration: underline;
            text-decoration-color: var(--mainColor);
            text-decoration-thickness: 2px;
        }
    }
}
</style>

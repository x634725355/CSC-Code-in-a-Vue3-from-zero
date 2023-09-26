<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { QInput, QBtn } from "quasar";
import { routes } from "@/router/routes";

const user = ref('')
const password = ref('')

</script>

<template>
    <div class="ChatRoom">
        ChatRoom
        <div>
            <QInput v-model:model-value="user" ></QInput>
            <QInput v-model:model-value="password" type="password" ></QInput>
            <div>
                <QBtn>登陆</QBtn>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ChatRoom {
}
</style>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { QInput, QBtn } from "quasar";

const user = ref('')
const password = ref('')

</script>

<template>
    <div class="ChatRoom">
        Chat
        <div contenteditable="true" >

        </div>
    </div>
</template>

<style lang="less" scoped>
.ChatRoom {
}
</style>

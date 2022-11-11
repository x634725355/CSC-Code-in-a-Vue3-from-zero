<script lang="ts" setup>
import { useRouter } from "vue-router";
import Arknights from "./Arknights/Arknights.vue";

const router = useRouter();
</script>

<template>
    <div class="Home">
        <main>
            <q-btn
                @click="() => router.push('/Game/FiveInRow')"
                class="go"
                text-color="black"
                label="GET START!"
            />
        </main>
        <Arknights />
    </div>
</template>
<style lang="less" scoped>
.Home {
    width: 100vw;
    height: 100vh;
    padding: 0px 10%;
    position: relative;
    background-color: #424642;


    > main {
        position: relative;
        top: 50%;
        left: 50%;
        // z-index: 1;
        transform: translate(-50%, -50%);
        display:  inline-block;

        .go {
            background-color: var(--goldenColor);
        }
    }
}
</style>

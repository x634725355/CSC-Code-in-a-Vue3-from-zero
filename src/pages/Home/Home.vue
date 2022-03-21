<script lang="ts" setup>
import { useRouter } from "vue-router";

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
    </div>
</template>
<style lang="less" scoped>
.Home {
    width: 100vw;
    padding: 0px 10%;

    > main {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .go {
            background-color: var(--goldenColor);
        }
    }
}
</style>

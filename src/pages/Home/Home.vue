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
    height: 100vh;
    padding: 0px 10%;
    position: relative;
    background-color: #424642;

    &::before,
    &::after {
        content: "";
        width: 50%;
        height: 3px;
        background-color: var(--goldenColor);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        animation-name: schedule;
        animation-duration: 2s;
        animation-timing-function: linear;
    }

    &::before {
        left: 0px;
    }

    &::after {
        right: 0px;
    }

    > main {
        position: relative;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
        display:  inline-block;

        .go {
            background-color: var(--goldenColor);
        }
    }

    @keyframes schedule {
        0% {
            width: 0%;
        }

        100% {
            width: 50%;
        }
    }
}
</style>

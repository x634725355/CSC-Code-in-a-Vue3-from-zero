<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loadingNum = ref(0);
const loadingId = ref(0);

const complete = ref(false);

const AsyncComp = defineAsyncComponent({
    loader: () => import("./Arknights/Arknights.vue"),
    delay: 1000,
});

function loading() {
    let startTime = performance.now();
    loadingNum.value = Math.floor(startTime) / 10;

    if (loadingNum.value >= 100) {
        loadingNum.value = 100;
        complete.value = true;
        window.cancelAnimationFrame(loadingId.value);
        return;
    }

    loadingId.value = window.requestAnimationFrame(loading);
}

onMounted(() => {
    loadingId.value = window.requestAnimationFrame(loading);
});

onUnmounted(() => {
    if (loadingId.value) {
        window.cancelAnimationFrame(loadingId.value);
    }
});
</script>

<template>
    <div class="Home">
        <div
            class="loading animate__animated"
            :class="{ loadingComplete: complete }"
        >
            <div class="loadingBarGroup">
                <div
                    class="loadingBar left"
                    :style="{ width: `${loadingNum / 2}%` }"
                ></div>
                <div
                    class="loadingBar right"
                    :style="{ width: `${loadingNum / 2}%` }"
                ></div>
            </div>
            <div class="loadingContent">
                <div class="loadingProgress">
                    <span class="loadingProgressNum">{{ loadingNum }}</span
                    ><span class="loadingProgressUnit">%</span>
                </div>
            </div>
        </div>

        <main class="box animate__animated q-pa-md">
            <div class="header"></div>

            <div class="row content">
                <div class="col left">
                    <q-btn @click="() => router.push('/Game/FiveInRow')" color="white" text-color="black" label="START" />
                </div>
                <div class="col right"><AsyncComp /></div>
            </div>
        </main>
    </div>
</template>
<style lang="less" scoped>
.Home {
    // cursor: url(src/assets/mouse.png) 4 4, default;
    position: absolute;
    overflow: hidden;
    background-color: #424642;
    height: 100%;
    width: 100%;

    .box {
        height: 100%;
        opacity: 0;
        animation: fadeIn 1s 1.8s forwards;
        display: flex;
        flex-direction: column;

        .header {
            height: 60px;
            margin-bottom: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

        .content {
            flex: 1;

            .left {
                display: flex;
                justify-content: center;
                align-items: center;
                .article {
                    height: 80px;
                    line-height: 80px;
                    color: #fff;
                }
            }

            .right {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

.loading {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.loadingComplete {
    animation: fadeOut 1s 0.8s forwards;
}

.loadingContent {
    .loadingProgress {
        margin-top: 40px;
        font-size: 1em;
        text-align: center;
        color: #fff;
    }
}

.loadingBarGroup {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 0;

    .loadingBar.left::after {
        box-shadow: 0.5px 0 8px 2px #fff, 0.5px 0 2px 1px #fff;
        right: 0;
    }

    .loadingBar.left::before {
        box-shadow: 10px 0 15px 1px #fff;
        right: 0;
    }

    .loadingBar.right::after {
        box-shadow: -0.5px 0 8px 2px #fff, -0.5px 0 2px 1px #fff;
        left: 0;
    }
    .loadingBar.right::before {
        box-shadow: -10px 0 15px 1px #fff;
        left: 0;
    }

    .loadingBar::before {
        width: 20px;
    }
    .loadingBar::after {
        width: 1px;
    }
    .loadingBar::before,
    .loadingBar::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        height: 1px;
        transition: box-shadow 300ms 100ms;
    }

    .left,
    .right {
        position: absolute;
        border-bottom: 1px solid #fff;
        width: 0%;
        background-color: pink;
        transition: width 600ms;
    }

    .right {
        right: 0;
    }
}

@media screen and (max-width: 400px) {
    .content {
        flex-direction: column;
    }
}
</style>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import Footer from "@/layouts/Footer.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loadingNum = ref(0);
const loadingId = ref(0);

const complete = ref(false);

const AsyncComp = defineAsyncComponent({
    loader: () => import("./Arknights/Arknights.vue"),
    delay: 1000,
});

</script>

<template>
    <div class="Home">
        <main class="box animate__animated q-pa-md">
            <div class="header"></div>

            <div class="row content">
                <div class="col left">
                    <q-btn @click="() => router.push('/Game/FiveInRow')" color="white" text-color="black" label="START" />
                </div>
                <!-- <div class="col right"><AsyncComp /></div> -->
            </div>
        </main>
        <Footer />
    </div>
</template>
<style lang="less" scoped>
.Home {
    display: flex;
    height: 100vh;
    flex-direction: column;
    .box {
        flex: 1;
        height: auto;
        // opacity: 0;
        // animation: fadeIn 1s 1.8s forwards;
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

</style>

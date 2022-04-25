<script lang="ts" setup>
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";

const copyImg = ref<HTMLCanvasElement>();

async function start() {
    const cutOut = document.querySelector(".cutOut")! as HTMLElement;

    const canvas = await html2canvas(cutOut, {});

    const ctx = canvas.getContext("2d");

    console.log("big", ctx?.getImageData(0, 0, 85, 90));

    copyImg.value = canvas;

    cutOut.appendChild(copyImg.value);

    const copy = document.querySelector("#copy") as HTMLCanvasElement;

    const copyCtx = copy.getContext("2d");

    copyCtx?.putImageData(ctx?.getImageData(0, 0, 170, 80)!, 0, 0);
}

onMounted(() => {
    start();
});
</script>

<template>
    <div class="Demo">
        <div class="cutOut">
            <img src="@/assets/Luxanna.jpg" alt="" />
        </div>

        <canvas id="copy"></canvas>
    </div>
</template>

<style lang="less" scoped>
.Demo {
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";

const copyImg = ref<HTMLCanvasElement>();

async function start() {
    const cutOut = document.querySelector(".cutOut")! as HTMLElement;

    const canvas = await html2canvas(cutOut, {});
    copyImg.value = canvas;

    const ctx = canvas.getContext("2d");

    let temp = ctx?.getImageData(0, 0, 170, 80);

    cutOut.appendChild(copyImg.value);

    const copy = document.querySelector("#copy") as HTMLCanvasElement;

    const copyCtx = copy.getContext("2d");

    const changeData = new ImageData(temp!.data, 170, 80);

    changeData.data.set(temp!.data.slice(0, 40000), 2.11)

    copyCtx?.putImageData(changeData, 0, 0);
    console.log("changeData", temp);
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

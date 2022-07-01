<script lang="ts" setup>
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";

const text = ref('');
const copyImg = ref<HTMLCanvasElement>();

async function start() {
    const cutOut = document.querySelector(".cutOut")! as HTMLElement;

    const canvas = await html2canvas(cutOut, {
        height: 180,
        width: 170,
        scale: 1
    });
    copyImg.value = canvas;

    const ctx = canvas.getContext("2d");

    let temp = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    console.log("changeData", temp);

    cutOut.appendChild(copyImg.value);

    const copy = document.querySelector("#copy") as HTMLCanvasElement;

    const copyCtx = copy.getContext("2d");

    const changeData = new ImageData(temp!.data, canvas.width, canvas.height);

    changeData.data.set(temp!.data.slice(0, 122388), 3);

    copyCtx?.putImageData(changeData, 0, 0);
}

function clickHandle(event: MouseEvent) {
    event.preventDefault();
}

function moveEnd(obj: MouseEvent) {
    
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

        <canvas width="170" height="180" id="copy"></canvas>

        <div >
            <input v-model="text" @click="moveEnd" class="momo" type="text">
        </div>
    </div>
</template>

<style lang="less" scoped>
.Demo {
}

.momo {
    padding: 8px;
    text-align: end;
    border: 1px solid skyblue;
    font-size: 18px;
    height: 30px;
    width: 200px;
}

</style>

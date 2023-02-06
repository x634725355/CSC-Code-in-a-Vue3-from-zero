<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import logo_kazimierz from "@/assets/logo_kazimierz.png";
import logo_rhine from "@/assets/logo_rhine.png";
import logo_rhodes from "@/assets/logo_rhodes.png";
import logo_victoria from "@/assets/logo_victoria.png";
import logo_yan from "@/assets/logo_yan.png";
import { ParticleCanvas } from "./ParticleCanvas";
import { width, height, LogoImg } from "./LogoImg";

const oneImage = { label: "kazimierz", url: logo_kazimierz };
// 准备logo数据
const logos = reactive([
    { label: "rhine", url: logo_rhine },
    { label: "kazimierz", url: logo_kazimierz },
    { label: "rhodes", url: logo_rhodes },
    { label: "victoria", url: logo_victoria },
    { label: "yan", url: logo_yan },
]);

const timeout = ref<number>();
const animationTime = reactive({ time: ref(0) });
const lastTime = ref<number>(+new Date());
/** 存储由logos生成的logoImg对象 */
const logoImgs = <LogoImg[]>reactive([]);
// 获取canvas画布
const canvas = ref<HTMLCanvasElement | null>(null);
// 获取上下文
let context = ref<CanvasRenderingContext2D | null>(null);
/** canvas实体对象 */
let particleCanvas = ref<ParticleCanvas>();

function canvasMove(event: MouseEvent) {
    const { offsetX, offsetY } = event;

    particleCanvas.value!.pointerX = offsetX;
    particleCanvas.value!.pointerY = offsetY;
}

async function asyncInitImage() {
    // 将logo数据实例化为logoImg对象
    for (let i = 0; i < logos.length; i++) {
        logoImgs.push(new LogoImg(logos[i].url, logos[i].label));
    }

    return true;
}

function animationForEach() {
    const nowTime = +new Date();

    if (nowTime - lastTime.value >= 7000) {
        const tempLogoImg = logoImgs.shift()!;
        particleCanvas.value!.changeImg(tempLogoImg);
        logoImgs.push(tempLogoImg);
        lastTime.value = nowTime;
    }

    timeout.value = window.requestAnimationFrame(animationForEach);
}

function start() {
    if (!canvas.value) {
        return false;
    }
    asyncInitImage().then(() => {
        timeout.value = window.requestAnimationFrame(animationForEach);
    });

    const tempLogoImg = new LogoImg(oneImage.url, oneImage.label);

    context.value = canvas.value.getContext("2d");
    canvas.value.addEventListener("mousemove", canvasMove);
    particleCanvas.value = new ParticleCanvas(canvas.value);
    particleCanvas.value.changeImg(tempLogoImg);
    particleCanvas.value!.drawCanvas(animationTime);
}

onMounted(() => {
    if (timeout.value) {
        window.cancelAnimationFrame(timeout.value);
    }
    if (animationTime.time) {
        window.cancelAnimationFrame(animationTime.time);
    }

    start();
});

onUnmounted(() => {
    if (timeout.value) {
        window.cancelAnimationFrame(timeout.value);
    }
    if (animationTime.time) {
        window.cancelAnimationFrame(animationTime.time);
    }
});
</script>

<template>
    <div class="Arknights">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>
<style lang="less" scoped>
.Arknights {
}
</style>

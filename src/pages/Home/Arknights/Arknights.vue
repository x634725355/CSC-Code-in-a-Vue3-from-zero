<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { ParticleCanvas } from "./ParticleCanvas";
import { width, height, LogoImg } from "./LogoImg";

const oneImage = { label: "kazimierz", url: 'http://csc-images.oss-cn-hangzhou.aliyuncs.com/csc/image/07881d89cca875a99daa.png' };
// 准备logo数据
const logos = reactive([
    { label: "rhine", url: 'http://csc-images.oss-cn-hangzhou.aliyuncs.com/csc/image/31aa10b8fea8a1b917bb.png' },
    { label: "rhodes", url: 'http://csc-images.oss-cn-hangzhou.aliyuncs.com/csc/image/bb9bf6bbb5ab1aaad989.png' },
    { label: "victoria", url: 'http://csc-images.oss-cn-hangzhou.aliyuncs.com/csc/image/db9961a8e0a81b883fbb.png' },
    { label: "yan", url: 'http://csc-images.oss-cn-hangzhou.aliyuncs.com/csc/image/bcabcabbca9b839a4d9a.png' },
    { label: "kazimierz", url: 'http://csc-images.oss-cn-hangzhou.aliyuncs.com/csc/image/07881d89cca875a99daa.png' },
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

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import logo_kazimierz from "@/assets/logo_kazimierz.png";
import logo_rhine from "@/assets/logo_rhine.png";
import logo_rhodes from "@/assets/logo_rhodes.png";
import logo_victoria from "@/assets/logo_victoria.png";
import logo_yan from "@/assets/logo_yan.png";
import { ParticleCanvas } from "./ParticleCanvas";
import { Particle } from "./Particle";
import { width, height, LogoImg } from "./LogoImg";

// 准备logo数据
const logos = reactive([
    { label: "kazimierz", url: logo_kazimierz },
    { label: "rhine", url: logo_rhine },
    { label: "rhodes", url: logo_rhodes },
    { label: "victoria", url: logo_victoria },
    { label: "yan", url: logo_yan },
]);

/** 存储由logos生成的logoImg对象 */
const logoImgs = <LogoImg[]>reactive([]);
// 获取canvas画布
const canvas = ref<HTMLCanvasElement | null>(null);
// 获取上下文
let context = ref<CanvasRenderingContext2D | null>(null);
/** canvas实体对象 */
let particleCanvas = ref<ParticleCanvas>();

function getImageData(src: string) {}

function start() {
    if (canvas.value) {
        context.value = canvas.value.getContext("2d");
        particleCanvas.value = new ParticleCanvas(canvas.value);
        particleCanvas.value.changeImg(logoImgs[0]);
        particleCanvas.value.drawCanvas();
    }
}

// 将logo数据实例化为logoImg对象
for (let item of logos) {
    logoImgs.push(new LogoImg(item.url, item.label));
}

onMounted(() => {
    setTimeout(() => {
        start();
    }, 2000)
});
</script>

<template>
    <div class="Arknights">
        <main>
            <canvas ref="canvas" :width="width" :height="height"></canvas>
        </main>
    </div>
</template>
<style lang="less" scoped>
.Arknights {
}
</style>

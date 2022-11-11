<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import logo_kazimierz from "@/assets/logo_kazimierz.png";
import logo_rhine from "@/assets/logo_rhine.png";
import logo_rhodes from "@/assets/logo_rhodes.png";
import logo_victoria from "@/assets/logo_victoria.png";
import logo_yan from "@/assets/logo_yan.png";
import { Particle } from './Particle';

// 准备logo数据
const logos = reactive([
  { label: "kazimierz", url: logo_kazimierz },
  { label: "rhine", url: logo_rhine },
  { label: "rhodes", url: logo_rhodes },
  { label: "victoria", url: logo_victoria },
  { label: "yan", url: logo_yan },
]);

// 设置粒子动画时长
const animateTime = 30;

// 设置画布大小
const width = 400,
  height = 400;

const temp_canvas = ref<HTMLCanvasElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

function getImageData(src: string) {
    let img = new Image();
    img.src = src;
    // 获取图片数据
    img.onload = () => {

        const imgW = width;
        const imgH = ~~(width * (img.height / img.width));

        console.log("%c Line:35 🍬", "color:#b03734", imgH);

        // 获取图片像素数据
        // const temp_canvas = document.createElement('canvas');
        const temp_ctx = temp_canvas.value?.getContext('2d');

        temp_ctx?.drawImage(img, 0, 0, imgW, imgH);
        const imgData = temp_ctx?.getImageData(0, 0, imgW, imgH).data; // 获取像素点

        // temp_ctx?.clearRect(0, 0, width, height);

        // 筛选像素点
        for(let y = 0; y < imgH; y += 5) {
            for(let x = 0; x < imgW; x += 5) {
                // 像素点的索引
                const index = (x + y * imgW) * 4;
                // 在数组中对应的值
                const r = imgData![index];
                const g = imgData![index + 1];
                const b = imgData![index + 2];
                const a = imgData![index + 3];
                const sum = r + g + b + a;
                // 筛选条件
                if (sum >= 100) {
                    const particle = new Particle({ totalX: x, totalY: y, color: [r, g, b, a], time: animateTime});
                    // this.
                }
            }
        }
        
    }
}


onMounted(() => {
    getImageData(logos[0].url);
})

</script>

<template>
    <div class="Arknights">
        <main>
            <canvas ref="temp_canvas" :width="width" :height="height" ></canvas>
            <canvas ref="canvas" :width="width" :height="height" ></canvas>
        </main>
    </div>
</template>
<style lang="less" scoped>
.Arknights {

}
</style>

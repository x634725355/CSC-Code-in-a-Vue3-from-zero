<script lang="ts" setup>
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";

interface TextPixelsType {
    x: number;
    y: number;
}

interface ParticlesType {
    x: number;
    y: number;
    startX: number;
    startY: number;
    counter: number;
    color: string;
    speed: number;
    life: number;
    waveSize: number;
}

const text = ref("");
const copyImg = ref<HTMLCanvasElement>();

async function start() {
    const cutOut = document.querySelector(".cutOut")! as HTMLElement;

    const canvas = await html2canvas(cutOut, {
        height: 180,
        width: 170,
        scale: 1,
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

// canvas 渲染咯
const textCanvas = ref<HTMLCanvasElement | null>(null);
const particlesCanvas = ref<HTMLCanvasElement | null>(null);
const heading = ref<HTMLElement | null>(null);

let textCtx: CanvasRenderingContext2D | null | undefined;
let particlesCtx: CanvasRenderingContext2D | null | undefined;
let particles: ParticlesType[] = [];
let textPixels: TextPixelsType[] = [];
let color = 0;
const colors = [
    "#FF1900",
    "#FF8800",
    "#FFCC00",
    "#FFFA00",
    "#D8FF00",
    "#B6FF00",
    "#00FF2E",
    "#00FFA5",
    "#00FFE1",
    "#00DDFF",
    "#057DFF",
    "#9800FF",
    "#D400FF",
    "#FF00E4",
    "#FF008C",
];
const width = ref(0);
const height = ref(0);
const maxParticles = 5000;
const increase = (Math.PI * 2) / 100;

function onClickHandle(event: MouseEvent) {
    console.log("event", event);
}

function initCanvas() {
    textCtx = textCanvas.value?.getContext("2d");
    particlesCtx = particlesCanvas.value?.getContext("2d");
    const headerData = heading.value?.getBoundingClientRect();

    width.value = headerData!.width;
    height.value = headerData!.height;

    textCanvas.value!.style.width = `${width.value}px`;
    textCanvas.value!.style.height = `${height.value}px`;
    textCanvas.value!.style.position = "absolute";
    textCanvas.value!.style.top = `0px`;
    textCanvas.value!.style.left = `${width.value}px`;
    particlesCanvas.value!.style.width = `${width.value * 2}px`;
    particlesCanvas.value!.style.height = `${height.value * 2}px`;
    particlesCanvas.value!.style.position = "absolute";
    particlesCanvas.value!.style.top = `-${height.value / 2}px`;
    particlesCanvas.value!.style.left = `-${width.value / 2}px`;

    textCtx!.textAlign = "left";
    textCtx!.textBaseline = "top";
    textCtx!.font = "42px 'Microsoft YaHei'";
    textCtx!.fillStyle = "#222222";
    textCtx?.fillText("澄三彩", 0, 10);
}

function getTextImageData() {
    const pix = textCtx!.getImageData(
        0,
        0,
        width.value * 2,
        height.value * 2
    ).data;

    for (let i = pix.length; i >= 0; i -= 4) {
        if (pix[i] != 0) {
            let x = ((i / 8) % width.value) * 2;
            let y = Math.floor(Math.floor(i / width.value) / 8);

            if (x && y) {
                textPixels.push({
                    x,
                    y,
                });
            }
        }
    }

    console.log("pix", textPixels);
}

function resetParticle(p: ParticlesType) {
    p.x = p.startX;
    p.y = p.startY;
    p.counter = 0;
    p.color = colors[color];
}

function launchParticle(x: number, y: number) {
    const p = {
        x,
        y,
        startX: x,
        startY: y,
        speed: 0.1,
        waveSize: 5 + Math.random() * 5,
        counter: 0,
        color: colors[color],
        life: 4 + Math.random() * 6,
    };

    particles.push(p);
}

function launchParticles(i: number) {
    const d = 20;
    for (let pi = i; pi < textPixels.length; pi += d) {
        launchParticle(
            textPixels[pi].x - 2 + width.value,
            textPixels[pi].y - 2 + height.value
        );
    }

    if (particles.length < maxParticles) {
        let ni = i + 1;
        if (ni > d) ni = 0;
        requestAnimationFrame(() => launchParticles(ni));
    }
}

function clearCanvas() {
    particlesCtx!.clearRect(0, 0, width.value * 2, height.value * 2);
}

function animate(t: number) {
    clearCanvas();

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        particlesCtx!.fillStyle = p.color;
        p.counter += increase;
        p.x += p.speed;
        // p.y = p.y - (Math.sin(p.counter) / 25) * p.waveSize;
        p.y -= p.speed;

        particlesCtx!.fillRect(p.x, p.y, 1, 1);
        if (p.counter > p.life) resetParticle(p);
    }

    requestAnimationFrame(animate);
}

function changeColor() {
    if (color === colors.length - 1) {
        color = 0;
    } else {
        color++;
    }

    setTimeout(changeColor, 700);
}

onMounted(() => {
    start();
    initCanvas();
    getTextImageData();
    launchParticles(0);
    requestAnimationFrame(animate);
    changeColor();
});
</script>

<template>
    <div class="Demo">
        <div class="cutOut">
            <img src="@/assets/Luxanna.jpg" alt="" />
        </div>

        <canvas width="170" height="180" id="copy"></canvas>

        <div class="box">
            <div class="technology" ref="heading">澄三彩</div>
            <canvas
                v-on:click="onClickHandle"
                width="126"
                height="63"
                ref="textCanvas"
            ></canvas>
            <canvas width="252" height="126" ref="particlesCanvas"></canvas>
        </div>
    </div>
</template>

<style lang="less" scoped>
.Demo {
    .box {
        margin-top: 100px;
        margin-left: 100px;
        position: relative;
    }
    .technology {
        font-size: 21px;
        font-weight: normal;
        position: relative;
        z-index: 100;
        display: inline-block;
    }
}
</style>

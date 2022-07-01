<script setup lang="ts">
import { ref, onMounted } from "vue";
import Menu from "@/components/Menu.vue";
import { routes } from "@/router/routes";

const drawerLeft = ref(true);

// canvas 渲染咯
const textCanvas = ref<HTMLCanvasElement | null>(null);
const particlesCanvas = ref<HTMLCanvasElement | null>(null);
const heading = ref<HTMLElement | null>(null);

let textCtx: CanvasRenderingContext2D | null | undefined;
let particlesCtx: CanvasRenderingContext2D | null | undefined;
let width: number;
let height: number;
let headingLeft: number, headingTop: number;
const padding = 200;
const particles: any[] = [];
let textPixels: any[];
const increase = (Math.PI * 2) / 100;
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
let color = 0;
const rotation = 0.3;
const maxParticles = 5000;

function addCanvases() {
    textCtx = textCanvas.value?.getContext("2d");

    particlesCtx = textCanvas.value?.getContext("2d");

    textCanvas.value!.style.position = "absolute";

    const rect = heading.value?.getBoundingClientRect();
    textCanvas.value!.width = rect!.width;
    textCanvas.value!.height = rect!.height;
    textCanvas.value!.style.left = `0px`;
    textCanvas.value!.style.top = `0px`;
    // textCanvas.value!.style.opacity = "0";
    particlesCanvas.value!.style.position = "absolute";
    textCtx!.textAlign = "left";
    textCtx!.textBaseline = "top";
    textCtx!.font = '100px "Chivo"';
    textCtx!.fillStyle = "red";
    textCtx!.fillText("RACH", 46, -7);
}

function positionCanvas() {
    const rect = heading.value?.getBoundingClientRect();
    width = rect!.width;
    height = rect!.height;
    headingLeft = rect!.x;
    headingTop = rect!.y;
    particlesCanvas.value!.width = rect!.width * 2;
    particlesCanvas.value!.height = rect!.height * 2;
    // particlesCanvas.value!.style.left = `50%`;
    // particlesCanvas.value!.style.top = `50%`;
}

function getTextImageData() {
    const pix = textCtx!.getImageData(0, 0, width, height).data;
    console.log('textCtx', textCtx!.getImageData(0, 0, width, height));
    textPixels = [];
    for (var i = pix.length; i >= 0; i -= 4) {
        if (pix[i] != 0) {
            var x = (i / 4) % width;
            var y = Math.floor(Math.floor(i / width) / 4);

            if (x && x % 4 == 0 && y && y % 4 == 0)
                textPixels.push({
                    x: x,
                    y: y,
                });
        }
    }
}

function resetParticle(p: any) {
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
        speed: 0.6,
        waveSize: 5 + Math.random() * 5,
        counter: 0,
        color: colors[color],
        life: 4 + Math.random() * 6,
    };

    particles.push(p);
}

function launchParticles(i: number) {
    const d = 20;
    for (var pi = i; pi < textPixels.length; pi += d) {
        launchParticle(
            textPixels[pi].x - 2,
            textPixels[pi].y - 2
        );
    }
    if (particles.length < maxParticles) {
        let ni = i + 1;
        if (ni > d) ni = 0;
        requestAnimationFrame(() => launchParticles(ni));
    }
}

function clearCanvas() {
    particlesCtx!.clearRect(0, 0, width + padding * 2, width + padding * 2);
}

function animate(t: any) {
    clearCanvas();

    for (var i = 0; i < particles.length; i++) {
        const p = particles[i];
        particlesCtx!.fillStyle = p.color;
        p.counter += increase;
        p.x += p.speed;
        p.y = p.y - (Math.sin(p.counter) / 25) * p.waveSize;
        p.y -= p.speed;

        particlesCtx!.fillRect(p.x, p.y, 4, 4);

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

// window.onresize = function () {
//     positionCanvas();
// };

onMounted(() => {
    addCanvases();
    positionCanvas();
    getTextImageData();
    launchParticles(0);
    requestAnimationFrame(animate);
    changeColor();
});
</script>

<template>
    <div class="layout">
        <q-layout
            view="hhh LpR lff"
            container
            style="height: 100vh"
            class="shadow-2 rounded-borders"
        >
            <q-header reveal class="header">
                <q-toolbar>
                    <q-btn
                        flat
                        @click="drawerLeft = !drawerLeft"
                        round
                        dense
                        icon="menu"
                    />
                    <q-toolbar-title>澄三彩的米奇妙妙屋</q-toolbar-title>
                    <q-toolbar-title> </q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-drawer
                v-model="drawerLeft"
                :width="200"
                :breakpoint="700"
                bordered
                class="bg-grey-3"
            >
                <q-scroll-area class="fit">
                    <div class="q-pa-sm">
                        <Menu :routes="routes" :deep-index="0"></Menu>
                    </div>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page class="q-pa-md">
                    <div style="position: relative">
                        <h1 class="technology" ref="heading" id="heading">
                            RACH SMITH
                        </h1>
                        <canvas ref="textCanvas" id="textCanvas"></canvas>
                        <canvas
                            ref="particlesCanvas"
                            id="particlesCanvas"
                        ></canvas>
                    </div>
                    <router-view></router-view>
                </q-page>

                <q-page-scroller position="bottom-right">
                    <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>
            </q-page-container>
        </q-layout>
    </div>
</template>

<style lang="less" scoped>
.header {
    background-color: aliceblue;
    color: black;
}

.technology {
    font-family: "Chivo", sans-serif;
    font-size: 100px;
    width: 6ch;
    font-weight: 800;
    text-align: center;
    line-height: 0.75;
    margin: 0px;
    position: relative;
    z-index: 100;
}

#particlesCanvas {
    // transform: translate(-50%, -50%);
    top: 0px;
    left: 0px;
}
</style>

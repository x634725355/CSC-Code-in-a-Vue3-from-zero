<script lang="ts" setup>
import { ref } from "vue";

import numeral from "numeral";

const width = ref(1458);
const height = ref(820);
const canvasId = ref("scroll-player");
const imagesLength = 176; // 图片总数量
let flag = ref(false);

console.log('lili');


/**
 * 获取图片路径
 */
function getImagesPath() {
    let images = [];
    const baseUrl =
        "https://www.apple.com.cn/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/06-transparency-head/";
    for (let i = 0; i <= imagesLength; i++) {
        images.push(`${baseUrl}${numeral(i).format("0000")}.jpg`);
    }

    return images;
}

let imagesManager: HTMLImageElement[] = [];
let imagesPath = getImagesPath(); // 图片路径数字集合
let halfPath = imagesPath.splice(0, 88);
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;
/** 加载图片 */
async function loadImages() {
    const imgDom: HTMLImageElement = document.querySelector("#imgLoading")!;
    let index = 0;

    const loadNextImage = () => {
        const oldIndex = index + 88;

        imgDom.src = imagesPath[index];
        imgDom.onload = (e) => {
            imagesManager[oldIndex] = imgDom.cloneNode() as HTMLImageElement;
            index++;
            if (imagesManager.length === imagesLength) {
                flag.value = true;
                imagesLoadComplete();
                return;
            }
            loadNextImage();
        };

        imgDom.onerror = (e) => {
            loadNextImage();
        };
    };

    loadNextImage();
}

async function loadHalfImages() {
    const imgDom: HTMLImageElement = document.querySelector("#imgHalfLoading")!;
    let index = 0;

    const loadNextImage = () => {
        const oldIndex = index;

        imgDom.src = halfPath[index];
        imgDom.onload = (e) => {
            imagesManager[oldIndex] = imgDom.cloneNode() as HTMLImageElement;
            index++;
            if (index >= 88) {
                flag.value = true;
                imagesLoadComplete();
                return;
            }
            loadNextImage();
        };

        imgDom.onerror = (e) => {
            loadNextImage();
        };
    };

    loadNextImage();
}

function init() {
    canvas = document.getElementById(canvasId.value) as HTMLCanvasElement;
    context = canvas.getContext("2d");
    // 添加滚轮事件
    document.addEventListener("wheel", wheelhandle);
    // 加入scroll事件监听
    // document.addEventListener("scroll", handleScroll);
    // 执行加载每一帧的所有图片
    loadHalfImages();
    loadImages();
}

let scrollIndex = 0; // 当前滚动进度待显示的图片索引值
let currentIndex = 0; // 当前显示的图片索引值
let raf = null;

/** 图片加载完成回调 */
function imagesLoadComplete() {
    console.log("游戏 🎮 开始了哟!");
    GameRun();
}

function GameRun() {
    raf = window.requestAnimationFrame(draw);
}

/**
 * 处理滑动边界状态
 */
function draw(timestamp: any) {
    if (currentIndex <= scrollIndex) {
        currentIndex++;
    } else if (currentIndex >= scrollIndex) {
        currentIndex--;
    }

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    if (currentIndex >= imagesLength) {
        currentIndex = imagesLength - 1;
    }

    drawImages(imagesManager[currentIndex]);

    raf = window.requestAnimationFrame(draw);
}

/**
 * 画布画图
 */
function drawImages(img: HTMLImageElement) {
    context?.clearRect(0, 0, width.value, height.value);
    context?.drawImage(img, 0, 0);
}

/**
 * 鼠标滚动事件回调, 计算出scrollIndex
 */
function handleScroll() {
    const docElement = document.documentElement;
    const scrollTop = docElement.scrollTop;
    // let share = boxHeight / imagesLength;
    // 根据滚动距离, 等比例算出应该滚动到第几张图
    // scrollIndex = Math.round(scrollTop / share);
    // console.log("compute", scrollTop, Math.round(scrollTop / share));
}

/** 滚轮事件 */
function wheelhandle(e: WheelEvent) {
    const dY = e.deltaY;

    if (currentIndex < 0) {
        return (currentIndex = 0);
    }

    if (currentIndex >= imagesLength) {
        return (currentIndex = imagesLength - 1);
    }

    scrollIndex = dY + currentIndex;

    // console.log('是怎么样的事件对象呢', e.deltaY);
}

window.onload = () => {
    init();
};
</script>

<template>
    <div class="AppleAnime">
        <div v-show="flag" class="canvas-container">
            <canvas
                :id="canvasId"
                :width="width"
                :height="height"
                style="background-color: #000"
            />
        </div>

        <h1 class="loading" v-show="!flag">加载中</h1>

        <img src="" id="imgLoading" alt="" style="display: none" />
        <img src="" id="imgHalfLoading" alt="" style="display: none" />
    </div>
</template>

<style lang="less" scoped>
.AppleAnime {
    .canvas-container {
        position: relative;
        display: flex;
        justify-content: center;
        background-color: #000;
    }

    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
    }

    #scroll-player {
        transform: scale(0.8);
    }
}
</style>

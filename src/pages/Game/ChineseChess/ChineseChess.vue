<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { ChessPieces, configuration, chessText } from "./data";

interface Dataset {
    top: number;
    left: number;
}

const globalParameter = reactive({
    horizontal: 10,
    vertical: 9,
});

const size = ref(30);

const offset = ref(20);

const radius = ref(size.value / 2);

const width = ref((globalParameter.horizontal - 2) * size.value);
const height = ref(globalParameter.vertical * size.value);

// 偏斜线的长度
const biasValue = ref(
    Math.sqrt(size.value * 4 * size.value + size.value * 4 * size.value)
);

// 棋盘所用数据
const chessPieces = ref<ChessPieces[]>([]);
const lastClickData = ref<ChessPieces | null>(null);

function start() {
    const { darkChess, redChess } = configuration({ size, radius, height });

    chessPieces.value = [...darkChess, ...redChess];
}

onMounted(() => {
    start();
});

function clickHandle(event: any) {
    const { offsetX, offsetY, target } = event;

    const chessDataset: Dataset = target?.dataset;

    const chessData = chessPieces.value.find(
        (p) =>
            `${p.top}-${p.left}` === `${chessDataset.top}-${chessDataset.left}`
    );

    let lastChessData: ChessPieces | null = null;

    if (chessData) {
        if (lastClickData.value) {
            
            return false;
        }

        chessData.select = true;
        lastClickData.value = chessData;


        return false;
    }

    console.log(`x: ${offsetX}, y: ${offsetY}`, chessData);
}

function mousemoveHandle(event: MouseEvent) {
    // console.log("event", event);
}
</script>

<template>
    <div class="ChineseChess">
        <div
            @click="clickHandle"
            @mousemove="mousemoveHandle"
            class="checkerboard"
            :style="{
                width: width + 40 + 'px',
                height: height + 40 + 'px',
                border: `${offset}px solid #ffd36e`,
            }"
        >
            <template v-for="item in globalParameter.horizontal">
                <div
                    :style="{
                        top: `${(item - 1) * size}px`,
                    }"
                    class="horizontal"
                ></div>
            </template>

            <div
                class="tall"
                :style="{
                    width: width + 40 + 'px',
                    height: height + 40 + 'px',
                }"
            ></div>

            <div
                v-for="chess in chessPieces"
                :style="{ top: `${chess.top}px`, left: `${chess.left}px` }"
                class="chess"
                :data-top="chess.top"
                :data-left="chess.left"
                :class="`${chess.camp} ${chess.select ? 'select' : null}`"
            >
                {{ chessText[chess.camp][chess.name] }}
            </div>

            <div class="blank">
                <span>楚河</span>
                <span>汉界</span>
            </div>
            <div
                class="bias dark-bias1"
                :style="{
                    width: `${biasValue}px`,
                }"
            ></div>
            <div
                class="bias dark-bias2"
                :style="{
                    width: `${biasValue}px`,
                }"
            ></div>
            <div
                class="bias red-bias1"
                :style="{
                    width: `${biasValue}px`,
                }"
            ></div>
            <div
                class="bias red-bias2"
                :style="{
                    width: `${biasValue}px`,
                }"
            ></div>

            <div
                :style="{
                    left: `${(item - 1) * size}px`,
                }"
                v-for="item in globalParameter.vertical"
                class="vertical"
            ></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ChineseChess {
    .checkerboard {
        background-color: #ffd36e;
        position: relative;

        .tall {
            position: absolute;
            z-index: 10;
            left: -20px;
            top: -20px;
            background-color: transparent;
        }

        // 水平
        .horizontal {
            position: absolute;
            z-index: 5;
            background-color: #180a0a;

            width: 240px;
            height: 1px;

            left: 0px;
        }

        // 垂直
        .vertical {
            position: absolute;
            z-index: 5;
            background-color: #180a0a;
            height: 270px;
            width: 1px;
            top: 0px;
        }

        .blank {
            background-color: #ffd36e;
            height: 29px;
            width: 239px;
            position: absolute;
            top: 121px;
            left: 1px;
            z-index: 7;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .chess {
            position: absolute;
            top: -15px;
            left: -15px;
            z-index: 10;
            width: 30px;
            height: 30px;
            background-color: #f5d7a1;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #180a0a;
            color: #251d3a;
            cursor: pointer;
        }

        .red {
            color: #f32424;
        }

        .dark {
            color: #180a0a;
        }

        .bias {
            background-color: #180a0a;
            height: 1px;
            position: absolute;
            z-index: 6;
        }

        .dark-bias1 {
            top: 30px;
            left: 78px;
            transform: rotate(45deg);
        }
        .dark-bias2 {
            top: 30px;
            left: 78px;
            transform: rotate(-45deg);
        }
        .red-bias1 {
            top: 240px;
            left: 78px;
            transform: rotate(45deg);
        }
        .red-bias2 {
            top: 240px;
            left: 78px;
            transform: rotate(-45deg);
        }

        .select {
            background-color: #f32424;
        }
    }
}
</style>

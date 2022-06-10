<script lang="ts" setup>
import { ref, onMounted, reactive, handleError } from "vue";
import { ChessPieces, configuration, chessText } from "./data";

interface Dataset {
    top: number;
    left: number;
}

interface CalculateType {
    offsetX: number;
    offsetY: number;
}

interface ChessRule {
    hanldeX: number;
    hanldeY: number;
    chessData: ChessPieces | undefined;
    lastChessData: ChessPieces | undefined;
}

interface RuleData {
    lastData: ChessPieces;
    handleCoordinates: ChessRule;
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
const removingChessPieces = ref<ChessPieces[]>([]);
const lastClickChess = ref<ChessPieces | null>(null);
const redLine = ref(150);
const darkLine = ref(120);

function start() {
    const { darkChess, redChess } = configuration({ size, radius, height });

    chessPieces.value = [...darkChess, ...redChess];
}

onMounted(() => {
    start();
});

// 计算落点坐标
function calculateChessman({ offsetX, offsetY }: CalculateType) {
    const chessmanLength = size.value;
    const offsetValue = offset.value;

    const hanldeX =
        Math.round(
            (Math.round((offsetX - offsetValue) / 10) * 10) / chessmanLength
        ) * chessmanLength;
    const hanldeY =
        Math.round(
            (Math.round((offsetY - offsetValue) / 10) * 10) / chessmanLength
        ) * chessmanLength;

    return { hanldeX, hanldeY };
}

// 计算棋子真实坐标
function convertChess(chessData: ChessPieces | undefined | null) {
    if (!chessData) {
        return { chessX: 0, chessY: 0 };
    }

    const chessX = chessData.left + radius.value;
    const chessY = chessData.top + radius.value;

    return { chessX, chessY };
}

function soldierRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
}: ChessRule): Dataset | false {
    const { chessX, chessY } = convertChess(lastChessData);

    if (chessData) {
        const converData = convertChess(chessData);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    const judgments = {
        red: [
            chessY - 30 === hanldeY && chessX === hanldeX,
            chessX - 30 === hanldeX &&
                chessY === hanldeY &&
                darkLine.value >= chessY,
            chessX + 30 === hanldeX &&
                chessY === hanldeY &&
                darkLine.value >= chessY,
        ],
        dark: [
            chessY + 30 === hanldeY && chessX === hanldeX,
            chessX - 30 === hanldeX &&
                chessY === hanldeY &&
                redLine.value <= chessY,
            chessX + 30 === hanldeX &&
                chessY === hanldeY &&
                redLine.value <= chessY,
        ],
    };

    switch (lastChessData!.camp) {
        case "red":
            if (judgments.red.some((p) => p)) {
                return {
                    top: hanldeY - radius.value,
                    left: hanldeX - radius.value,
                };
            }

            break;
        case "dark":
            if (judgments.dark.some((p) => p)) {
                return {
                    top: hanldeY - radius.value,
                    left: hanldeX - radius.value,
                };
            }
            break;
        default:
            return false;
            break;
    }

    return false;
}

function carRule({
    chessData,
    lastChessData,
    hanldeX,
    hanldeY,
}: ChessRule): Dataset | false {
    const { chessX, chessY } = convertChess(lastChessData);

    if (chessData) {
        const converData = convertChess(chessData);
        hanldeX = converData.chessX;
        hanldeY = converData.chessY;
    }

    const judgments = [
        chessX !== hanldeX && chessY === hanldeY,
        chessX !== hanldeX && chessY === hanldeY,
    ];

    return false;
}

function chessRule({ hanldeX, hanldeY, chessData, lastChessData }: ChessRule) {
    if (!lastChessData) {
        return false;
    }

    let result: Dataset | false = false;

    switch (lastChessData.name) {
        case "soldier":
            result = soldierRule({
                hanldeX,
                hanldeY,
                chessData,
                lastChessData,
            });
            if (!result) {
                return false;
            }

            lastChessData.top = result.top;
            lastChessData.left = result.left;

            break;
        default:
            break;
    }

    lastChessData.select = false;
    lastClickChess.value = null;

    return result;
}

function clickHandle(event: any) {
    const { offsetX, offsetY, target } = event;

    const chessDataset: Dataset = target?.dataset;

    let chessIndex = 0;

    let lastChessData: ChessPieces;

    let chessData: ChessPieces;

    chessPieces.value.forEach((p, index) => {
        if (p.top == chessDataset.top && p.left == chessDataset.left) {
            chessIndex = index;
            chessData = p;
        }

        if (lastClickChess.value) {
            if (
                p.top == lastClickChess.value.top &&
                p.left == lastClickChess.value.left
            ) {
                lastChessData = p;
            }
        }
    });

    const { hanldeX, hanldeY } = calculateChessman({ offsetX, offsetY });
    const { chessX, chessY } = convertChess(chessData!);

    console.log(
        `x: ${hanldeX}, y: ${hanldeY} ---- chessX: ${chessX}, chessY: ${chessY}`
    );

    const result = chessRule({
        hanldeX,
        hanldeY,
        chessData: chessData!,
        lastChessData: lastChessData!,
    });

    // console.log('clickHandle', result, chessData);

    if (!!result && !!chessData!) {
        console.log("吃棋", result, chessData);
        removingChessPieces.value.push(
            ...chessPieces.value.splice(chessIndex, 1)
        );
        chessData.life = false;
        chessData.select = false;

        return false;
    }

    if (chessData!) {
        if (lastClickChess.value) {
            // 上次点击棋子与当前点击位置相同
            if (
                lastClickChess.value.top == chessData.top &&
                lastClickChess.value.left == chessData.left
            ) {
                chessData.select = !chessData.select;
                lastClickChess.value = null;
                return;
            }

            chessPieces.value.find(
                (p) =>
                    p.top === lastClickChess.value!.top &&
                    p.left === lastClickChess.value!.left
            )!.select = false;
        }

        chessData.select = true;
        lastClickChess.value = { ...chessData };

        return false;
    }
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
                v-show="chess.life"
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
            border: 2px solid #f24a72;
            box-shadow: 0 0 5px #f24a72, 0 0 25px #f24a72, 0 0 50px #f24a72,
                0 0 100px #f56d91;
        }
    }
}
</style>

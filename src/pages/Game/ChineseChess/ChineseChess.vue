<script lang="ts" setup>
import { throttle } from "underscore";

import { ref, onMounted, reactive, handleError } from "vue";
import { ChessPieces, configuration, chessText } from "./data";
import {
    bodyguardRule,
    cannonRule,
    carRule,
    elephantRule,
    generalRule,
    horseRule,
    soldierRule,
    ChessRule,
    Dataset,
    convertChess,
} from "./chessRule";

interface CalculateType {
    offsetX: number;
    offsetY: number;
}

interface RuleData {
    lastData: ChessPieces;
    handleCoordinates: ChessRule;
}

interface FuncMap {
    car: (chessRule: ChessRule) => Dataset | false;
    horse: (chessRule: ChessRule) => Dataset | false;
    elephant: (chessRule: ChessRule) => Dataset | false;
    bodyguard: (chessRule: ChessRule) => Dataset | false;
    general: (chessRule: ChessRule) => Dataset | false;
    soldier: (chessRule: ChessRule) => Dataset | false;
    cannon: (chessRule: ChessRule) => Dataset | false;
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

// 用户数据
const userRed = reactive({
    fall: false,
    victory: false,
});

const userDark = reactive({
    fall: false,
    victory: false,
});

// 棋盘所用数据
const chessPieces = ref<ChessPieces[]>([]);
const removingChessPieces = ref<ChessPieces[]>([]);
const lastClickChess = ref<ChessPieces | null>(null);

function start() {
    const { darkChess, redChess } = configuration({ size, radius, height });

    chessPieces.value = [...darkChess, ...redChess];
}

function gameover() {
    userRed.fall = false;
    userDark.fall = false;
}

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

function chessRule({
    hanldeX,
    hanldeY,
    chessData,
    lastChessData,
    chessPieces,
}: ChessRule) {
    if (!lastChessData) {
        return false;
    }

    if (lastChessData.camp === chessData?.camp) {
        return false;
    }

    let result: Dataset | false = false;

    const funcMap: FuncMap = {
        soldier: soldierRule,
        car: carRule,
        bodyguard: bodyguardRule,
        cannon: cannonRule,
        elephant: elephantRule,
        general: generalRule,
        horse: horseRule,
    };

    result = funcMap[lastChessData.name]({
        hanldeX,
        hanldeY,
        chessData,
        lastChessData,
        radius: radius.value,
        chessPieces,
    });

    // 两王不能见面规则
    let redGeneral: ChessPieces;
    let darkGeneral: ChessPieces;

    chessPieces!.forEach((p) => {
        if (p.camp === "dark" && p.name === "general") {
            darkGeneral = p;
        }

        if (p.camp === "red" && p.name === "general") {
            redGeneral = p;
        }
    });

    const { chessX: redX, chessY: redY } = convertChess(
        redGeneral!,
        radius.value
    );
    const { chessX: darkX, chessY: darkY } = convertChess(
        darkGeneral!,
        radius.value
    );
    const lastConvert = convertChess(lastChessData, radius.value);

    // 两个王在同一个x位置再做判断
    if (
        redGeneral!.left === darkGeneral!.left &&
        redY > lastConvert.chessY &&
        darkY < lastConvert.chessY &&
        redX === lastConvert.chessX
    ) {
        const meet: ChessPieces[] = [];
        chessPieces!.forEach((p) => {
            const pConvert = convertChess(p, radius.value);

            if (
                redY > pConvert.chessY &&
                darkY < pConvert.chessY &&
                redX === pConvert.chessX
            ) {
                meet.push(p);
            }

            return true;
        });

        if (meet!.length === 1) {
            if (!result || result.left !== redGeneral!.left) {
                result = false;
            }
        }
    }

    if (!result) {
        return false;
    }

    lastChessData.top = result.top;
    lastChessData.left = result.left;
    userRed.fall = !userRed.fall;
    userDark.fall = !userDark.fall;

    lastChessData.select = false;
    lastClickChess.value = null;

    return result;
}

function clickHandle(event: any) {
    if (!userDark.fall && !userRed.fall) {
        alert("看不出来谁赢了嘛 哼~");
        return false;
    }

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
    const { chessX, chessY } = convertChess(chessData!, radius.value);

    console.log(
        `x: ${hanldeX}, y: ${hanldeY} ---- chessX: ${chessX}, chessY: ${chessY}`
    );

    const result = chessRule({
        hanldeX,
        hanldeY,
        chessData: chessData!,
        lastChessData: lastChessData!,
        radius: radius.value,
        chessPieces: chessPieces.value,
    });

    if (!!result && !!chessData!) {
        console.log("吃棋", result, chessData);
        removingChessPieces.value.push(
            ...chessPieces.value.splice(chessIndex, 1)
        );
        chessData.life = false;
        chessData.select = false;
        if (chessData.name === "general") {
            gameover();
        }

        return false;
    }

    if (chessData!) {
        if (userRed.fall && chessData.camp === "dark") {
            return false;
        }

        if (userDark.fall && chessData.camp === "red") {
            return false;
        }

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

const clickThrottle = throttle(clickHandle, 300);

function mousemoveHandle(event: MouseEvent) {
    // console.log("event", event);
}

onMounted(() => {
    userRed.fall = true;
    start();
});
</script>

<template>
    <div class="ChineseChess">
        <div
            @click="clickThrottle"
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

            <div v-show="userRed.fall" class="fall fallRed">红</div>
            <div v-show="userDark.fall" class="fall fallDark">黑</div>
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

        .fall {
            position: absolute;
            z-index: 4;
            opacity: 0.4;
            font-size: 100px;
            left: 50%;
            transform: translateX(-50%);
        }

        .fallRed {
            color: #f32424;
            bottom: -15px;
        }

        .fallDark {
            color: #180a0a;
            top: -15px;
        }
    }
}
</style>

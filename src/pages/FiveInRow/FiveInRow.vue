<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

interface calculateType {
    offsetX: number;
    offsetY: number;
}

interface victoryType {
    x: number;
    y: number;
    state: 0 | 1;
    array?: string[];
    base?: number;
}

interface findFunc {
    x: number;
    y: number;
    state: 0 | 1;
    array: string[];
    base: number;
}

enum Direction {
    X, // 横轴
    Y, // 竖轴
    XY, // 左斜轴
    YX, // 右斜轴
    OVER,
}

let horizontalX = ref(19);
let verticalY = ref(19);
let chessmanLength = ref(30);
let radius = ref(15);
let origin = reactive({ x: chessmanLength.value, y: chessmanLength.value });
let holdChessman = ref(false);
const chessboard = reactive<string[]>([]);
let lastStep = reactive({ x: 0, y: 0 });
const findWay = ref(0); // 寻找棋子往左还是往右
const victory = ref(false);

let checkerboardParameter = reactive({
    holdChessman,
    horizontalX,
    verticalY,
    chessmanLength,
    radius,
    origin,
    destination: {
        x: horizontalX.value * chessmanLength.value - origin.x,
        y: verticalY.value * chessmanLength.value - origin.y,
    },
    chessboard,
    lastStep,
    victory,
});
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

function drawChessman(x: number, y: number) {
    const { radius, holdChessman } = checkerboardParameter;

    ctx?.beginPath();
    ctx?.moveTo(x, y);
    ctx?.arc(x, y, radius, 0, Math.PI * 2);
    ctx!.fillStyle = holdChessman ? "#FDFAF6" : "#1B1A17";
    ctx!.strokeStyle = holdChessman ? "#FDFAF6" : "#1B1A17";

    ctx?.fill();
}

// 清空上一次出现的棋子
function emptyChessPieces(x: number, y: number) {
    const { radius, chessmanLength } = checkerboardParameter;

    ctx?.clearRect(x - radius, y - radius, chessmanLength, chessmanLength);

    ctx?.beginPath();
    ctx?.moveTo(x - radius, y);
    ctx?.lineTo(x + radius, y);
    ctx?.moveTo(x, y - radius);
    ctx?.lineTo(x, y + radius);
    ctx!.strokeStyle = "#1B1A17";
    ctx?.stroke();
}

const directionArray = [
    Direction.X,
    Direction.Y,
    Direction.XY,
    Direction.YX,
    Direction.OVER,
];

// 判断棋子与现存棋子数组中是否相连
function chessLink(x: number, y: number, state: 0 | 1) {
    const { chessboard } = checkerboardParameter;

    return chessboard.some((item) =>
        item.includes(`{"x": ${x}, "y": ${y}, "state": ${state}}`)
    );
}

// 胜利守则
function victoryCode({
    x,
    y,
    state,
    array = [],
    base = 0,
}: victoryType): boolean {
    if (array.length === 5) {
        checkerboardParameter.victory = true;
        return true;
    }
    if (directionArray[base] === Direction.OVER) {
        return false;
    }

    const { chessmanLength } = checkerboardParameter;
    const direction = directionArray[base];

    array = [`{"x": ${x}, "y": ${y}, "state": ${state}}`];
    findChessman({ x, y, array, base, state });

    return victoryCode({ x, y, state, array, base: base + 1 });
}

// 棋子移动 x,y 坐标轴
const movePoint = [
    [
        { x: chessmanLength.value, y: 0 },
        { x: -chessmanLength.value, y: 0 },
    ],
    [
        { x: 0, y: chessmanLength.value },
        { x: 0, y: -chessmanLength.value },
    ],
    [
        { x: chessmanLength.value, y: chessmanLength.value },
        { x: -chessmanLength.value, y: -chessmanLength.value },
    ],
    [
        { x: chessmanLength.value, y: -chessmanLength.value },
        { x: -chessmanLength.value, y: chessmanLength.value },
    ],
];

// 找棋子
function findChessman({ array, base, x, y, state }: findFunc): boolean {
    const { chessmanLength } = checkerboardParameter;
    const { x: firstX, y: firstY } = JSON.parse(array[0]);
    let moveChessX = 0;
    let moveChessY = 0;
    let isLink;

    if (array.length === 5) {
        return true;
    }
    if (findWay.value === 2) {
        findWay.value = 0;
        return false;
    }

    moveChessX = x + movePoint[base][findWay.value].x;
    moveChessY = y + movePoint[base][findWay.value].y;
    isLink = chessLink(moveChessX, moveChessY, state);
    if (isLink) {
        array.push(
            `{"x": ${moveChessX}, "y": ${moveChessY}, "state": ${state}}`
        );
        // console.log('true', findWay.value, array, `moveChessX: ${moveChessX}, moveChessY: ${moveChessY}`);
    } else {
        // console.log('false', findWay.value, array, `moveChessX: ${moveChessX}, moveChessY: ${moveChessY}`);
        moveChessX = firstX;
        moveChessY = firstY;
        findWay.value++;
    }

    return findChessman({ array, base, x: moveChessX, y: moveChessY, state });
}

function chessboardClick(event: any) {
    let { holdChessman, chessboard, lastStep } = checkerboardParameter;
    const { offsetX, offsetY } = event;
    const { hanldeX, hanldeY } = calculateChessman({ offsetX, offsetY });
    const state = holdChessman ? 1 : 0;

    const isExist = chessboard.some((item) =>
        item.includes(`{"x": ${hanldeX}, "y": ${hanldeY}`)
    );
    if (isExist) {
        return false;
    }

    drawChessman(hanldeX, hanldeY);
    lastStep.x = 0;
    lastStep.y = 0;

    chessboard.push(`{"x": ${hanldeX}, "y": ${hanldeY}, "state": ${state}}`);

    victoryCode({ x: hanldeX, y: hanldeY, state });

    if (victory.value) {
        return false;
    }
    checkerboardParameter.holdChessman = !holdChessman;
}

function chessboardMove(event: any) {
    const { chessboard, lastStep } = checkerboardParameter;
    const { offsetX, offsetY } = event;
    const { hanldeX, hanldeY } = calculateChessman({ offsetX, offsetY });

    const isExist = chessboard.some((item) =>
        item.includes(`{"x": ${hanldeX}, "y": ${hanldeY}`)
    );

    if (isExist) {
        return false;
    }

    emptyChessPieces(lastStep.x, lastStep.y);
    drawChessman(hanldeX, hanldeY);

    lastStep.x = hanldeX;
    lastStep.y = hanldeY;
}

// 计算棋子坐标
function calculateChessman({ offsetX, offsetY }: calculateType) {
    const { chessmanLength } = checkerboardParameter;
    const hanldeX =
        Math.round((Math.round(offsetX / 10) * 10) / chessmanLength) *
        chessmanLength;
    const hanldeY =
        Math.round((Math.round(offsetY / 10) * 10) / chessmanLength) *
        chessmanLength;

    return { hanldeX, hanldeY };
}

// 重新开始
function start() {
    console.log("重新");
    checkerboardParameter.chessboard = [];
    checkerboardParameter.victory = false;
    checkerboardParameter.holdChessman = false;
    checkerboardParameter.lastStep = { x: 0, y: 0 };
    findWay.value = 0;

    canvas = document.querySelector("#chessboard") as HTMLCanvasElement;

    ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, 600, 600);
    ctx!.strokeStyle = "#1B1A17";

    const { chessmanLength, origin, destination, horizontalX, verticalY } =
        checkerboardParameter;

    canvas.addEventListener("click", chessboardClick);
    canvas.addEventListener("mousemove", chessboardMove);

    ctx?.beginPath();
    // 画x轴的线
    for (let i = 1; i < horizontalX; i++) {
        let number = i * chessmanLength;
        ctx?.moveTo(origin.x, number);
        ctx?.lineTo(destination.x, number);
    }

    // 画y轴的线
    for (let i = 1; i < verticalY; i++) {
        let number = i * chessmanLength;
        ctx?.moveTo(number, origin.y);
        ctx?.lineTo(number, destination.y);
    }

    ctx?.stroke();
}

onMounted(() => {
    start();
});
</script>

<template>
    <div class="box">
        <div class="chessboard">
            <canvas id="chessboard" width="600" height="600"></canvas>
        </div>

        <div class="gameInfo">
            <p>污渍棋</p>
            <button class="start" v-on:click="start">重新开局</button>
            <p>
                <span>请</span>
                <span
                    v-show="checkerboardParameter.holdChessman"
                    class="whiteChess"
                    >白子</span
                >
                <span
                    v-show="!checkerboardParameter.holdChessman"
                    class="blackChess"
                    >黑子</span
                >
                <span>说话</span>
            </p>
            <p v-show="checkerboardParameter.victory">
                <span>获胜滴是</span>
                <span
                    v-show="checkerboardParameter.holdChessman"
                    class="whiteChess"
                    >白子</span
                >
                <span
                    v-show="!checkerboardParameter.holdChessman"
                    class="blackChess"
                    >黑子</span
                >
            </p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.box {
    margin: 10px auto 0px;
    min-height: 80vh;
    max-width: 80vw;
    padding: 5px;
    border: 1px solid #42b983;
    display: flex;
}

canvas {
    border: 1px solid #5463ff;
}

.chessboard {
    height: 600px;
    width: 600px;
}

.gameInfo {
    margin-left: 40px;
    p {
        font-size: 30px;
        color: #5b6d5b;
    }

    .start {
        border: 2px solid #5b6d5b;
        border-radius: 5px;
        background-color: #f0a500;
        font-size: 20px;
    }

    .whiteChess {
        color: #fdfaf6;
        font-size: 40px;
        font-weight: 600;
    }

    .blackChess {
        color: #1b1a17;
        font-size: 40px;
        font-weight: 600;
    }
}
</style>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";

export interface ChessPieces {
    name: string;
    top: number;
    left: number;
    camp: "red" | "dark";
}

const globalParameter = reactive({
    horizontal: 11,
    vertical: 11,
});

const size = ref(30);

const radius = ref((size.value - 4) / 2);

const width = ref((globalParameter.horizontal - 1) * size.value);
const height = ref((globalParameter.vertical - 1) * size.value);

const chessType = [
    "car",
    "horse",
    "elephant",
    "bodyguard",
    "general",
    "bodyguard",
    "elephant",
    "horse",
    "car",
];

const chessText = {
    dark: {
        car: "车",
        horse: "马",
        elephant: "象",
        bodyguard: "士",
        general: "将",
        arms: "卒",
        cannon: "炮",
    },
    red: {
        car: "车",
        horse: "马",
        elephant: "象",
        bodyguard: "仕",
        general: "帅",
        arms: "兵",
        cannon: "炮",
    },
};

const darkChess = chessType.map<ChessPieces>((value, index) => {
    return {
        camp: "dark",
        name: value,
        top: -radius.value,
        left: size.value * index - radius.value,
    };
});

const redChess = chessType.map<ChessPieces>((value, index) => {
    return {
        camp: "red",
        name: value,
        top: height.value - radius.value,
        left: size.value * index - radius.value,
    };
});

const chessPieces = reactive<ChessPieces[]>([]);
</script>

<template>
    <div class="ChineseChess">
        <div
            class="checkerboard"
            :style="{ width: width + 40 + 'px', height: height + 40 + 'px' }"
        >
            <template v-for="item in globalParameter.horizontal">
                <div
                    :style="{
                        top: `${(item - 1) * size}px`,
                    }"
                    v-if="item !== 6"
                    class="horizontal"
                ></div>
            </template>
            <div class="chess">车</div>
            <div class="chess2"></div>

            <div class="blank"></div>

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
        border: 20px solid #ffd36e;
        width: 340px;
        height: 340px;

        // 水平
        .horizontal {
            position: absolute;
            z-index: 5;
            background-color: #180a0a;

            width: 300px;
            height: 1px;

            left: 0px;
        }

        // 垂直
        .vertical {
            position: absolute;
            z-index: 5;
            background-color: #180a0a;

            height: 300px;
            width: 1px;

            top: 0px;
        }

        .blank {
            background-color: #ffd36e;
            height: 59px;
            width: 299px;
            position: absolute;
            top: 121px;
            left: 1px;
            z-index: 6;
        }

        .chess {
            position: absolute;
            top: -13px;
            left: -13px;
            z-index: 10;
            width: 26px;
            height: 26px;
            background-color: #f5d7a1;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #180a0a;
            color: #251d3a;
        }

        .chess2 {
            position: absolute;
            top: -13px;
            left: 17px;
            z-index: 10;
            width: 26px;
            height: 26px;
            background-color: palevioletred;
            border-radius: 50%;
        }
    }
}
</style>

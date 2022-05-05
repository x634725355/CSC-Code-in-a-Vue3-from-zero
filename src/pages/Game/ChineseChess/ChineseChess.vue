<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";

const globalParameter = reactive({
    horizontal: 11,
    vertical: 11,
});

const chessPieces = reactive({
    red: {},
    dark: {},
})

</script>

<template>
    <div class="ChineseChess">
        <div class="checkerboard">
            <template v-for="item in globalParameter.horizontal">
                <div
                    :style="{
                        top: `${(item - 1) * 30}px`,
                    }"
                    v-if="item !== 6"
                    class="horizontal"
                ></div>
            </template>

            <div class="blank" ></div>

            <div
                :style="{
                    left: `${(item - 1) * 30}px`,
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
    }
}
</style>

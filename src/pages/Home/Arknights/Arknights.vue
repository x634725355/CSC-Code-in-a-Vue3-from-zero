<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import logo_kazimierz from "@/assets/logo_kazimierz.png";
import logo_rhine from "@/assets/logo_rhine.png";
import logo_rhodes from "@/assets/logo_rhodes.png";
import logo_victoria from "@/assets/logo_victoria.png";
import logo_yan from "@/assets/logo_yan.png";
import { ParticleCanvas } from "./ParticleCanvas";
import { width, height, LogoImg } from "./LogoImg";
import { useRouter } from "vue-router";

const router = useRouter();

// 准备logo数据
const logos = reactive([
    { label: "kazimierz", url: logo_kazimierz },
    { label: "rhine", url: logo_rhine },
    { label: "rhodes", url: logo_rhodes },
    { label: "victoria", url: logo_victoria },
    { label: "yan", url: logo_yan },
]);

const timeout = ref<NodeJS.Timeout>();
/** 存储由logos生成的logoImg对象 */
const logoImgs = <LogoImg[]>reactive([]);
// 获取canvas画布
const canvas = ref<HTMLCanvasElement | null>(null);
// 获取上下文
let context = ref<CanvasRenderingContext2D | null>(null);
/** canvas实体对象 */
let particleCanvas = ref<ParticleCanvas>();

const currentLogo = ref<LogoImg>(logoImgs[0]);

function canvasMove(event: MouseEvent) {
    console.log("%c Line:37 🍔", "color:#7f2b82", event);
    const { offsetX, offsetY } = event;

    particleCanvas.value!.pointerX = offsetX;
    particleCanvas.value!.pointerY = offsetY;
}

function start() {
    if (canvas.value) {
        context.value = canvas.value.getContext("2d");
        canvas.value.addEventListener('mousemove', canvasMove)
        particleCanvas.value = new ParticleCanvas(canvas.value);
        particleCanvas.value.changeImg(logoImgs[0]);
        particleCanvas.value.drawCanvas();
    }
}

// 激活logo
function clickLogo(prt_canvas: ParticleCanvas, logoItem: LogoImg) {
    prt_canvas.changeImg(logoItem);
    currentLogo.value = logoItem;
}

// 将logo数据实例化为logoImg对象
for (let item of logos) {
    logoImgs.push(new LogoImg(item.url, item.label));
}

onMounted(() => {
    if (timeout.value) {
        clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
        start();
    }, 2000);
});

onUnmounted(() => {
    if (timeout.value) {
        clearTimeout(timeout.value);
    }
})
</script>

<template>
    <div class="Arknights">
        <main>
            <q-btn
                @click="() => router.push('/Game/FiveInRow')"
                class="go"
                text-color="black"
                label="GET START!"
            />

            <div class="canvasLogo" >
                <canvas ref="canvas" :width="width" :height="height"></canvas>
            </div>

            <footer class="footer" >
                <q-tabs narrow-indicator dense align="justify" class="text-primary">
                    <q-tab
                        v-for="item in logoImgs"
                        :ripple="false"
                        :name="item.name"
                        @click="clickLogo(particleCanvas!, item)"
                    >
                        <q-img
                            :src="item.src"
                            spinner-color="white"
                            style="width: 200px; height: 200px;"
                        />
                    </q-tab>
                </q-tabs>
            </footer>
        </main>
    </div>
</template>
<style lang="less" scoped>
.Arknights {
    position: relative;
    height: 100%;
    width: 100%;

    > main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .go {
            margin-top: 16px;
            background-color: var(--goldenColor);
        }

        .canvasLogo {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .footer {
            margin-bottom: 16px;
            height: 208px;
        }
    }   

   
}
</style>

import { Ref } from "vue";
import { animateTime, LogoImg } from "./LogoImg";
import { Particle } from "./Particle";

// 画布类
export class ParticleCanvas {
    canvasEle: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    ParticleArr: Particle[];
    pointerX: number | null;
    pointerY: number | null;

    constructor(target: HTMLCanvasElement) {
        this.canvasEle = target;
        this.ctx = target.getContext("2d") as CanvasRenderingContext2D;
        this.width = target.width;
        this.height = target.height;
        this.ParticleArr = [];
        this.pointerX = null;
        this.pointerY = null;
    }
    // 改变画布数据源
    changeImg(img: LogoImg) {
        if (this.ParticleArr.length) {
            let newArray = img.particleData;
            let newLen = newArray.length;
            let arr = this.ParticleArr;
            let oldLen = arr.length;

            for (let i = 0; i < newLen; i++) {
                const { totalX, totalY, color } = newArray[i];
                if (arr[i]) {
                    arr[i].change({ totalX, totalY, color });
                } else {
                    arr[i] = new Particle({
                        color,
                        time: animateTime,
                        totalX,
                        totalY,
                    });
                }
            }

            if (newLen < oldLen) this.ParticleArr = arr.slice(0, newLen);
        } else {
            // this.ParticleArr = img.particleData.map(
            //     (item) =>
            //         new Particle({
            //             color: item.color,
            //             time: item.time,
            //             totalX: item.totalX,
            //             totalY: item.totalY,
            //         })
            // );
            this.ParticleArr = img.particleData;
        }
    }
    // 画布绘制方法
    drawCanvas(timeObj: any) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ParticleArr.forEach((particle) => {
            particle.update(this.pointerX!, this.pointerY!);
            particle.draw(this.ctx);
        });

        timeObj.time = window.requestAnimationFrame(() => this.drawCanvas(timeObj));
    }
}

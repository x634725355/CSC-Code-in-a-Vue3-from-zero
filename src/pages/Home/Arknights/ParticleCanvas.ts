import { LogoImg } from "./LogoImg";
import { Particle } from "./Particle";

// 画布类
export class ParticleCanvas {
    canvasEle: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    ParticleArr: Particle[];
    constructor(target: HTMLCanvasElement) {
        this.canvasEle = target;
        this.ctx = target.getContext("2d") as CanvasRenderingContext2D;
        this.width = target.width;
        this.height = target.height;
        this.ParticleArr = [];
    }
    // 改变画布数据源
    changeImg(img: LogoImg) {
        
        console.log("%c Line:21 🎂", "color:#33a5ff", img.particleData);
        this.ParticleArr = img.particleData.map(
            (item) =>
                new Particle({
                    color: item.color,
                    time: item.time,
                    totalX: item.totalX,
                    totalY: item.totalY,
                })
        );
    }
    // 画布绘制方法
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // console.log("%c Line:34 🥟", "color:#6ec1c2", this.ParticleArr);
        this.ParticleArr.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        window.requestAnimationFrame(() => this.drawCanvas());
    }
}

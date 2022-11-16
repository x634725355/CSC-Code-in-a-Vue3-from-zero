import { height, opacityStep, width } from "./LogoImg";

type ParticleType = {
    x: number; // 粒子x轴的初始位置
    y: number; // 粒子y轴的初始位置
    totalX: number; // 粒子x轴的目标位置
    totalY: number; // 粒子y轴的目标位置
    mx?: number; // 粒子x轴需要移动的距离
    my?: number; // 粒子y轴需要移动的距离
    vx?: number; // 粒子x轴移动速度
    vy?: number; // 粒子y轴移动速度
    time: number; // 粒子移动耗时
    radius: number; // 粒子的半径
    color: number[]; // 粒子的颜色
    opacity: number; // 粒子的透明度
}

type ParticleConstructor = Pick<ParticleType, 'color' | 'time' | 'totalX' | 'totalY'>;

export class Particle implements ParticleType {
    x: number; // 粒子x轴的初始位置
    y: number; // 粒子y轴的初始位置
    totalX: number; // 粒子x轴的目标位置
    totalY: number; // 粒子y轴的目标位置
    mx?: number; // 粒子x轴需要移动的距离
    my?: number; // 粒子y轴需要移动的距离
    vx?: number; // 粒子x轴移动速度
    vy?: number; // 粒子y轴移动速度
    time: number; // 粒子移动耗时
    radius: number; // 粒子的半径
    color: number[]; // 粒子的颜色
    opacity: number; // 粒子的透明度
    constructor({ color, time, totalX, totalY }: ParticleConstructor) {
        this.x = (Math.random() * width) >> 0;
        this.y = (Math.random() * height) >> 0;
        // 目标位置dx, dy, 总耗时time
        this.totalX = totalX;
        this.totalY = totalY;
        this.time = time;
        // 设置粒子颜色与默认半径
        this.radius = 1.2;
        this.color = [...color];
        this.opacity = 0;
    }
    // 在画布中绘制粒子
    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = `rgba(${this.color.toString()})`;
        context.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
    // 更新粒子
    update(mouseX?: number, mouseY?: number) {
        // 设置粒子需要移动的距离
        this.mx = this.totalX - this.x;
        this.my = this.totalY - this.y;
        // 设置粒子移动速度
        this.vx = this.mx / this.time;
        this.vy = this.my / this.time;
        this.x += this.vx;
        this.y += this.vy;
        // 随着移动不断增加透明度
        if (this.opacity < 1) this.opacity += opacityStep;
    }
    // 切换粒子
    change() {}
}

type ParticleType = {
    totalX: number; // 粒子x轴的目标位置
    totalY: number;
    radius: number;
    color: number[];
    opacity: number;
}

type ParticleConstructor = Omit<ParticleType, 'opacity' | 'radius'> & { time: number };

export class Particle implements ParticleType {
    totalX: number; // 粒子x轴的目标位置
    totalY: number;
    radius: number;
    color: number[];
    opacity: number;
    constructor({ color, time, totalX, totalY }: ParticleConstructor) {
        // 目标位置dx, dy, 总耗时time
        this.totalX = totalX;
        this.totalY = totalY;
        // 设置粒子颜色与默认半径
        this.radius = 1.2;
        this.color = [...color];
        this.opacity = 0;
    }
    // 在画布中绘制粒子
    draw() {}
    // 更新粒子
    update() {}
    // 切换粒子
    change() {}
}
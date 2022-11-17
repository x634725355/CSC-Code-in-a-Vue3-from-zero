import { Particle } from "./Particle";

// 设置画布大小
export const width = 400,
    height = 400;

// 设置粒子动画时长
export const animateTime = 30;
export const opacityStep = 1 / animateTime;

export class LogoImg {
    src: string;
    name: string;
    particleData: Particle[]; // 用于保存筛选后的粒子
    constructor(src: string, name: string) {
        this.src = src;
        this.name = name;
        this.particleData = [];
        let img = new Image();
        img.crossOrigin = "";
        img.src = src;
        // 获取图片数据
        img.onload = () => {
            const imgW = width;
            const imgH = ~~(width * (img.height / img.width));

            // 获取图片像素数据
            const temp_canvas = document.createElement("canvas");
            const temp_ctx = temp_canvas.getContext("2d");
            temp_canvas.width = imgW;
            temp_canvas.height = imgH;
            temp_ctx?.drawImage(img, 0, 0, imgW, imgH);
            const imgData = temp_ctx?.getImageData(0, 0, imgW, imgH).data; // 获取像素点
            temp_ctx?.clearRect(0, 0, imgW, imgH);

            // 筛选像素点
            for (let y = 0; y < imgH; y += 5) {
                for (let x = 0; x < imgW; x += 5) {
                    // 像素点的序号
                    const index = (x + y * imgW) * 4;
                    // 在数组中对应的值
                    const r = imgData![index];
                    const g = imgData![index + 1];
                    const b = imgData![index + 2];
                    const a = imgData![index + 3];
                    const sum = r + g + b + a;
                    // 筛选条件
                    if (sum >= 100) {
                        const particle = new Particle({ totalX: x, totalY: y, color: [r, g, b, a], time: animateTime });
                        this.particleData.push(particle);
                    }
                }
            }
        };
    }
}

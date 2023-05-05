// 生成一个20位的hash字符串
export function getUUID() {
    return "xxyyxxyyxxyyxxyyxxyy".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;

        return v.toString(16);
    });
}

// 定义一个copy函数，参数为要复制的内容
export async function copy(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
}

// 生成一个20位的hash字符串
export function getUUID() {
  return 'xxyyxxyyxxyyxxyyxxyy'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

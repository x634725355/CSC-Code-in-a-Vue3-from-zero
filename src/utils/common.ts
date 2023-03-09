// 生成一个20位的hash字符串
export function getUUID() {
  return 'xxyyxxyyxxyyxxyyxxyy'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

// 定义一个copy函数，参数为要复制的内容
export function copy(text: string) {
  // 创建一个临时的textarea元素，用于存储要复制的内容
  var textarea = document.createElement("textarea");
  // 设置textarea的值为要复制的内容
  textarea.value = text;
  // 将textarea插入到文档中
  document.body.appendChild(textarea);
  // 选中textarea中的文本
  textarea.select();
  // 执行复制命令
  document.execCommand("copy");
  // 移除textarea元素
  document.body.removeChild(textarea);
}

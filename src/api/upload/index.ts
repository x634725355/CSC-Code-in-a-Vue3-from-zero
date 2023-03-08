import { api } from "@/utils/request";
import { getUUID } from "@/utils/common";
import OSS from "ali-oss";

export interface Credentials {
    AccessKeyId: string;
    AccessKeySecret: string;
    Expiration: string;
    SecurityToken: string;
}

export async function getSecret() {
    const res = await api.get("/aliyun-oss/secret");
    if (res.data.code) return null;
    console.log("%c Line:13 🍕 res", "color:#33a5ff", res);
    return res.data.credentials as Credentials;
}

export async function getClient(region = "oss-cn-hangzhou", bucket = "csc-images") {
    const secret = await getSecret();
    if (!secret) return null;

    const { AccessKeyId, AccessKeySecret, SecurityToken } = secret;

    const client = new OSS({
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        stsToken: SecurityToken,
        refreshSTSToken: async () => {
            const res = await getSecret();
            return {
                accessKeyId: res!.AccessKeyId,
                accessKeySecret: res!.AccessKeySecret,
                stsToken: res!.SecurityToken,
            };
        },
        region,
        bucket,
    });

    return client;
}

export async function getList() {
    const client = await getClient();
    if (!client) return null;

    const result = await client.list({
        "max-keys": 100,
    }, {
        timeout: 2000
    });
    // console.log(result);

    return result;
}

export async function uploadImage(file: File, dir = "images") {
    const client = await getClient();
    if (!client) return null;

    // 自定义headers
    const headers = {
        // 指定该Object被下载时网页的缓存行为。
        "Cache-Control": "no-cache",
        // 指定该Object被下载时的名称。
        // 'Content-Disposition': 'oss_download.txt',
        // 指定该Object被下载时的内容编码格式。
        // 'Content-Encoding': 'UTF-8',
        // 指定Object的存储类型。
        // 'x-oss-storage-class': 'Standard',
        // 指定Object的访问权限。
        // 'x-oss-object-acl': 'private',
        // 设置Object的标签，可同时设置多个标签。
        // 'x-oss-tagging': 'Tag1=1&Tag2=2',
        // 指定CopyObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
        "x-oss-forbid-overwrite": "true",
    };

    const suffix = file.name.match(/[a-zA-Z0-9]+$/)?.[0] || "";
    const result = await client.put(`csc/${dir}/${getUUID()}.${suffix}`, file, {
        headers,
    });
}

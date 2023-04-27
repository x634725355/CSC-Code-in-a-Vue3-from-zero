<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { baseURL } from "@/utils/request";
import { getList } from "@/api/upload/index";
import { ObjectMeta } from "ali-oss";
import { copy } from "@/utils/common";
import { Notify } from "quasar";

const list = ref<ObjectMeta[]>([]);

async function setList() {
    const res = await getList();
    if (!res) return null;

    list.value = res.objects;
}

async function clickCopy(url: string) {
    const result = await copy(url);
    const hint = result ? '复制成功' : '复制失败, 请允许使用剪贴板';
    Notify.create({ message: hint, position: "top", color: "primary" });
}

onMounted(() => {
    setList();
});
</script>

<template>
    <div class="Upload">
        <q-uploader
            :url="`${baseURL}aliyun-oss/putAliObject`"
            method="POST"
            field-name="file"
            :multiple="true"
            style="max-width: 400px"
        >
        </q-uploader>

        <div class="list q-pa-md row">
            <q-card v-for="item in list" class="my-card">
                <q-card-section class="bg-primary" >
                    <img :src="item.url" class="img"  />
                </q-card-section>

                <q-card-section>
                    <div class="text-h6">ID: {{ item.owner?.id }}</div>
                    <div class="q-pt-none flex">
                        <span class="clip">URL: {{ item.url }}</span>
                        <q-btn
                            @click="clickCopy(item.url)"
                            color="primary"
                            size="xs"
                            label="复制"
                        />
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<style lang="less" scoped>
.Upload {
    .my-card {
        width: 100%;
        max-width: 250px;
        margin-right: 16px;
        margin-top: 16px;

        .img {
            max-width: 250px;
            width: 100%;
        }
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .clip {
        text-overflow: ellipsis;
        max-width: 70%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>

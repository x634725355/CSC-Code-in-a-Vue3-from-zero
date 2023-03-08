<script lang="ts" setup>
import { ref } from "vue";
import { baseURL } from "@/utils/request";
import { getList } from "@/api/upload/index";

const tempSecret = null;

getList().then((res) => {
    console.log("%c Line:10 🍢", "color:#465975", res);
});

</script>

<template>
    <div class="Upload">
        <q-uploader
            :url="`${baseURL}/aliyun-oss/putAliObject`"
            method="POST"
            field-name="file"
            :multiple="true"
            style="max-width: 400px"
        >
        </q-uploader>

        <div class="list" >

        </div>
    </div>
</template>

<style lang="less" scoped>
.Upload {
}
</style>

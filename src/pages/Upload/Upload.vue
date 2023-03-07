<script lang="ts" setup>
import { ref } from 'vue';




</script>

<template>
    <div class="Upload">
        <q-uploader
            url="http://localhost:7777/aliyun-oss/putAliObject"
            method="POST"
            field-name="file"
            :multiple="true"
            style="max-width: 400px"
        />
    </div>
</template>

<style lang="less" scoped>
.Upload {

}
</style>

<script lang="ts" setup>
import { ref } from 'vue';

const model = ref('Google');
const momo = ref(0);
const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

function handle() {
    
}

</script>

<template>
    <div class="Upload">
        <button @click="handle" >点击</button>
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
    .file {
    }

    .demo {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>

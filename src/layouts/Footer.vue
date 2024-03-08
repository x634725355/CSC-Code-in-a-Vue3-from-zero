<script setup lang="ts">
import { ref, computed, watch } from "vue";

</script>

<template>
    <div class="footer" >
        <span>备案号: </span>
        <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024056955号</a>
    </div>
</template>

<style lang="less" scoped >
    .footer {
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: black;

        a {
            text-decoration: none;
        }
    }
</style>

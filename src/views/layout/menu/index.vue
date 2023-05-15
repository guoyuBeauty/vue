<!-- 菜单页面 -->
<template>
  <div class="menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title
          ><el-icon><Setting /></el-icon><span>产品管理</span></template
        >
        <router-link to="/home">
          <el-menu-item index="1-1">首页</el-menu-item>
        </router-link>
        <router-link to="/upload">
          <el-menu-item index="1-2">文件上传</el-menu-item>
        </router-link>
        <el-sub-menu index="1-4">
          <template #title><span>文件管理</span></template>
          <el-menu-item index="1-4-1">文件列表</el-menu-item>
          <el-menu-item index="1-4-1">文件展示</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { Setting } from "@element-plus/icons-vue";

withDefaults(
  defineProps<{
    isCollapse: boolean;
  }>(),
  {
    isCollapse: true,
  }
);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

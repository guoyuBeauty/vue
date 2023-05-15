<template>
  <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs">
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <component :is="item.name"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import TsProject from "./childs/TsProject.vue";
import Vue3Project from "./childs/Vue3Project.vue";

// tapane的自由切换初始化定义
const editableTabsValue = ref(Vue3Project);
let editableTabs = reactive<any[]>([
  {
    title: "Tab 1",
    name: Vue3Project,
  },
  {
    title: "Tab 2",
    name: TsProject,
  },
]);
</script>

<style lang="scss" scoped>
.demo-tabs {
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #fff;
  height: calc(100% - 40px);
  min-width: calc(100% - 200px - 10px);
  width: 100%;
}
</style>

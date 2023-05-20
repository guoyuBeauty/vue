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
import { reactive, withDefaults, defineProps, computed } from "vue";
import TsProject from "../home/childs/TsProject.vue";
import Vue3Project from "../home/childs/Vue3Project.vue";
import CssAnimate from "../upload/childs/CssAnimate.vue";
import AnyFunction from "../upload/childs/AnyFunction.vue";
import CanvasReplay from "../upload/childs/CanvasReplay.vue";

const props = withDefaults(
  defineProps<{
    fromWhichComp: string;
  }>(),
  {
    fromWhichComp: "",
  }
);
console.log("props", props.fromWhichComp);

let arr = reactive<any>({
  // tapane的自由切换初始化定义
  editableTabsValue: Vue3Project,
  editableTabs: [
    {
      title: "Tab 1",
      name: Vue3Project,
      flag: "home",
    },
    {
      title: "Tab 2",
      name: TsProject,
      flag: "home",
    },
    {
      title: "Tab 1",
      name: CssAnimate,
      flag: "upload",
    },
    {
      title: "Tab 2",
      name: AnyFunction,
      flag: "upload",
    },
    {
      title: "Tab 3",
      name: CanvasReplay,
      flag: "upload",
    },
  ],
});
let editableTabs = computed(() => {
  return arr.editableTabs.filter(
    (item: any) => item.flag === props.fromWhichComp
  );
});
let editableTabsValue = computed(() => {
  return props.fromWhichComp === "home" ? Vue3Project : AnyFunction;
});
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

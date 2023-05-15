<!-- 主页布局容器 -->
<template>
  <div class="layout">
    <header>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 40px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
      </el-radio-group>
    </header>
    <container>
      <aside>
        <Menu :isCollapse="isCollapse" />
      </aside>
      <context>
        <router-view />
      </context>
    </container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "./menu/index.vue";

const isCollapse = ref(true);
</script>
<style lang="scss">
::-webkit-scrollbar {
  //滚动条整体部分
  width: 16px;
  background: transparent;
}
//滚动条里面的小方块（即滚动条滑块），能向上向下移动（或横向滚动条可往左往右移动）
::-webkit-scrollbar-thumb {
  border: 3px;
  //   background: #ccc;
  background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

//滚动条的轨道（对应上图滚动条凹槽，里面装有Thumb，即滚动条滑块）
::-webkit-scrollbar-track {
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
}
</style>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  header {
    background: rgb(51 53 56);
    height: 50px;
    line-height: 50px;
    padding: 0px 12px 12px;
  }
  container {
    height: calc(100% - 50px - 15px);
    display: flex;
    background: rgb(236 226 226);
    box-sizing: border-box;
    aside {
      background: #fff;
      height: 100%;
    }
    context {
      overflow-y: scroll;
      overflow-x: hidden;
      background: #fff;
      height: calc(100% - 24px);
      margin: 12px 8px;
      min-width: calc(100% - 200px - 10px);
      width: 100%;
    }
  }
}
</style>

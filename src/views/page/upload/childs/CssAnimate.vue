<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(row, index) in columns.arr"
      :key="index"
      :prop="row.prop"
      :label="row.label"
      :width="row.minWidth"
    />
    <!-- {{}}
    <el-table-column
      v-if="row.prop === 'action'"
      :prop="row.prop"
      :label="row.label"
      :width="row.minWidth"
    /> -->
    <!-- <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const handleClick = () => {
  console.log("click");
};
const handleUpdate = (row, index) => {
  console.log(row, "999");
};
/**
 * 自定义渲染表格操作列
 * @param h createElement方法
 * @param {any} row 表格行数据
 * @returns {any} 渲染后的单元格元素
 */
const renderAction = (h: any, { row, index }: any) => {
  return h("p", [
    h(
      "el-tag",
      {
        props: {
          type: "info",
        },
        on: {
          click: () => {
            handleUpdate(row, index);
          },
        },
      },
      "编辑"
    ),
    h(
      "el-tag",
      {
        style: {
          marginLeft: "5px",
        },
        on: {
          click: () => {
            handleClick();
          },
        },
      },
      "删除"
    ),
  ]);
};
const columns = reactive({
  arr: [
    // {
    //   type: "index",
    //   label: "序号",
    //   align: "center",
    //   width: "50px",
    //   fixed: "left",
    // },
    // {
    //   prop: "action",
    //   label: "操作",
    //   fixed: "right",
    //   render: renderAction,
    //   align: "center",
    //   width: "150px",
    // },
    { prop: "date", label: "Date", align: "center", minWidth: "150" },
    { prop: "name", label: "Name", minWidth: "120", align: "center" },
    { prop: "city", label: "City", minWidth: "120" },
    {
      prop: "contAmt",
      label: "合同金额",
      format: "number|#,###.00",
      align: "right",
      minWidth: "150",
    },
    {
      prop: "signDate",
      label: "签订日期",
      format: "date|yyyy-MM-dd",
      align: "center",
      minWidth: "120",
    },
  ],
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
</script>

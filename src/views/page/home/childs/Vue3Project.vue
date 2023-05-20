<template>
  <div class="top-content">
    <el-tooltip content="是否开启图片上传" placement="top">
      <el-switch
        v-model="isShowUpload"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        :active-value="true"
        :inactive-value="false"
        @change="
          ($event) => {
            isShowUpload = $event;
          }
        "
      />
    </el-tooltip>
    <el-button
      v-show="isShowUpload"
      type="primary"
      @click="dialog = true"
      :style="{ margin: '0 12px' }"
      >新增卡片信息</el-button
    >
    <el-color-picker v-model="colorWhich" @change="changeColor" />
    <el-drawer
      ref="drawerRef"
      v-model="dialog"
      title="卡片信息新增"
      :before-close="handleClose"
      direction="rtl"
      class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
            <el-input
              v-model="form.desc"
              :rows="3"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <el-form-item
            label="图片"
            :label-width="formLabelWidth"
            prop="fileList"
          >
            <el-upload
              v-model:file-list="form.fileList"
              multiple
              action="http://localhost:3001/profile"
              list-type="picture-card"
              :on-success="handlePictureCardSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm(ruleFormRef)"
            >{{ loading ? "Submitting ..." : "Submit" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>

  <el-row :gutter="12">
    <el-col
      :span="8"
      v-for="item in cardList"
      :key="item.id"
      @click="(e) => editCard(e, item.id)"
    >
      <el-card shadow="always" class="card-info">
        <div class="img-wrapper">
          <img
            :src="require(`@/assets/imgsForHome/${item.source}`)"
            :alt="item.imgInfo"
          />
        </div>
        <div class="img-desc">
          <h2>{{ item.title }}</h2>
          <p :class="`context${item.id}`">{{ item.desc }}</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" v-if="isShowUpload">
      <div class="card-add"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
import { ElDrawer, ElMessageBox, ElMessage } from "element-plus";
import type { UploadProps, FormRules, FormInstance } from "element-plus";

/**
 * @param: 新增卡片信息弹窗
 */
type CardInfo = {
  title: string;
  desc: string;
};
type FileObj = {
  id: number;
  source: string;
  title: string;
  desc: Date | string;
  imgInfo: string;
  createTime: Date;
};
// 文件列表存储初始化
const fileList = ref<FileObj[]>([]);
const formLabelWidth = "80px";
let timer: any = null;
const dialog = ref<boolean>(false);
const loading = ref<boolean>(false);
// 表单信息存储
const ruleFormRef = ref<FormInstance>();
const form = reactive<CardInfo & { fileList: any }>({
  title: "",
  desc: "",
  fileList: [],
});
const rules = reactive<FormRules>({
  title: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
  fileList: [{ required: true, message: "文件不能为空", trigger: "change" }],
});
const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (fileList.value.length === 0) {
        ElMessage({
          message: "请上传图片信息！",
          type: "warning",
        });
      } else {
        let { source, id, createTime } = fileList.value[0];
        cardList.push({
          id: id,
          source,
          imgInfo: source,
          title: form.title,
          desc: form.desc,
          createTime,
        });
        formEl.resetFields();
        drawerRef.value!.close();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleClose = (done: any) => {
  cancelForm();
};
const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  ruleFormRef?.value?.resetFields();
};

/**
 * @description: 取色器
 */
const colorWhich = ref("#409EFF");
const changeColor = (val: string) => {
  console.log(val, "颜色");
  colorWhich.value = val;
};

/**
 * @description: 卡片展示列表
 */
let cardList = reactive<FileObj[]>([
  {
    id: 0,
    source: "ellipsis.png",
    imgInfo: "胡歌",
    title: "单行文本溢出省略号",
    desc: "我们应该如何实现单行文本溢出出现省略号呢？接下来我们通过示例去试一试，并把实现过程记录下来",
    createTime: new Date(),
  },
  {
    id: 1,
    source: "clamp3.png",
    imgInfo: "胡歌",
    title: "多行文本溢出省略号",
    desc: "我们应该如何实现多行文本溢出出现省略号呢？接下来我们通过示例去试一试，并把实现过程记录下来我们应该如何实现多行文本溢出出现省略号呢？接下来我们通过示例去试一试，并把实现过程记录下来",
    createTime: new Date(),
  },
]);
let isShowUpload = ref<boolean>(false);
/**
 * 图片上传成功后的事件处理
 */
const handlePictureCardSuccess: UploadProps["onSuccess"] = () => {
  axios.get("http://localhost:3001/imgs").then((res) => {
    console.log(res.data, "图片信息");
    fileList.value = [
      {
        id: res.data.id,
        source: res.data.filename,
        imgInfo: res.data.filename,
        title: res.data.filename.slice(0, 9),
        desc: res.data.createTime,
        createTime: res.data.createTime,
      },
    ];
    form.title = res.data.filename.slice(0, 9);
    form.desc = res.data.createTime;
    // cardList.push({
    //   id: res.data.id,
    //   source: res.data.filename,
    //   imgInfo: res.data.filename,
    //   title: res.data.filename.slice(0, 9),
    //   desc: res.data.createTime,
    // });
  });
};

/**
 * @description: 编辑卡片信息
 */
const editCard = (e: any, id: number) => {
  e.target.contentEditable = true;
  if (e.target.tagName === "h2") {
    cardList[id].title = e.target.innerText;
  } else if (e.target.tagName === "p") {
    cardList[id].desc = e.target.innerText;
  }
  console.log(e.target.tagName, "获取dom节点");
};
</script>

<style lang="scss" scoped>
.top-content {
  margin-bottom: 20px;
}
.card-info:hover {
  box-shadow: 3px 3px 10px 5px v-bind(colorWhich);
}
.card-info {
  // background: v-bind(colorWhich);
  margin: 0 6px 12px;
  height: 450px;
  box-shadow: 7px 6px 8px 1px rgba(0, 0, 0, 0.1);
  .img-wrapper {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-desc {
    h2 {
      margin-top: 8px;
      line-height: 38px;
    }
    p {
      color: #ccc;
      font-size: 16px;
    }
    .context0 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .context1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>

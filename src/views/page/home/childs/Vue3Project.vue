<template>
  <Container>
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
        <div class="card-add">
          <el-upload
            multiple
            :show-file-list="false"
            action="http://localhost:3001/profile"
            list-type="picture-card"
            :on-success="handlePictureCardSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </Container>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import Container from "../../comps/Container.vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import axios from "axios";

// 卡片展示列表
let cardList = reactive<any[]>([
  {
    id: 0,
    source: "ellipsis.png",
    imgInfo: "胡歌",
    title: "单行文本溢出省略号",
    desc: "我们应该如何实现单行文本溢出出现省略号呢？接下来我们通过示例去试一试，并把实现过程记录下来",
  },
  {
    id: 1,
    source: "clamp3.png",
    imgInfo: "胡歌",
    title: "多行文本溢出省略号",
    desc: "我们应该如何实现多行文本溢出出现省略号呢？接下来我们通过示例去试一试，并把实现过程记录下来我们应该如何实现多行文本溢出出现省略号呢？接下来我们通过示例去试一试，并把实现过程记录下来",
  },
]);
let isShowUpload = ref<boolean>(true);

const handlePictureCardSuccess: UploadProps["onSuccess"] = (uploadFile) => {
  axios.get("http://localhost:3001/imgs").then((res) => {
    console.log(res.data, "图片信息");
    cardList.push({
      id: res.data.id,
      source: res.data.filename,
      imgInfo: res.data.filename,
      title: res.data.filename.slice(0, 9),
      desc: res.data.createTime,
    });
  });
};
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

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

<!-- <style lang="scss">
.el-upload-list .el-upload-list--picture-card {
  width: 100% !important;
  height: 100% !important;
}
el-col {
  width: 100% !important;
}
.el-upload--picture-card {
  width: 100% !important;
  height: 100% !important;
}
</style> -->
<style lang="scss" scoped>
.card-info:hover {
  box-shadow: 3px 3px 10px 5px rgba(0, 0, 0, 0.3);
}
.card-info {
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
.card-add {
  width: calc(100% - 40px);
  min-height: calc(100% - 40px - 12px);
  background: pink;
  padding: 20px;
  .el-icon {
    font-size: 58px;
  }
}
// .el-upload--picture-card::v-deep {
//   height: 100% !important;
//   width: 100% !important;
// }
// .el-upload-list--picture-card::v-deep {
//   height: 100% !important;
//   width: 100% !important;
// }
</style>

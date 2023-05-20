<template>
  <div class="config">
    <div class="btn">
      <el-button type="success" round id="replay">重放</el-button>
      <el-button type="danger" round id="clear">清空</el-button>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">画笔大小：</span>
      <el-slider
        v-model="colorSize"
        placement="right"
        max="20"
        @change="changSize"
      />
    </div>
    <div>
      <span class="color-which">画笔颜色：</span>
      <el-color-picker v-model="colorWhich" @change="changeColor" />
    </div>
  </div>
  <canvas id="cvs" class="canvas"></canvas>
</template>

<script lang="js" setup>
import { onMounted, ref } from "vue";
const colorWhich = ref("#409EFF");//画笔颜色
const colorSize = ref(4);//画笔大小粗细
const changeColor = (val) => {
    console.log(val, "颜色");
    colorWhich.value = val;
    const c = draw()
    c()
};
const changSize = (val) => {
    console.log(val, "画笔大小");
    colorSize.value = val;
    const c = draw()
    c()
}
onMounted(()=>{
    draw()
});
const draw =()=>{
    class Draw {
        constructor(element, height, width, colorSize,colorWhich) {
            //   制作canvas画布
            this.element = document.querySelector(element);
            this.canvas = this.element.getContext("2d");
            this.colorSize = colorSize;
            this.color = colorWhich;
            this.element.width = width;
            this.element.height = height;
            // this.timeId = null;
            this.animateArr = []; //用来存储坐标
            this.speedTime = 20; //回放轨迹速度
        }
        // 初始化配置
        init() {
            const { canvas: c, element } = this;
            let isDrag = false;//控制起笔
            c.lineWidth = Number(this.colorSize);//控制画笔粗细
            c.lineJoin = "round";
            c.strokeStyle = this.color;//画笔颜色
            c.shadowColor = this.color;//触笔的渲染颜色
            c.shadowBlur = 4;//水墨画效果

            //   鼠标事件  控制画笔
            element.onmousedown = () => {
                isDrag = true;
                c.beginPath(); //重新起笔
            };
            element.onmousemove = (e) => {
                if (isDrag) {
                    const x = e.pageX - element.offsetLeft;
                    const y = e.pageY - element.offsetTop;
                    c.lineTo(x, y);
                    c.stroke();
                    this.animateArr.push([x, y]);
                }
            };
            // 以下是停止操作逻辑
            element.onmouseup = () => {
                isDrag = false;
                this.animateArr.push(-1);
            };
            element.onmouseout = () => {
                element.onmouseup();
            };
        }
        // 重新绘画轨迹
        replay() {
            const { canvas: c } = this;
            this.clear();
            c.beginPath();
            // 控制渲染频率不能太快
            const loop = (animate, i) => {
                if (animate.length - 1 > i) {
                    const arr = animate[i];
                    if (arr === -1) {
                        // 那就说明这笔结束了，回到初始位置
                        c.beginPath();
                    } else {
                        c.lineTo(arr[0], arr[1]);
                        c.stroke();
                    }
                    i++;
                    // 递归轮播画笔轨迹
                    setTimeout(() => {
                        loop(animate, i);
                    }, this.speedTime);
                }
            };
            loop(this.animateArr, 0);
        }
        clear() {
            //  清除画笔轨迹
            const { canvas: c } = this;
            const { height, width } = this.element;
            c.clearRect(0, 0, width, height);
        }
    }
    const d = new Draw("#cvs", 600, 1300, 4, colorWhich.value);
    // 初始化配置
    d.init();
    document.getElementById("replay").onclick = () => {
        d.replay();
    };
    document.getElementById("clear").onclick = () => {
        d.clear();
        d.animateArr = [];
    };

    const configChg = () =>{
        const d = new Draw("#cvs", 600, 500, colorSize.value, colorWhich.value);
        const { canvas: c } = d;
        c.lineWidth = Number(colorSize.value);//控制画笔粗细
        c.lineJoin = "round";
        c.strokeStyle = colorWhich.value;//画笔颜色
        c.shadowColor = colorWhich.value;//触笔的渲染颜色
        c.shadowBlur = 4;//水墨画效果
    }
    return configChg
}
</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid #ccc;
}
.config {
  display: flex;
  flex-direction: column;
  width: 200px;
  .btn {
    width: 300px;
  }
  .slider-demo-block {
    display: flex;
    .demonstration {
      width: 150px;
    }
  }
}
</style>

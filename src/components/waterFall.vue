<template>
  <div class="waterFall-box" ref="box">
    <div class="img-box" v-for="(item, index) in images" :key="index" ref="img">
      <img :src="item.filePath" alt="" @click="changeManagePicture(item)">
    </div>
    <el-dialog title="图片管理" :visible.sync="managePicture" :modal-append-to-body='false' top="20vh" width="45%">
      <manage-files :file="picture" :fileType="1"/>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import manageFiles from "@/components/manageFiles";

export default {
  name: "WaterFall",
  components:{
    manageFiles,
  },
  data() {
    return {
      images: [], //存储图片资源
      imgWidth: 220, //图片的宽度
      heightArray: [],  //存储高度数组，用于判断最小高度的图片位置
      surplusW: 0, //是否存在剩余宽度
      offsetP: 0,
      count: 0,
      visible:false,
      managePicture:false,
      picture:{},
    }
  },
  props: {
    pictureType:{
      pictureType:String,
    }
  },
  watch:{
    //实现图片顶栏分目录切换图片功能
    async pictureType(value){
      this.images.splice(0)
      this.heightArray.splice(0)
      this.surplusW = 0
      this.offsetP = 0
      this.count = 0
      let arr = [value, 1]
      await this.getPictureByDir(arr)
      this.images = this.files
      this.loadImgHeight()
    },
    refresh:{
      async handler(value){
        if (value === 1) {
          this.images.splice(0)
          this.heightArray.splice(0)
          this.surplusW = 0
          this.offsetP = 0
          this.count = 0
          let arr = [this.pictureType, 1]
          await this.getPictureByDir(arr)
          this.images = this.files
          this.loadImgHeight()
          this.setRefresh(0)
        }
      }
    },
    openWindow:{
      async handler(value){
        if (value === 0){
          this.managePicture = false
        }
      }
    }
  },
  computed:{
    ...mapState('fileAndDirectory', ['files','directories','refresh','openWindow']),
  },
  methods: {
    ...mapActions('fileAndDirectory', {getPictureByDir:'getFileByDir',getDirectory:'getDirectory'}),
    ...mapMutations('fileAndDirectory', {setRefresh:'setRefresh',setOpenWindow:'setOpenWindow'}),
    changeManagePicture(value){
      this.picture = value
      this.managePicture = true
      this.setOpenWindow(1)
    },
    async initPicture(){
      let arr = ['全部', 1]
      await this.getPictureByDir(arr)
      this.images = this.files
      this.loadImgHeight()
    },
    /**
     * 预加载图片资源
     * */
    loadImgHeight() {
      let count = 0 //计数变量 判断是否预加载图片是否完成
      Array.from(this.images).forEach((item) => {
        //使用image类预加载图片
        let image = new Image()
        image.src = item.filePath
        image.onload = image.onerror = event => {
          count++
          if (count === this.images.length) {
            this.$nextTick(() => {
              this.init()
              this.positionImg(0)
            })
          }
        }
      })
    },
    /**
     * @remarks 初始化
     * 初始化容器的宽度，计算出容器可容纳多少固定宽度图片的列，
     * 如果可排列固定宽度的图片宽度无法沾满容器的宽度，需要计算出空余的宽度，固定首图片的left
     * */
    init() {
      //得到页面的宽度
      const pageWidth_padding = this.$refs.box.clientWidth
      //页面的padding像素
      this.offsetP = this.$refs.box.style.paddingLeft.replace(/[^0-9]/ig, "")
      //获得页面的真实宽度（除去padding、margin、border...）
      const pageWidth = pageWidth_padding - (this.offsetP * 2)
      //计算出当前页面可展示多少列图片
      const column = Math.floor(pageWidth / this.imgWidth)
      //偏移像素值
      this.surplusW = pageWidth - (column * this.imgWidth)
      //初始化存储高度数组
      for (let i = 0; i < column; i++) {
        this.heightArray.push(0)
      }
    },
    /**
     * @remark 定位图片
     * @param:
     *  start: 循环开始位置，开始为0，如果滚动条滑到底部，则start为容器存在图片资源的数量即this.images.length
     *  ----------宽高都计算img的父容器的宽高
     * */
    positionImg(start) {
      //获得img标签的父容器的DOM
      let parentDom = this.$refs.img
      for (let i = start; i < this.images.length; i++) {
        //获得最小高度
        const minHeight = Math.min(...this.heightArray)
        //获得最小高度索引
        const index = this.heightArray.indexOf(minHeight)
        //获得当前图片的高度
        const currHeight = parentDom[i].clientHeight
        //定位
        parentDom[i].style.transform = '50px'
        parentDom[i].style.position = 'absolute'
        parentDom[i].style.top = minHeight + 'px'
        parentDom[i].style.left = this.imgWidth * index + +((Math.floor((this.surplusW / 2)) + 10)) + 'px'
        this.heightArray[index] += currHeight
      }
      //对父容器赋值当前heightArray数组的最大高度
      this.$refs.box.style.height = Math.max(...this.heightArray) + 50 + 'px'
    },
  },
  mounted() {
    this.initPicture()
  }
}
</script>

<style scoped>

.waterFall-box {
  height: 100%;
  width: 100%;
  position: relative;
  text-align: left;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

.waterFall-box .img-box {
  width: 210px;
  vertical-align: top;
  display: block;
  float: left;
  flex-direction: column;
}

.waterFall-box .img-box img {
  width: 100%;
  animation: imgBox .5s ease-in-out;
}

.waterFall-box .img-box img:hover {
  transform: translateY(-3px);
  transition: transform .5s ease-in-out;
  box-shadow: 0 10px 10px 2px #737373;
}

@keyframes imgBox {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

button {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  outline: 0;
}

ul {
  margin: 0;
  padding: 0;
  display: block;
  list-style-type: disc;
  margin-block-start: 0;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 40px;
}

li {
  width: 40%;
  list-style-type: none;
  display: inline-block;
  font-size: 18px;
  /*border-left: 0.05rem solid #ccc;*/
  text-align: center;
  margin-block-start: 0.2em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-top: 6px;
}

input {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  margin-top: 6px;
  font-size: 18px;
  color: #fff;
  border-bottom: 1px solid white;
}
</style>
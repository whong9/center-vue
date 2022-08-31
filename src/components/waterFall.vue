<template>
  <div class="waterFall-box" ref="box">
    <div class="img-box" v-for="(item, index) in images" :key="index" ref="img">
      <img :src="require('../assets' + item)" alt="">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WaterFall",
  data() {
    return {
      images: [], //存储图片资源
      imgWidth: 220, //图片的宽度
      heightArray: [],  //存储高度数组，用于判断最小高度的图片位置
      surplusW: 0, //是否存在剩余宽度
      offsetP: 0,
      count: 0
    }
  },
  methods: {
    /**
     * 预加载图片资源
     * */
    loadImgHeight() {
      let count = 0 //计数变量 判断是否预加载图片是否完成
      Array.from(this.images).forEach((item) => {
        //使用image类预加载图片
        let image = new Image()
        image.src = item
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
        parentDom[i].style.left = this.imgWidth * index + +((Math.floor((this.surplusW / 2)) + 30)) + 'px'
        this.heightArray[index] += currHeight
      }
      //对父容器赋值当前heightArray数组的最大高度
      this.$refs.box.style.height = Math.max(...this.heightArray) + 50 + 'px'
    }
  },
  created() {
    axios({
      url: '/fileAndVideo/getPicture',
      params:{
        param:'temp',
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === "200") {
        console.log(res.data.data);
        this.images = res.data.data ? res.data.data : []
        this.loadImgHeight()
      }
    })
  }
}
</script>

<style scoped>
.right {
  width: 100%;
  height: 94vh;
  margin: 20px 20px 20px 0;
  /*background-color: grey;*/
  display: flex;
  flex-direction: column;
}

.right-top {
  height: 35px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.right-bottom {
  width: 100%;
  display: block;
}

.right-right {
  display: block;
  width: 30%;
  height: 35px;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.row {
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
}

.col-xl-8, .col-lg-12 {
  padding: 0 15px;
  width: 100%;
}

.tab {
  margin: 19px 0 !important;
  text-align: left !important;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  display: block;
  color: rgba(0, 0, 0, .85);
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}

.waterFall-box {
  height: 100%;
  width: 100%;
  position: relative;
  text-align: center;
  overflow-y: hidden;
  /*display: flex;*/
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
  box-shadow: 0 20px 20px 2px #737373;
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

.right-top-left {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-transition: all .2s;
  font-size: 0;
  white-space: nowrap;
  position: relative;
  left: 0;
  height: 32px;
  border-bottom-width: 0;
  border-bottom-style: none;
  width: 25%;
}

.right-top-right {
  width: 57%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin-block-start: 0;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.search-source {
  width: 100%;
  height: 32px;
  padding-left: 8px;
  border-radius: 4px;
  border: 1px solid rgba(237, 237, 237, 1);
}

button {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  outline: 0;
}

.search-btn {
  width: 58px;
  height: 31px;
  background-color: #333333;
  border: 1px solid snow;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 32px;
  cursor: pointer;
}

el-button {

}

.upload-source {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  width: 100%;
  height: 34px;
}

.upload-title {
  width: 100%;
  height: 34px;
  background-color: #db4437;
  border-radius: 5px 0 0 5px;
  color: white;
  line-height: 34px;
  text-align: center;
}

.upload-btn {
  width: 25%;
  height: 34px;
  background-color: #cc292c;
  border-radius: 0 5px 5px 0;
  color: white;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
}

.iconfont {
  font-family: "iconfont", sans-serif !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

.li-search {
  width: 56px;
  list-style-type: none;
  display: inline-block;
  font-size: 18px;
  /*border-left: 0.05rem solid #ccc;*/
  text-align: left;
  margin: 0 5px;
  margin-block-start: 0.2em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.ul-upload {
  margin: 1px;
  padding: 0;
  display: block;
  list-style-type: disc;
  margin-block-start: 0.2em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 40px;
  font-size: 18px;

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
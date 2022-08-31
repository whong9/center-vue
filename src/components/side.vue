<template>
  <div class="wrap">
    <div class="nav">
      <!--头像-->
      <div class="icon">
        <div class="icon-img"><img src="../assets/cat.jpg" alt=""/></div>
        <div class="icon-con">
          <p>Good Day</p>
          <h2>王泓</h2>
        </div>
      </div>
      <div class="line"></div>
      <div class="title">
        <p>页面菜单</p>
      </div>
      <div class="menu">
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-home-circle"></span></div>
          <a href="" class="con">首页</a>
          <div class="ricon"><span class="iconfont icon-shezhi"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-Weblogic"></span></div>
          <router-link class="con" active-class="active" to="/blog">博客</router-link>
          <div class="ricon"><span class="iconfont icon-Weblogic"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-tupian"></span></div>
          <router-link class="con" active-class="active" to="/picture">图片</router-link>
          <div class="ricon"><span class="iconfont icon-tupian"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-yinle-tianchong"></span></div>
          <router-link class="con" active-class="active" to="/music">音乐</router-link>
          <div class="ricon"><span class="iconfont icon-yinle-tianchong"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-shipin1"></span></div>
          <router-link class="con" active-class="active" to="/myVideo">视频</router-link>
          <div class="ricon"><span class="iconfont icon-shipin1"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-doc_circle_fill"></span></div>
          <router-link class="con" active-class="active" to="/project">项目</router-link>
          <div class="ricon"><span class="iconfont icon-doc_circle_fill"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-book_circle_fill"></span></div>
          <router-link class="con" active-class="active" to="/novel">小说</router-link>
          <div class="ricon"><span class="iconfont icon-book_circle_fill"></span></div>
        </div>
      </div>
      <div class="line"></div>
      <div class="title">
        <p>工具栏</p>
      </div>
      <div class="serve">
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-yingxionglianmeng"></span></div>
          <a href="" class="con">英雄联盟</a>
          <div class="ricon"><span class="iconfont icon-yingxionglianmeng"></span></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon"><span class="iconfont icon-cloudupload-fill"></span></div>
          <a href="#" class="con" @click="openWindow">文件上传</a>
          <div class="ricon"><span class="iconfont icon-cloudupload-fill"></span></div>
        </div>
      </div>
    </div>

    <el-dialog title="文件上传" :visible.sync="isOpen" :modal-append-to-body='false'>
      <upload-files/>
    </el-dialog>
  </div>
</template>

<script>
import UploadFiles from "@/components/uploadFiles";
import {mapActions} from "vuex";

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Side",
  data() {
    return {
      isOpen: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },
  components: {
    UploadFiles
  },
  methods: {
    openWindow() {
      this.isOpen = true;
    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.6);
}

.el-dialog {
  z-index: 2043 !important;
}

a {
  text-decoration: none;
}

.wrap {
  width: 250px;
  height: 100%;
  background-size: cover;
  display: flex;
  background-image: linear-gradient(to right, white, whitesmoke);
  position: fixed;
}

body {
  margin: 0;
  background-color: whitesmoke;
}

.nav {
  width: 110px;
  /*    width: 280px;*/
  margin-right: 20px;
  height: 100%;
  background: #336699;
  /*border-radius: 20px;*/
  overflow: hidden;
  transition: 0.5s;
}

.nav:hover {
  width: 200px;
}

.btn {
  width: 60px;
  height: 10px;
  display: flex;
  justify-content: space-around;
  margin-left: 25px;
  margin-top: 25px;
}

.btn-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.btn-item:nth-child(1) {
  background: deepskyblue;
}

.btn-item:nth-child(2) {
  background: #f8bc33;
}

.btn-item:nth-child(3) {
  background: #62cb44;
}

.icon {
  width: 250px;
  height: 60px;
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
}

.icon-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.icon-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.icon-con {
  height: 60px;
  margin-left: 25px;
}

.icon-con p {
  padding-top: 5px;
}

.icon-con h2 {
  font-weight: 400;
}

.line {
  width: 60px;
  height: 1px;
  background: rgba(245, 253, 255, 0.5);
  margin: 20px 25px;
  transition: 0.5s;
}

.nav:hover .line {
  width: 230px;
}

.title {
  width: 60px;
  margin-left: 25px;
  margin-bottom: 20px;
}

.title p {
  font-size: 14px;
}

.menu {
  width: 230px;
  margin-left: 25px;
}

.item {
  display: flex;
  position: relative;
  transition: 0.5s;
  border-radius: 6px;
}

.item:hover {
  background: #409EFF;
}

.licon {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con {
  width: 0px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  left: -20px;
  opacity: 0;
}

.nav:hover .con {
  width: 160px;
  display: flex;
  justify-content: flex-start;
  text-indent: 20px;
  align-items: center;
  opacity: 1;
}

.ricon {
  width: 0px;
  height: 50px;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0;
}

.nav:hover .ricon {
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.iconfont {
  font-size: 26px;
}

.ricon .iconfont {
  font-size: 20px;
  color: #62cb44;
}

.light {
  width: 6px;
  height: 50px;
  background: deepskyblue;
  position: absolute;
  left: -25px;
  transition: 0.5s;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0;
}

.item:hover .light {
  opacity: 1;
}

.serve {
  width: 60px;
  /*background: rgba(98, 203, 68, 0.5);*/
  /*background: rgba(0, 0, 0, 0.5);*/
  margin-left: 25px;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.5s;
}
.nav:hover .serve {
  width: 230px;
}

</style>
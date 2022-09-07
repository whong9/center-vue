<template>
  <div class="video-main">
    <el-header>
      <el-radio-group v-model="dir" class="top-left">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button
            v-for="(name, index) of directories"
            :key="index"
            :label="name">
        </el-radio-button>
      </el-radio-group>
      <el-button-group class="top-right">
        <el-button type="primary" icon="el-icon-upload" @click="openUploadWindow">管理</el-button>
      </el-button-group>
    </el-header>
    <el-main class="el-main-back">
      <div v-for="(video, index) of videos" :key="index" class="video-main-bottom-cardList-card">
        <div class="video-main-bottom-cardList-card-top">
          <video controls :src="video.filePath" width="250px" height="140px"></video>
        </div>
        <div class="video-main-bottom-cardList-card-bottom">
          <h3 @click="openManageFileWindow(video)">【{{video.fileDir}}】{{ video.name }}</h3>
        </div>
      </div>
    </el-main>
    <el-dialog title="视频管理" :visible.sync="uploadIsOpen" :modal-append-to-body='false' width="45%">
      <upload-files :fileDir="dir" :fileType="2"/>
    </el-dialog>
    <el-dialog title="视频管理" :visible.sync="manageVideo" :modal-append-to-body='false' top="20vh" width="45%">
      <manage-files :file="video" :fileType="2"/>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import uploadFiles from "@/components/uploadFiles";
import manageFiles from "@/components/manageFiles";

export default {
  name: "myVideo",
  data(){
    return {
      videos:[],
      dir:'全部',
      uploadIsOpen:false,
      video:{},
      manageVideo:false,
    }
  },
  components:{
    uploadFiles,
    manageFiles,
  },
  computed: {
    ...mapState('fileAndDirectory', ['directories','files','refresh','openWindow']),
  },
  watch:{
    refresh:{
      async handler(value){
        if (value === 1) {
          let arr = [this.dir, 2]
          await this.getVideosByDir(arr)
          this.videos = this.files
          this.setRefresh(0)
        }
      }
    },
    openWindow:{
      async handler(value){
        if (value === 0){
          this.manageVideo = false
        }
      }
    },
    dir:{
      async handler(  ){
        let arr = [this.dir, 2]
        await this.getVideosByDir(arr)
        this.videos = this.files
      }
    }
  },
  methods:{
    ...mapActions('fileAndDirectory', {getDirectory:'getDirectory',getVideosByDir:'getFileByDir'}),
    ...mapMutations('fileAndDirectory', {setRefresh:'setRefresh',setOpenWindow:'setOpenWindow'}),
    openUploadWindow(){
      this.uploadIsOpen = true
    },
    openManageFileWindow(value){
      this.video = value
      this.manageVideo = true
      this.setOpenWindow(1)
    },
    async initVideo(){
      await this.getDirectory(2)
      let arr = [this.dir,2]
      await this.getVideosByDir(arr)
      this.videos = this.files
    }
  },
  mounted() {
    this.initVideo()
  }
}
</script>

<style scoped>
.video-main {
  height: 100%;
  width: 100%;
}

.video-main-bottom-cardList-card {
  height: 200px;
  width: 250px;
  margin: 10px;
}

.video-main-bottom-cardList-card-top {
  height: 140px;
  width: 250px;
}
.video-main-bottom-cardList-card-bottom{
  height: 60px;
  width: 250px;
}
video {
  border-radius: 6px;
}
h3 {
  font-size: 15px;
  cursor: pointer;
}
.top-left {
  margin-left: 0.5%;
  margin-top: 0.8%;
}
.top-right {
  float: right;
  margin-top: 0.8%;
}
.el-header{
  border: 1px solid #cccccc;
  background-color: whitesmoke
}
.el-main-back{
  margin-top: 1%;
  height: 90%;
  background-image: linear-gradient(180deg, whitesmoke, whitesmoke);
  border: 1px solid #cccccc;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  padding-left: 50px;
}
</style>
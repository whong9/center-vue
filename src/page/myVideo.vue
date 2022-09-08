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
        <el-button type="primary" icon="el-icon-s-operation" @click="openManageWindow">管理</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="openUploadWindow">上传</el-button>
      </el-button-group>
    </el-header>
    <el-main class="el-main-back">
      <div v-for="(video, index) of videos" :key="index" class="video-main-bottom-cardList-card">
        <div class="video-main-bottom-cardList-card-top">
          <video controls :src="video.filePath" width="250px" height="140px" onfocus=""></video>
        </div>
        <div class="video-main-bottom-cardList-card-bottom">
          <h3 @click="openManageFileWindow(video)">【{{video.fileDir}}】{{ video.name }}</h3>
        </div>
      </div>
    </el-main>
    <el-dialog title="视频上传" :visible.sync="uploadIsOpen" :modal-append-to-body='false' width="45%">
      <upload-files :fileDir="dir" :fileType="2"/>
    </el-dialog>
    <el-dialog title="视频管理" :visible.sync="manageVideo" :modal-append-to-body='false' top="20vh" width="45%">
      <manage-files :file="video" :fileType="2"/>
    </el-dialog>
    <el-dialog title="视频管理" :visible.sync="manageWindow" :modal-append-to-body='false' top="20vh" width="45%">
      <el-table
          :data="videos"
          border
          style="width: 100%">
        <el-table-column
            prop="name"
            label="文件名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="formatTime"
            label="上传时间"
            width="180">
        </el-table-column>
        <el-table-column
            prop="fileDir"
            label="所在目录"
            width="100">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button class="red-font" @click="" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">重新上传</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      manageWindow:false,
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
        setTimeout(async ()=>{
          if (value === 1) {
            let arr = [this.dir, 2]
            await this.getVideosByDir(arr)
            this.videos = this.files
            this.setRefresh(0)
          }
        }, 50)
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
    ...mapActions('fileAndDirectory', {getDirectory:'getDirectory',getVideosByDir:'getFileByDir',deleteVideo:'deleteFile'}),
    ...mapMutations('fileAndDirectory', {setRefresh:'setRefresh',setOpenWindow:'setOpenWindow'}),
    openManageWindow(){
      this.manageWindow = true
    },
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
    },
    async deleteFile(){
      await this.deleteVideo(this.file.fileId)
      this.setRefresh(1)
      this.setOpenWindow(0)
      if (this.code === '200') {
        this.$message.success(this.msg)
      } else {
        this.$message.error(this.msg)
      }
    },
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
.red-font {
  color: red;
}
video:focus{
  outline: -webkit-focus-ring-color auto 2px;
}
</style>
<template>
  <div class="picture-main">
    <el-header class="el-header-back">
      <el-radio-group v-model="dir" class="top-left">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button
            v-for="(name, index) of directories"
            :key="index"
            :label="name">
        </el-radio-button>
      </el-radio-group>
      <el-button-group class="top-right">
        <el-button type="primary" icon="el-icon-upload" @click="openUploadWindow">上传</el-button>
      </el-button-group>
    </el-header>
    <el-main class="el-main-back">
      <water-fall :pictureType="dir"/>
    </el-main>
    <el-dialog title="图片上传" :visible.sync="uploadIsOpen" :modal-append-to-body='false' width="45%">
      <upload-files :fileDir="dir" :fileType="1"/>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import waterFall from "@/components/waterFall";
import uploadFiles from "@/components/uploadFiles";

export default {
  name: "picture-vue",
  components:{
    waterFall,
    uploadFiles,
  },
  data(){
    return{
      dir:'全部',
      uploadIsOpen:false,
      dirs:[],
    }
  },
  computed: {
    ...mapState('fileAndDirectory', ['directories']),
  },
  methods:{
    ...mapActions('fileAndDirectory', {getDirectory:'getDirectory'}),
    openUploadWindow(){
      this.uploadIsOpen = true
    },
  },
  mounted() {
    this.getDirectory(1)
  }
}
</script>

<style scoped>
  .picture-main {
    height: 100%;
    width: 100%;
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
    background-image: linear-gradient(180deg, whitesmoke, whitesmoke);
    border: 1px solid #cccccc;
  }
</style>
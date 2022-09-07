<template>
  <el-form>
    <el-form-item class="message">
      <h4>
        文件名: {{file.name}}<br>
        文件存放目录: {{file.fileDir}}
      </h4>
    </el-form-item>
    <el-form-item label="分类选择" :label-width="formLabelWidth">
      <div class="createCategory">
        <el-select v-model="form.region" placeholder="请选择文件分类">
          <el-option v-for="(name, index) of directories" :key="index" :label="name" :value="name"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="changePictureDirectory">移动到该目录</el-button>
      <el-button type="danger" @click="deleteFile">删除该文件</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "manageFile",
  data(){
    return{
      formLabelWidth: '120px',
      form: {
        region: this.file.fileDir,
      },
    }
  },
  props:['file','fileType'],
  watch:{
    file:{
      deep:true,
      handler(){
        this.form.region = this.file.fileDir
      }
    }
  },
  methods:{
    ...mapActions('fileAndDirectory',
        {getDirectory:'getDirectory', changePictureDir:'changePictureDir',getPictureByDir:'getFileByDir',deletePicture:'deletePicture'}),
    ...mapMutations('fileAndDirectory', {setRefresh:'setRefresh',setOpenWindow:'setOpenWindow'}),
    async changePictureDirectory(){
      let fileId = this.file.fileId
      let fileDir = this.form.region
      let arr = [fileId, fileDir]
      let arr2 = [fileDir, this.fileType]
      await this.changePictureDir(arr)
      await this.getPictureByDir(arr2)
      this.setRefresh(1)
      this.setOpenWindow(0)
      if (this.code === '200') {
        this.$message.success(this.msg)
      } else {
        this.$message.error(this.msg)
      }
    },
    async deleteFile(){
      await this.deletePicture(this.file.fileId)
      this.setRefresh(1)
      this.setOpenWindow(0)
      if (this.code === '200') {
        this.$message.success(this.msg)
      } else {
        this.$message.error(this.msg)
      }
    },
  },
  computed:{
    ...mapState('fileAndDirectory', ["directories","msg","code"]),
  },
  mounted() {
    this.getDirectory(this.fileType)
  },
}
</script>

<style scoped>

.createCategory{
  margin-right: 5%;
  width: 40%;
  display: flex;
  justify-content: left;
  float: left;
}
.message {
  margin: 0;
  text-align: left;
}
h4{
  margin-block-start: 0;
  margin-block-end: 1em;
  margin-inline-start: 52px;
  color: #606266;
  /*font-weight: normal;*/
}
</style>
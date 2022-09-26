<template>
  <el-form>
    <el-form-item label="新增目录" :label-width="formLabelWidth">
      <div class="createCategory">
        <el-input v-model="input" placeholder="请输入目录名称"></el-input>
      </div>
      <el-button type="primary" @click="createCategory">添加目录</el-button>
    </el-form-item>
    <el-form-item label="分类选择" :label-width="formLabelWidth">
      <div class="createCategory">
        <el-select v-model="form.region" placeholder="请选择文件分类">
          <el-option v-for="(name, index) of directories" :key="index" :label="name" :value="name"></el-option>
        </el-select>
      </div>
      <el-button type="danger" @click="deleteCategory">删除目录</el-button>
    </el-form-item>
    <el-form-item label="上传区域" :label-width="formLabelWidth">
      <el-upload
          class="upload-demo"
          :multiple="true"
          ref="upload"
          action="none"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "uploadFiles",
  data() {
    return {
      fileList: [],
      formLabelWidth: '150px',
      form: {
        region: '',
      },
      input:'',
    };
  },
  props: {
    fileDir:{
      fileDir:String,
    },
    fileType:{}
  },
  watch:{
    fileDir:{
      handler(){
        if (this.fileDir === '全部'){
          this.form.region = ''
        } else {
          this.form.region = this.fileDir
        }
      }
    }
  },
  methods: {
    async createCategory(){
      let arr = [this.input, this.fileType]
      await this.createDirectory(arr)
      this.input = ''
      this.form.region = ''
      if (this.code === '200') {
        this.$message.success(this.msg)
      } else {
        this.$message.error(this.msg)
      }
      this.dir = this.input
    },
    async deleteCategory(){
      let arr = [this.form.region, this.fileType]
      await this.deleteDirectory(arr)
      this.input = ''
      this.form.region = ''
      if (this.code === '200') {
        this.$message.success(this.msg)
      } else {
        this.$message.error(this.msg)
      }
    },
    async submitUpload() {
      if (this.fileList.length === 0){
        return this.$message.warning('请选择文件在上传')
      }
      let formData = new FormData();
      this.fileList.forEach((file) => {
        formData.append('file', file.raw)
      })
      await axios({
        method: 'post',
        url: 'http://localhost:7778/fileAndVideo/uploadFiles',
        data: formData,
        params:{
          dir:this.form.region,
          type:this.fileType,
        }
      }).then((res)=>{
          if (res.data.code === '200'){
            this.$message.success('文件上传成功')
          } else {
            this.$message.error(res.data.message)
          }
          this.fileList = []
          this.uploadIsOpen = false
        }
      ).catch((error)=>{
        this.$message.error(error)
      })
      this.setRefresh(1)
      this.setOpenWindow(0)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    ...mapActions('fileAndDirectory',
        {createDirectory:'createDirectory',getDirectory:'getDirectory',deleteDirectory:'deleteDirectory'}),
    ...mapMutations('fileAndDirectory', {setRefresh:'setRefresh',setOpenWindow:'setOpenWindow'})
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
</style>
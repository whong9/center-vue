<template>
  <el-form>
    <el-form-item label="目录增删" :label-width="formLabelWidth">
      <div class="createCategory">
        <el-input v-model="input" placeholder="请输入目录名称"></el-input>
      </div>
      <el-button type="primary" @click="createCategory" :loading="loading" :plain="true">添加</el-button>
      <el-button type="danger" @click="deleteCategory" :loading="loading" :plain="true">删除</el-button>
    </el-form-item>
    <el-form-item label="分类选择" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择文件分类">
        <el-option v-for="(name, index) of directories" :key="index" :label="name" :value="name"></el-option>
      </el-select>
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
import {mapActions, mapState} from "vuex";

export default {
  name: "uploadFiles",
  data() {
    return {
      fileList: [],
      formLabelWidth: '120px',
      form: {
        region: '',
      },
      input:'',
      loading:false,
    };
  },
  methods: {
    createCategory(){
      this.loading = true
      this.createDirectory(this.input).toString()
      this.input = ''
      this.form.region = ''
      this.loading = false
    },
    deleteCategory(){
      this.loading = true
      this.deleteDirectory(this.input).toString()
      this.input = ''
      this.form.region = ''
      this.loading = false
    },
    submitUpload() {
      if (this.fileList.length === 0){
        return this.$message.warning('请选择文件在上传')
      }
      // this.$refs.upload.submit();
      let formData = new FormData();
      this.fileList.forEach((file) => {
        formData.append('file', file.raw)
      })
      axios({
        method: 'post',
        url: 'http://localhost:7778/fileAndVideo/uploadFiles',
        data: formData,
        params:{
          dir:this.form.region
        }
      }).then(
          res=>{
            if (res.data.code === '200'){
              this.$message.success('文件上传成功')
            } else {
              this.$message.error('文件上传失败')
            }
            this.fileList = []
          }
      )
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    ...mapActions('directory',
        {createDirectory:'createDirectory',getDirectory:'getDirectory',deleteDirectory:'deleteDirectory'})
  },
  computed:{
    ...mapState('directory', ["directories"]),
  },
  mounted() {
    this.getDirectory()
  },
}
</script>

<style scoped>
.createCategory{
  margin-right: 5%;
  width: 35%;
  display: flex;
  justify-content: left;
  float: left;
}
</style>
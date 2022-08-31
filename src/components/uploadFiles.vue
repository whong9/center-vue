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
          ref="uploadMutiple"
          action=""
          :show-file-list="false"
          :multiple="true"
          :before-upload="beforeUpload">
        <el-button size="small" type="primary">选择文件上传</el-button>
      </el-upload>
    </el-form-item>
    <div class="el-form-div">
      <el-table :data="uploadFilesList" style="width: 100%">
        <el-table-column prop="name" :show-overflow-tooltip="true" label="名称">
          <template slot-scope="scope">
            <i style="color:#409EFF" class=" el-icon-s-order" />{{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="是否成功" align="left" width="210%">
          <template slot-scope="scope">
            <template v-if="scope.row.status==='success'">上传成功！</template>
            <template v-else-if="scope.row.status==='error'">上传失败!</template>
            <el-progress v-else :percentage="scope.row.progress" />
          </template>
        </el-table-column>
        <el-table-column width="120" prop="size" label="大小" align="right" />
      </el-table>
    </div>
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
      uploadFilesList: [],
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
    beforeUpload(file) {
      const fileList = {}
      for (const key in file) {
        fileList[key] = file[key]
      }
      // status:uploading、success、error 文件上传状态
      // progress 文件上传进度
      this.uploadFilesList.push({ ...fileList, progress: 0, status: 'uploading' })
      this.httpRequest(file, parms => {
        this.showProgress(fileList, parms)
      })
      // 阻止 el-upload的默认上传
      return false
    },
    showProgress(file, parms) {
      const { progress, status } = parms
      const arr = [...this.uploadFilesList].map(items => {
        if (items.uid === file.uid) {
          items.progress = progress
          items.status = status
        }
        return items
      })
      this.uploadFilesList = [...arr]
    },
    async httpRequest(file, callback) {
      const formData = new FormData();
      formData.append("file", file)
      let progress = 0
      axios({
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'post',
        url: 'http://localhost:7778/fileAndVideo/upload',
        data: formData,
        params: {
          str: this.form.region
        },
        onUploadProgress: progressEvent => { // 获取文件上传进度 axios自带的
          progress = (progressEvent.loaded / progressEvent.total * 100) | 0
          callback({ progress, status: 'uploading' })
        }
      }).then(() => { // 成功状态
        callback({ progress, status: 'success' })
      }).catch(() => { // 失败状态
        callback({ progress, status: 'error' })
      })
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
.el-form-div {
  margin-right: 7%;
  margin-left: 7%;
}
.createCategory{
  margin-right: 5%;
  width: 35%;
  display: flex;
  justify-content: left;
  float: left;
}
</style>
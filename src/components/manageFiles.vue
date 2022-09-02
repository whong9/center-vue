<template>
  <el-form>
    <el-form-item label="分类选择" :label-width="formLabelWidth">
      <div class="createCategory">
        <el-select v-model="form.region" placeholder="请选择文件分类">
          <el-option v-for="(name, index) of directories" :key="index" :label="name" :value="name"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="changePictureDirectory">移动到该目录</el-button>
      <el-button type="danger" @click="">删除图片</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "manageFile",
  data(){
    return{
      formLabelWidth: '120px',
      form: {
        region: this.picture.fileDir,
      },
    }
  },
  props:['picture'],
  methods:{
    ...mapActions('directory', {getDirectory:'getDirectory', changePictureDir:'changePictureDir'}),
    changePictureDirectory(){
      let fileId = this.picture.fileId
      let fileDir = this.form.region
      let arr = [fileId, fileDir]
      this.changePictureDir(arr)
    },
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
  width: 40%;
  display: flex;
  justify-content: left;
  float: left;
}
</style>
<template>
  <div class="picture-main">
    <el-header>
      <el-radio-group v-model="type" class="top-left" @change="getPictureByType(type)">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button
            v-for="(name, index) of directories"
            :key="index"
            :label="name">
        </el-radio-button>
      </el-radio-group>
      <el-button class="top-right" type="primary" size="medium" plain>上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-header>
    <el-main>
      <water-fall/>
    </el-main>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import waterFall from "@/components/waterFall";

export default {
  name: "picture-vue",
  components:{
    waterFall,
  },
  data(){
    return{
      type:'全部',
    }
  },
  computed: {
    ...mapState('directory', ['directories']),
    ...mapState('picture', ['pictures'])
  },
  methods:{
    ...mapActions('directory', {getDirectory:'getDirectory', createDirectory:'createDirectory'}),
    ...mapActions('picture', {getPictureByType:'getPictureByType'})
  },
  mounted() {
    this.getDirectory()
  }
}
</script>

<style scoped>
  . picture-main {
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
    background-color: white;
    border: 1px solid #cccccc;
  }
  .el-main{
    margin-top: 1%;
    background-color: white;
    border: 1px solid #cccccc;
  }
</style>
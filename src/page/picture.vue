<template>
  <div class="picture-main">
    <div class="index-right-top">
      <el-radio-group v-model="radio">
        <el-radio-button
            v-for="(name, index) of directories"
            :key="index"
            :label="name">
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="index-right-bottom">
      <img src="../assets/cat.jpg" width="320" height="180">
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "picture-vue",
  data(){
    return{
      radio:'',
    }
  },
  computed: {
    ...mapState('directory', ['directories'])
  },
  methods:{
    ...mapActions('directory', {getDirectory:'getDirectory', createDirectory:'createDirectory'})
  },
  mounted() {
    this.getDirectory()
  }
}
</script>

<style scoped>
  .picture-main {
    height: 100%;
    width: 100%;
  }
  .picture-main .index-right-top {
    margin: 25px 3px 25px 6%;
    height: 8%;
  }
  .picture-main .index-right-bottom {
    height: 100%;
    width: 100%;
  }
</style>
<template>
  <div class="picture-main">
    <div class="index-right-top">
      <div class="index-right-top-main">
        <div class="index-right-top-main-button">
          <el-radio-group v-model="radio">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button
                v-for="(name, index) of directories"
                :key="index"
                :label="name">
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="index-right-bottom">
      <div class="index-right-bottom-main">
        <water-fall/>
      </div>
    </div>
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
      radio:'全部',
    }
  },
  computed: {
    ...mapState('directory', ['directories']),
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
    margin: 0.5% 0 0.5% 0.5%;
    height: 10%;
    background-color: white;
    border: 1px solid #cccccc;
  }
  .picture-main .index-right-top .index-right-top-main {
    height: 70%;
    margin-top: 2%;
    margin-bottom: 1%;
    margin-left: 2.7%;
  }
  .picture-main .index-right-bottom {
    height: 88%;
    width: 100%;
    background-color: white;
    border: 1px solid #cccccc;
  }
  .index-right-bottom-main {
    margin-top: 1%;
  }
</style>
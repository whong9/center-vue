<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" class="side">
        <Side></Side>
      </el-aside>
      <el-container class="main">
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Side from "@/components/side";

export default {
  name: 'App',
  components: {
    Side,
  }
}
</script>

<style>
html {
  height: 100%;
  background-color: whitesmoke;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  display: flex;
  justify-content: left;
  width: 100% !important;
  height: 100% !important;
  flex-flow: row nowrap;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
}
.el-main {
  /*background-color: whitesmoke;*/
  color: #333;
  background-image: linear-gradient(180deg, skyblue, white);
}
</style>

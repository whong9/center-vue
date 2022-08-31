<template>
  <div id="app">
    <div class="index-left">
      <Side></Side>
    </div>
    <div class="index-right">
      <router-view/>
    </div>
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
#app .index-left {
  height: 100%;
  width: 200px;
  z-index: 1;
}
#app .index-right {
  height: 100%;
  width: 100%;
  z-index: 0;
  margin-right: 10px;
  background-color: whitesmoke;
}
</style>

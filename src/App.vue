<template>
  <div id="app">
    <div class="index-left">
      <Side></Side>
    </div>
    <div class="index-right">
      <div class="index-right-top">
      </div>
      <div class="index-right-bottom">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "@/components/side";
import WaterFall from "@/components/waterFall";

export default {
  name: 'App',
  components: {
    Side,
    WaterFall,
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
}
#app .index-right .index-right-top {
  margin: 3px;
  height: 8%;
}
</style>

<template>
  <div class="div-main">
    <section class="Intro">
      <uploadFiles/>
    </section>
    <div class="div-main-center">
      <WaterFall/>
    </div>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
import WaterFall from "@/components/waterFall";

export default {
  name: "index-main",
  components: {
    uploadFiles,
    WaterFall
  }
}
</script>

<style scoped>
  div {
    float: left;
    width: 10%;
  }
  .div-main {
    display: block;
    height: 90%;
    width: 100%;
  }
  .Intro {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    height: 5%;
  }
  .div-main-center {
    margin: 3% 11% 0;
    width: 78%;
    height: 90%;
  }
</style>
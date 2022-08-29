<template>
  <div class="picture-main">
    <div class="index-right-top">
    </div>
    <div class="index-right-bottom">
      <water-fall/>
    </div>
  </div>
</template>

<script>
import WaterFall from "@/components/waterFall";

export default {
  name: "picture-vue",
  components: {WaterFall},
}
</script>

<style scoped>
  .picture-main {
    height: 100%;
    width: 100%;
  }
  .picture-main .index-right-top {
    margin: 3px;
    height: 8%;
  }
  .picture-main .index-right-bottom {
    height: 100%;
    width: 100%;
  }
</style>
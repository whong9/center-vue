<template>
  <div class="video-main">
    <div class="video-main-top">
      <div></div>
    </div>
    <div class="video-main-bottom">
      <div class="video-main-bottom-cardList">
        <div v-for="(path, index) of paths" :key="index" class="video-main-bottom-cardList-card">
          <div class="video-main-bottom-cardList-card-top">
            <video controls :src="paths.at(index)" width="250px" height="140px"></video>
          </div>
          <div class="video-main-bottom-cardList-card-bottom">
            <h3>【英雄联盟】S7双三星亚索左伊</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "myVideo",
  data(){
    return {
      paths:[require("../assets/酒桶五杀.mp4"), require("../assets/闪现a兵.mp4")]
    }
  },
}
</script>

<style scoped>
.video-main {
  height: 100%;
  width: 100%;
}
.video-main .video-main-top {
  margin: 3px 3px 3px 2%;
  height: 8%;
  background-color: #333333;
}
.video-main .video-main-bottom {
  height: 100%;
  margin-right: 5%;
  display: grid;
}
.video-main-bottom-cardList {
  margin-left: 8%;
  width: 93%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: repeat(auto-fill, 200px);
  grid-gap: 20px 12px;
}

.video-main-bottom-cardList .video-main-bottom-cardList-card-top {
  height: 140px;
  width: 250px;
}
.video-main-bottom-cardList .video-main-bottom-cardList-card-bottom{
  height: 140px;
  width: 250px;
}
video {
  border-radius: 6px;
}
h3 {
  font-size: 15px;
}
</style>
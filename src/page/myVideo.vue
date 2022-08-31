<template>
  <div class="video-main">
    <div class="video-main-top">
      <div></div>
    </div>
    <div class="video-main-bottom">
      <div class="video-main-bottom-cardList">
        <div v-for="(video, index) of videos" :key="index" class="video-main-bottom-cardList-card">
          <div class="video-main-bottom-cardList-card-top">
            <video controls :src="video.filePath" width="250px" height="140px"></video>
          </div>
          <div class="video-main-bottom-cardList-card-bottom">
            <h3>【{{video.fileDir}}】{{ video.fileName }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "myVideo",
  data(){
    return {
      videos:[],
    }
  },
  mounted() {
    axios({
      url: '/fileAndVideo/getAllVideo',
      params:{
        category:'全部',
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === "200") {
        this.videos = res.data.data ? res.data.data : []
        this.videos.forEach((video)=>{
          video.fileName = video.fileName.substring(0, video.fileName.indexOf("."));
        })
      }
    })
  }
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
}
.video-main .video-main-bottom {
  height: 100%;
  margin-right: 5%;
  background-color: whitesmoke;
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
<template>
<div>
  <input type="text" v-model="text"></input>
  <el-button @click="sendText">点击发送</el-button><br>
  <input type="text" v-model="username"></input><br>
  <input type="text" v-model="password"></input><br>
  <el-button @click="login">登录</el-button>
  <el-button @click="logout">注销</el-button>
</div>
</template>

<script>
import axios from "axios";
import JSEncrypt from 'jsencrypt';
import {mapActions, mapState} from "vuex";
import router from "@/router";

export default {
  name: "blog",
  data(){
    return{
      text:"",
      publicKey:"",
      username:"",
      password:"",
    }
  },
  computed:{
    ...mapState('login', ['message', 'code', 'token'])
  },
  methods:{
    ...mapActions('login', {userLogin:'login'}),
    sendText(){
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.publicKey);
      const rsaText = encrypt.encrypt(this.text);
      axios.get("/fileAndVideo/test",{
        params:{
          rsaText:rsaText,
        }
      })
    },
    async login(){
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.publicKey);
      const rsaPwd = encrypt.encrypt(this.password);
      let arr = [this.username, rsaPwd]
      await this.userLogin(arr)
      await router.push('/picture')
    },
    async logout(){
      await axios.get("/user/logout")
    }
  },
  mounted(){
    axios.get("/user/getPublicKey").then(res=>{
      this.publicKey = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
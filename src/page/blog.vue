<template>
<div>
  <input type="text" v-model="text"></input>
  <el-button @click="sendText">点击发送</el-button><br>
  <input type="text" v-model="username"></input><br>
  <input type="text" v-model="password"></input><br>
  <el-button @click="login">登录</el-button><br>
</div>
</template>

<script>
import axios from "axios";
import JSEncrypt from 'jsencrypt';
import {mapActions, mapMutations, mapState} from "vuex";

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
    }
  },
  mounted(){
    axios.get("/fileAndVideo/getPublicKey").then(res=>{
      this.publicKey = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
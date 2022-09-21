import Vue from "vue"
import Vuex from "vuex"
import fileAndDirectory from "./fileAndDirectory"
import login from "@/store/login";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        fileAndDirectory:fileAndDirectory,
        login:login,
    },
})
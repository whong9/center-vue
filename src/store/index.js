import Vue from "vue"
import Vuex from "vuex"
import fileAndDirectory from "./fileAndDirectory"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        fileAndDirectory:fileAndDirectory,
    },
})
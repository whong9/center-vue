import Vue from "vue"
import Vuex from "vuex"
import directory from "./directory"
import picture from "./picture";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        directory:directory,
        picture:picture
    },
})
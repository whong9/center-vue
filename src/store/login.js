import axios from "axios";

export default {
    namespaced:true,
    actions:{
        async login(context, value) {
            await axios.get("/user/login", {
                params:{
                    userName:value[0],
                    password:value[1]
                }
            }).then(res =>{
                context.commit('setCode', res.data.code)
                context.commit('setMsg', res.data.message)
                if (res.data.code === "200") {
                    console.log(res.data.data);
                    context.commit('setToken', res.data.data)
                }
            })
        }
    },
    mutations:{
        setToken(state, value) {
            state.token = value
        },
        setCode(state, value) {
            state.code = value
        },
        setMsg(state, value) {
            state.message = value
        },
    },
    state:{
        token:"",
        code:"",
        message:"",
    },
    getters:{}
}
import axios from "axios";

export default {
    namespaced:true,
    actions:{
        async getPictureByType(context, value){
            await axios.get("/fileAndVideo/getPictures", {
                params:{
                    type:value
                }
            }).then((response)=>{
                context.commit('getPictureByType', response.data.data)
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    mutations:{
        getPictureByType(state, value){
            state.pictures = value
        }
    },
    state:{
        pictures: [],
    },
    getters:{

    }
}
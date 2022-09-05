import axios from "axios";
import {getDirectory} from "@/api/request";

export default {
    namespaced:true,
    actions:{
        // async getDirectory(context){
        //     context.commit('getDir', await getDirectory)
        // },
        async getDirectory(context, value){
            await axios.get("http://localhost:7778/fileAndVideo/getDir",{
                params:{
                    dirType:value,
                }
            })
                .then((response) => {
                    context.commit('getDir',response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async createDirectory(context, value){
            await axios.get("http://localhost:7778/fileAndVideo/createDir",{
                params:{
                    name:value[0],
                    dirType:value[1]
                }
            }).then((response)=>{
                if (response.data.code === '200'){
                    context.commit('getDir', response.data.data)
                    context.commit('setCode', response.data.code)
                }
                context.commit('setMsg', response.data.message)
            }).catch((error) => {
                context.commit('setMsg', error.message)
                console.log(error);
            });
        },
        async deleteDirectory(context, value){
            await axios.get("http://localhost:7778/fileAndVideo/deleteDir",{
                params:{
                    name:value[0],
                    dirType:value[1]
                }
            }).then((response)=>{
                if (response.data.code === '200'){
                    context.commit('getDir', response.data.data)
                    context.commit('setCode', response.data.code)
                }
                context.commit('setMsg', response.data.message)
            }).catch((error) => {
                context.commit('setMsg', error.message)
                console.log(error);
            });
        },
        async changePictureDir(context, value){
            await axios.get("http://localhost:7778/fileAndVideo/changeFileDir",{
                params:{
                    fileId:value[0],
                    fileDir:value[1],
                    fileType:1,
                }
            }).then((response)=>{
                if (response.data.code === '200'){
                    context.commit('setCode', response.data.code)
                }
                context.commit('setMsg', response.data.message)
            }).catch((error) => {
                context.commit('setMsg', error.message)
                console.log(error);
            });
        },
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
        },
    },
    mutations:{
        getDir(state, value){
            state.directories = value
        },
        setMsg(state, value){
            state.msg = value
        },
        setCode(state, value){
            state.code = value
        },
        getPictureByType(state, value){
            state.pictures = value
        },
        setUploadIsOpen(state, value){
            state.uploadIsOpen = value
        },
    },
    state:{
        directories:[],
        msg:'',
        code:'',
        pictures: [],
    },
    getters:{

    },
}

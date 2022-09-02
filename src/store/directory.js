import axios from "axios";
import {getDirectory} from "@/api/request";

export default {
    namespaced:true,
    actions:{
        async getDirectory(context){
            context.commit('getDir', await getDirectory)
        },
        async createDirectory(context, value){
            await axios.get("http://localhost:7778/fileAndVideo/createDir",{
                params:{
                    name:value[0],
                    type:value[1]
                }
            }).then((response)=>{
                context.commit('getDir', response.data.data)
            }).catch((error) => {
                console.log(error);
            });
        },
        async deleteDirectory(context, value){
            await axios.get("http://localhost:7778/fileAndVideo/deleteDir",{
                params:{
                    name:value
                }
            }).then((response)=>{
                context.commit('getDir', response.data.data)
            }).catch((error) => {
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
                context.commit('getDir', response.data.data)
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    mutations:{
        getDir(state, value){
            state.directories = value
        },
    },
    state:{
        directories:[]
    },
    getters:{

    },
}

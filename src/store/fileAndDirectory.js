import axios from "axios";
import request from "@/api/request";

export default {
    namespaced:true,
    actions:{
        // async getDirectory(context, value){
        //     await axios.get("/fileAndVideo/getDir",{
        //         headers:{
        //             'token':localStorage.getItem('token')
        //         },
        //         params:{
        //             dirType:value,
        //         }
        //     }).then((response) => {
        //             context.commit('getDir',response.data.data)
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // },
        async getDirectory(context, value){
            await request.get("/fileAndVideo/getDir",{
                params:{
                    dirType:value,
                }
            }).then((response) => {
                context.commit('getDir',response.data.data)
            }).catch((error) => {
                    console.log(error);
                });
        },
        async createDirectory(context, value){
            await axios.get("/fileAndVideo/createDir",{
                headers:{
                    'token':localStorage.getItem('token')
                },
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
            await axios.get("/fileAndVideo/deleteDir",{
                headers:{
                    'token':localStorage.getItem('token')
                },
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
            await axios.get("/fileAndVideo/changeFileDir",{
                headers:{
                    'token':localStorage.getItem('token')
                },
                params:{
                    fileId:value[0],
                    fileDir:value[1],
                    fileType:value[2],
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
        async getFileByDir(context, value){
            await axios.get("/fileAndVideo/getFilesByDir", {
                params:{
                    dir:value[0],
                    type:value[1],
                }
            }).then((response)=>{
                context.commit('getFilesByType', response.data.data)
            }).catch((error) => {
                console.log(error);
            });
        },
        async deleteFile(context, value){
            await axios.get("/fileAndVideo/deleteFile", {
                params:{
                    fileId:value
                }
            }).then((response)=>{
                if (response.data.code === '200'){
                    context.commit('setCode', response.data.code)
                    context.commit('getFilesByType', response.data.data)
                }
                context.commit('setMsg', response.data.message)
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
        getFilesByType(state, value){
            state.files = value
        },
        setRefresh(state,value){
            state.refresh = value
        },
        setOpenWindow(state,value){
            state.openWindow = value
        },
    },
    state:{
        directories:[], //从后端获取目录存放目录
        msg:'',         //接收后端传来的响应信息
        code:'',        //接收后端传来的响应编码
        files: [],      //文件集合
        refresh:0,      //是否刷新页面 0不刷新，1刷新
        openWindow:0,   //是否关闭窗口，0关闭，1开启
    },
    getters:{

    },
}

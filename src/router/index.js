import VueRouter from 'vue-router'

// 引入组件
import picture from "@/page/picture";
import blog from "@/page/blog";
import music from "@/page/music";
import myVideo from "@/page/myVideo";
import project from "@/page/project";
import novel from "@/page/novel";

// 创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/picture',
            component:picture,
        },
        {
            path:'/blog',
            component:blog,
        },
        {
            path:'/novel',
            component:novel,
        },
        {
            path:'/project',
            component:project,
        },
        {
            path:'/myVideo',
            component:myVideo,
        },
        {
            path:'/music',
            component:music,
        },
    ]
})
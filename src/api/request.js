/**
 * 全站http配置
 */
import axios from 'axios';
import { Message } from 'element-ui';
import router from "@/router";

//默认超时时间
axios.defaults.timeout = 10000;
//返回其他状态码
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//http request拦截 ，此处用到es6 Promise
axios.interceptors.request.use(config => {
    //配置请求头，使得headers携带上token
    config.headers["token"] = localStorage.getItem('token');
    return config
}, error => {
    return Promise.reject(error)
});
//http response 拦截，此处用到es6 Promise
axios.interceptors.response.use(res => {
    //获取状态码
    const status = res.data.code || res.status;

    const message = res.data.message || '未知错误';

    //如果是401则跳转到登录页面
    if (status.toString() === "401") {
        if (router.currentRoute.path !== '/blog'){
            router.push({ path: '/blog' })
            Message({
                message: message,
                type: 'error'
            });
        }
    };
    // 如果请求为非200否者默认统一处理
    if (status.toString() !== "200") {
        // Message({
        //     message: message,
        //     type: 'error'
        // });
        return Promise.reject(new Error(message))
    }
    return res;
}, error => {

    return Promise.reject(new Error(error));
});

export default axios;


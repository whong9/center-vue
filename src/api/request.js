import axios from "axios";

export {
    getDirectory,
}
//获取目录
const getDirectory = axios.get("http://localhost:7778/fileAndVideo/getDir")
    .then((response) => {
        return response.data.data
    })
    .catch((error) => {
        console.log(error);
    });
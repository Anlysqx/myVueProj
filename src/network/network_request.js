import axios from "axios";

axios.defaults.baseURL = '/myapp'

axios.interceptors.request.use(config => {
    console.log(config)
    // config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})

export function withFileNameGetUsecaseList(file_name,url){
    // 请求的后端api地址为 /newFileCaseData
    return axios.post(url,{
        file_name:file_name
    })
}

export function getLeftMenuItemListData(url) {
    return axios.get(url)
}

export function loginRequest(url,formData) {

    return axios.post(url,{
        username: formData.username,
        password: formData.password,
    })
}
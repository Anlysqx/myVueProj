import axios from "axios";

axios.defaults.baseURL = '/myapp'

axios.interceptors.request.use(config => {
    console.log(config)
    // config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})

export function get_subject_and_tree(url,usecase){
    // 请求的后端api地址为 /getSubjectAndTree
    return axios.post(url,{
        usecase:usecase
    })
}

export function get_equip_knowledge_base(url,step_list) {
    // 请求的后端api地址为 /getEquipKnowledge
    console.log(step_list)
    return axios.post(url,{
        query:step_list
    })
}

export function saveOneNewCaseToDataSet(url,newCaseForm) {
    // 请求的后端api地址为 /saveOneNewCase
    return axios.post(url,{
        newCase:newCaseForm
    })
}

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
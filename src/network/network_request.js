import axios from "axios";

axios.defaults.baseURL = '/myapp'

axios.interceptors.request.use(config => {
    console.log(config)
    // config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})


export function get_single_test(url,singleTest) {
    // 请求的后端api地址为/getSingleTest
    return axios.post(url,{
        singleTest:singleTest
    })

}

export function get_subject_and_tree(url,case_item_query){
    // 请求的后端api地址为 /getSubjectAndTree
    return axios.post(url,{
        usecase:case_item_query["analysis_case"],
        file_name:case_item_query["file_name"]
    })
}

export function get_equip_knowledge_base(url,query_case) {
    // 请求的后端api地址为 /getEquipKnowledge
    console.log(query_case)
    return axios.post(url,{
        step_list:query_case["step_list"],
        file_name:query_case["file_name"]
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
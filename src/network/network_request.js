import axios from "axios";


export function loginRequest(url,formData) {
    const instance = axios.create({
        baseURL:'/myapp'
    })
    return instance.post(url,{
        username: formData.username,
        password: formData.password,
    })
}
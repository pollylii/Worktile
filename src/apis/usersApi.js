import axios from 'axios'
import baseURL from './baseURL'

const URL = `${baseURL}/users`

const fetchUserListApi = axios.get(URL+'?_expand=role') // 用户列表

const delUserApi = (id) => {
    axios.delete(URL + `/${id}`) // 删除用户
}

const patchUserApi = (id, obj) => {
    axios.patch(URL + `/${id}`, obj) // 修改用户
}

const postUserApi = (obj) => {
    // axios.get(URL,obj) // 添加用户
    return new Promise((resolve,reject)=>{
        axios.post(URL,obj).then(res=>{
            resolve(res.data);    
      }).catch(error=>{
            reject(error);    
      })                 
    })
}

export { fetchUserListApi, delUserApi, patchUserApi, postUserApi }


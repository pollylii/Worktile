import axios from 'axios'
import baseURL from './baseURL'

const URL = `${baseURL}/rights`

const fetchRightTreeListApi = axios.get(URL + `?_embed=children`) // 权限列表

const delRightApi = (id) => {
    axios.delete(URL + `/${id}`) // 删除权限
}
const delRightChildrenApi = (id) => {
    axios.delete(URL + `/${id}`) // 删除权限-children
}

const patchRightApi = (id, obj) => {
    axios.patch(URL + `/${id}`, obj) // 修改权限
}
const patchRightChildrenApi = (id, obj) => {
    axios.patch(URL + `/${id}`, obj) // 修改权限-children
}
export { fetchRightTreeListApi, delRightApi, delRightChildrenApi,patchRightApi,patchRightChildrenApi }